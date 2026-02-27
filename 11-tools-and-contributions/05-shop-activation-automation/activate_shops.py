#!/usr/bin/env python3
"""
Shop Activation Script - Main Module
Automates bulk shop activation with JIRA ticket creation and SeaTalk notifications
"""

import csv
import json
import sys
import time
import requests
from datetime import datetime
from typing import Dict, List, Tuple
from collections import defaultdict
import argparse
import logging
from pathlib import Path

import config

# ============================================================================
# LOGGING SETUP
# ============================================================================

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(config.LOG_FILE),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


# ============================================================================
# CSV PARSING
# ============================================================================

def parse_csv(csv_file: str) -> List[Dict]:
    """
    Parse CSV file and return list of shops
    
    Args:
        csv_file: Path to CSV file
        
    Returns:
        List of shop dictionaries with env, region, and shop_id
    """
    shops = []
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                env = row.get('Env', '').strip()
                region = row.get('Reg', '').strip()
                shop_id = row.get('Shopid', '').strip()
                
                if shop_id and shop_id != '':
                    shops.append({
                        'env': env,
                        'region': region,
                        'shop_id': shop_id
                    })
        
        logger.info(f"✅ Parsed {len(shops)} shops from {csv_file}")
        return shops
        
    except FileNotFoundError:
        logger.error(f"❌ CSV file not found: {csv_file}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"❌ Error parsing CSV: {e}")
        sys.exit(1)


def group_shops_by_region(shops: List[Dict]) -> Dict[str, List[Dict]]:
    """Group shops by region"""
    regions = defaultdict(list)
    for shop in shops:
        regions[shop['region'].upper()].append(shop)
    return dict(regions)


def display_parsed_data(shops: List[Dict], mode: str):
    """Display parsed shop data for verification"""
    regions = group_shops_by_region(shops)
    region_list = sorted(regions.keys())
    
    print("\n" + "="*70)
    print(f"📋 PARSED DATA - {mode.upper()} MODE")
    print("="*70)
    print(f"  • Total Shops: {len(shops)}")
    print(f"  • Regions: {', '.join(region_list)}")
    print(f"  • Environment: {shops[0]['env'] if shops else 'N/A'}")
    print(f"\n  • Region Breakdown:")
    for region in region_list:
        print(f"    - {region}: {len(regions[region])} shops")
    print("="*70 + "\n")


# ============================================================================
# SHOP ACTIVATION
# ============================================================================

def activate_shop(env: str, region: str, shop_id: str) -> Tuple[bool, str, bool]:
    """
    Activate a single shop
    
    Args:
        env: Environment (staging/live)
        region: Region code
        shop_id: Shop ID
        
    Returns:
        Tuple of (success, message, already_active)
    """
    payload = {
        "value": json.dumps({
            "path": "1/Tool/Active_Shop",
            "params": [
                {
                    "name": "Env",
                    "type": 4,
                    "value": f'["{env}"]'
                },
                {
                    "name": "Region",
                    "type": 4,
                    "value": f'["{region}"]'
                },
                {
                    "name": "Shop ID",
                    "type": 1,
                    "value": shop_id
                }
            ]
        }),
        "op": "run"
    }
    
    headers = config.SHARK_API['HEADERS'].copy()
    headers['cookie'] = config.SHARK_API['COOKIE']
    
    try:
        response = requests.post(
            config.SHARK_API['URL'],
            headers=headers,
            json=payload,
            timeout=config.REQUEST_TIMEOUT
        )
        
        response_text = response.text.lower()
        
        if 'active success' in response_text:
            return True, "Successfully activated", False
        elif 'already active' in response_text:
            return True, "Already active", True
        else:
            return False, response.text[:100], False
            
    except requests.exceptions.Timeout:
        return False, "Request timeout", False
    except Exception as e:
        return False, str(e)[:100], False


def activate_all_shops(shops: List[Dict]) -> Dict:
    """
    Activate all shops and track results
    
    Returns:
        Dictionary with activation results
    """
    results = {
        'success': [],
        'already_active': [],
        'failed': [],
        'total': len(shops),
        'start_time': datetime.now(),
        'end_time': None
    }
    
    print("\n" + "━"*70)
    print("Starting shop activation process...")
    print("━"*70 + "\n")
    
    for idx, shop in enumerate(shops, 1):
        shop_id = shop['shop_id']
        region = shop['region']
        env = shop['env']
        
        timestamp = datetime.now().strftime('%H:%M:%S')
        print(f"[{timestamp}] [{idx}/{len(shops)}] Processing shop {shop_id} for region {region}...")
        
        success, message, already_active = activate_shop(env, region, shop_id)
        
        if success:
            if already_active:
                print(f"[{timestamp}] ⚠️  Shop {shop_id} is already active")
                results['already_active'].append(shop)
            else:
                print(f"[{timestamp}] ✓ Successfully activated shop {shop_id}")
                results['success'].append(shop)
        else:
            print(f"[{timestamp}] ✗ Failed to activate shop {shop_id}")
            print(f"           Error: {message}")
            shop['error'] = message
            results['failed'].append(shop)
        
        print()
        
        # Delay to avoid rate limiting
        if idx < len(shops):
            time.sleep(config.API_DELAY)
    
    results['end_time'] = datetime.now()
    
    # Display summary
    success_count = len(results['success']) + len(results['already_active'])
    success_rate = (success_count / results['total'] * 100) if results['total'] > 0 else 0
    
    print("━"*70)
    print("Activation completed:")
    print(f"  Total: {results['total']}")
    print(f"  Success: {len(results['success'])}")
    print(f"  Already Active: {len(results['already_active'])}")
    print(f"  Failed: {len(results['failed'])}")
    print(f"  Success Rate: {success_rate:.2f}%")
    print("━"*70 + "\n")
    
    return results


# ============================================================================
# JIRA TICKET CREATION
# ============================================================================

def create_jira_ticket(results: Dict, shops: List[Dict], mode: str) -> Dict:
    """
    Create JIRA ticket with activation results
    
    Returns:
        Dictionary with ticket key and URL, or None if failed
    """
    print("Creating JIRA ticket with activation results...")
    
    try:
        # Format date
        date_str = datetime.now().strftime('%d%m%y')
        full_date_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Calculate statistics
        success_count = len(results['success']) + len(results['already_active'])
        success_rate = (success_count / results['total'] * 100) if results['total'] > 0 else 0
        
        # Group shops by region
        region_stats = defaultdict(lambda: {'total': 0, 'success': 0, 'failed': 0})
        for shop in shops:
            region = shop['region'].upper()
            region_stats[region]['total'] += 1
        
        for shop in results['success'] + results['already_active']:
            region = shop['region'].upper()
            region_stats[region]['success'] += 1
        
        for shop in results['failed']:
            region = shop['region'].upper()
            region_stats[region]['failed'] += 1
        
        # Build description
        description = f"Shop Activation Process Completed\n\n"
        description += f"*Process Details:*\n"
        description += f"* Environment: {shops[0]['env']}\n"
        description += f"* Regions: {', '.join(sorted(region_stats.keys()))}\n"
        description += f"* Total Shops: {results['total']}\n"
        description += f"* Execution Time: {full_date_str}\n\n"
        
        description += f"*Results:*\n"
        description += f"* ✅ Successful: {len(results['success'])} shops ({len(results['success'])/results['total']*100:.2f}%)\n"
        description += f"* ℹ️ Already Active: {len(results['already_active'])} shops\n"
        description += f"* ❌ Failed: {len(results['failed'])} shops\n\n"
        
        # Successful shops
        if results['success']:
            description += f"*Successful Shops:*\n"
            for shop in results['success']:
                description += f"* Shop ID: {shop['shop_id']} | Region: {shop['region'].upper()} | Environment: {shop['env']} | Status: ✅ Activated\n"
            description += "\n"
        
        # Already active shops
        if results['already_active']:
            description += f"*Already Active Shops:*\n"
            for shop in results['already_active']:
                description += f"* Shop ID: {shop['shop_id']} | Region: {shop['region'].upper()} | Environment: {shop['env']} | Status: ℹ️ Already Active\n"
            description += "\n"
        
        # Failed shops
        if results['failed']:
            description += f"*Failed Shops:*\n"
            for shop in results['failed']:
                description += f"* Shop ID: {shop['shop_id']} | Region: {shop['region'].upper()} | Environment: {shop['env']} | Status: ❌ Failed\n"
                description += f"  Error: {shop.get('error', 'Unknown error')}\n"
            description += "\n"
        
        # Summary by region
        description += f"*Summary by Region:*\n"
        for region in sorted(region_stats.keys()):
            stats = region_stats[region]
            description += f"* {region}: {stats['total']} shops ({stats['success']} success, {stats['failed']} failed)\n"
        
        description += f"\nThis ticket was automatically created after bulk shop activation process completed.\n\n"
        description += f"To add more shops to the activation list, please go to this [document|{config.SHEET_LINK}]"
        
        # Get region labels
        region_labels = [r.lower() for r in region_stats.keys()]
        
        # Create payload
        mode_label = mode.lower()
        payload = {
            "fields": {
                "project": {"key": config.JIRA['PROJECT_KEY']},
                "summary": f"[Automation] [{date_str}] Bulk Shop Activation Results - {success_rate:.2f}% Success",
                "description": description,
                "issuetype": {"name": config.JIRA['ISSUE_TYPE']},
                "priority": {"name": config.JIRA['PRIORITY']},
                "labels": config.MODE_CONFIG[mode]['labels'] + region_labels
            }
        }
        
        # Make API call
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f"Bearer {config.JIRA['TOKEN']}"
        }
        
        response = requests.post(
            config.JIRA['URL'],
            headers=headers,
            json=payload,
            timeout=config.REQUEST_TIMEOUT
        )
        
        if response.status_code in [200, 201]:
            result = response.json()
            ticket_key = result.get('key')
            ticket_url = f"https://jira.shopee.io/browse/{ticket_key}"
            
            print(f"✓ JIRA ticket created successfully: {ticket_key}")
            print(f"  URL: {ticket_url}\n")
            
            return {'key': ticket_key, 'url': ticket_url}
        else:
            print(f"⚠️  Failed to create JIRA ticket: {response.text[:200]}\n")
            return None
            
    except Exception as e:
        print(f"⚠️  Error creating JIRA ticket: {e}\n")
        return None


# ============================================================================
# SEATALK NOTIFICATION
# ============================================================================

def send_seatalk_notification(results: Dict, shops: List[Dict], jira_ticket: Dict, mode: str):
    """Send SeaTalk notification"""
    print(f"Sending notifications to {mode.upper()} webhook...")
    
    try:
        # Format date
        date_str = datetime.now().strftime('%d%m%y')
        
        # Calculate statistics
        success_count = len(results['success']) + len(results['already_active'])
        success_rate = (success_count / results['total'] * 100) if results['total'] > 0 else 0
        
        # Group shops by region
        region_counts = defaultdict(int)
        for shop in shops:
            region_counts[shop['region'].upper()] += 1
        
        # Build region breakdown
        region_breakdown = '\n'.join([f"{region}: {count} shops" for region, count in sorted(region_counts.items())])
        
        # Build failed section
        failed_section = ""
        if results['failed']:
            failed_section = '\n\n**⚠️ Failed Shops:**\n```\n'
            for shop in results['failed']:
                failed_section += f"• Shop ID: {shop['shop_id']} (Region: {shop['region'].upper()})\n"
            failed_section += '```'
        
        # Build SeaTalk payload
        mode_prefix = "🧪 [TEST] " if mode == 'test' else "🏪 "
        elements = [
            {
                "element_type": "title",
                "title": {
                    "text": f"{mode_prefix}Shop Activation Summary [{date_str}]"
                }
            },
            {
                "element_type": "description",
                "description": {
                    "text": 'Hi team <mention-tag target="seatalk://user?id=0"/>,\n\nHere\'s the shop activation summary:'
                }
            },
            {
                "element_type": "description",
                "description": {
                    "text": f"**🔄 Process Details:**\n```\nEnvironment: {shops[0]['env']}\nRegions: {', '.join(sorted(region_counts.keys())).lower()}\nTotal Shops: {results['total']}\nMode: {mode.upper()}\n```"
                }
            },
            {
                "element_type": "description",
                "description": {
                    "text": f"**📊 Activation Results:**\n```\nSuccess Rate: {success_rate:.2f}%\nSuccessful: {len(results['success'])} shops\nAlready Active: {len(results['already_active'])} shops\nFailed: {len(results['failed'])} shops\n```{failed_section}"
                }
            },
            {
                "element_type": "description",
                "description": {
                    "text": f"**🔍 Region Breakdown:**\n```\n{region_breakdown}\n```\n\nClick buttons below for complete details ✨"
                }
            }
        ]
        
        # Add JIRA button if ticket was created
        if jira_ticket:
            elements.append({
                "element_type": "button",
                "button": {
                    "button_type": "redirect",
                    "text": "View JIRA Ticket",
                    "mobile_link": {
                        "type": "web",
                        "path": jira_ticket['url'],
                        "params": {}
                    },
                    "desktop_link": {
                        "type": "web",
                        "path": jira_ticket['url']
                    }
                }
            })
        
        # Add Shop List button
        elements.append({
            "element_type": "button",
            "button": {
                "button_type": "redirect",
                "text": "View Shop List",
                "mobile_link": {
                    "type": "web",
                    "path": config.SHEET_LINK,
                    "params": {}
                },
                "desktop_link": {
                    "type": "web",
                    "path": config.SHEET_LINK
                }
            }
        })
        
        payload = {
            "tag": "interactive_message",
            "interactive_message": {
                "elements": elements
            }
        }
        
        # Get webhook URL
        webhook_id = config.MODE_CONFIG[mode]['webhook']
        webhook_url = f"{config.SEATALK['BASE_URL']}{webhook_id}"
        
        print(f"🚀 {mode.upper()} MODE: Using {mode} webhook ({webhook_id})")
        
        # Make API call
        response = requests.post(
            webhook_url,
            headers={'Content-Type': 'application/json'},
            json=payload,
            timeout=config.REQUEST_TIMEOUT
        )
        
        if response.status_code == 200:
            result = response.json()
            if result.get('code') == 0:
                print(f"✅ Notification sent successfully to {mode.upper()} SeaTalk group\n")
            else:
                print(f"⚠️  SeaTalk notification may have failed: {result}\n")
        else:
            print(f"⚠️  Failed to send SeaTalk notification: {response.text[:200]}\n")
            
    except Exception as e:
        print(f"⚠️  Error sending SeaTalk notification: {e}\n")


# ============================================================================
# FINAL SUMMARY
# ============================================================================

def display_final_summary(results: Dict, jira_ticket: Dict, mode: str):
    """Display final summary"""
    success_count = len(results['success']) + len(results['already_active'])
    success_rate = (success_count / results['total'] * 100) if results['total'] > 0 else 0
    
    # Group by region
    region_stats = defaultdict(lambda: {'total': 0, 'success': 0, 'failed': 0})
    
    all_shops = results['success'] + results['already_active'] + results['failed']
    for shop in all_shops:
        region = shop['region'].upper()
        region_stats[region]['total'] += 1
    
    for shop in results['success'] + results['already_active']:
        region = shop['region'].upper()
        region_stats[region]['success'] += 1
    
    for shop in results['failed']:
        region = shop['region'].upper()
        region_stats[region]['failed'] += 1
    
    print("\n" + "╔" + "="*68 + "╗")
    print(f"║  ✅ {mode.upper()} ACTIVATION COMPLETE!".ljust(69) + "║")
    print("╚" + "="*68 + "╝\n")
    
    print("📊 Final Results:")
    print("━"*70)
    print(f"  • Total Shops: {results['total']}")
    print(f"  • Successful: {len(results['success'])} ({len(results['success'])/results['total']*100:.2f}%)")
    print(f"  • Already Active: {len(results['already_active'])} ({len(results['already_active'])/results['total']*100:.2f}%)")
    print(f"  • Failed: {len(results['failed'])} ({len(results['failed'])/results['total']*100:.2f}%)")
    print(f"  • Success Rate: {success_rate:.2f}%\n")
    
    print("📈 Breakdown by Region:")
    print("━"*70)
    for region in sorted(region_stats.keys()):
        stats = region_stats[region]
        print(f"  • {region}: {stats['total']} shops ({stats['success']} success, {stats['failed']} failed)")
    
    if jira_ticket:
        print("\n📝 JIRA Ticket:")
        print("━"*70)
        print(f"  • Ticket: {jira_ticket['key']}")
        print(f"  • URL: {jira_ticket['url']}")
    
    print("\n📱 Notification:")
    print("━"*70)
    print(f"  • Sent to {mode.upper()} SeaTalk group")
    print(f"  • Webhook: {config.MODE_CONFIG[mode]['webhook']}")
    
    if results['failed']:
        print("\n⚠️  Failed Shops Requiring Attention:")
        print("━"*70)
        for shop in results['failed']:
            print(f"  • Shop ID: {shop['shop_id']}")
            print(f"    Region: {shop['region'].upper()}")
            print(f"    Error: {shop.get('error', 'Unknown error')}")
            print()
    else:
        print("\n🎉 All shops activated successfully! No manual intervention needed.\n")
    
    print("━"*70)
    print("\nNext Steps:")
    print(f"1. ✅ Check {mode.upper()} SeaTalk group for notification")
    print("2. ✅ Review JIRA ticket for complete details")
    print("3. ✅ Verify shops are activated in Shark platform")
    if results['failed']:
        print("4. ✅ Investigate and retry failed shops manually")
    print("5. ✅ Update tracking spreadsheet if needed")
    
    print("\n" + "╔" + "="*68 + "╗")
    print(f"║  🎉 {mode.upper()} ACTIVATION DONE!".ljust(69) + "║")
    print("╚" + "="*68 + "╝\n")


# ============================================================================
# MAIN FUNCTION
# ============================================================================

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description='Shop Activation Script')
    parser.add_argument(
        'mode',
        choices=['test', 'production'],
        help='Activation mode: test or production'
    )
    parser.add_argument(
        '--skip-confirmation',
        action='store_true',
        help='Skip confirmation prompt (for cronjob)'
    )
    
    args = parser.parse_args()
    mode = args.mode
    
    # Log start
    logger.info(f"Starting shop activation in {mode.upper()} mode")
    
    # Get configuration for mode
    csv_file = config.MODE_CONFIG[mode]['csv_file']
    
    # Parse CSV
    shops = parse_csv(csv_file)
    
    if not shops:
        logger.error("No shops found in CSV file")
        sys.exit(1)
    
    # Display parsed data
    display_parsed_data(shops, mode)
    
    # Confirmation for production mode (unless skipped)
    if mode == 'production' and not args.skip_confirmation:
        print("⚠️  This is PRODUCTION mode. Please verify the data above is correct.")
        response = input("Ready to proceed? (yes/no): ")
        if response.lower() != 'yes':
            print("❌ Activation cancelled.")
            sys.exit(0)
        print()
    
    # Activate shops
    results = activate_all_shops(shops)
    
    # Create JIRA ticket
    jira_ticket = create_jira_ticket(results, shops, mode)
    
    # Send SeaTalk notification
    send_seatalk_notification(results, shops, jira_ticket, mode)
    
    # Display final summary
    display_final_summary(results, jira_ticket, mode)
    
    # Log completion
    logger.info(f"Shop activation completed in {mode.upper()} mode")
    logger.info(f"Total: {results['total']}, Success: {len(results['success']) + len(results['already_active'])}, Failed: {len(results['failed'])}")
    
    # Exit with appropriate code
    sys.exit(0 if len(results['failed']) == 0 else 1)


if __name__ == '__main__':
    main()

