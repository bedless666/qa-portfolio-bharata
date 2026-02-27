#!/usr/bin/env python3
"""
JIRA Weekly Summary Automation
Fetches JIRA issues and sends formatted summary to SeaTalk webhook
"""

import json
import requests
import yaml
import logging
import sys
from datetime import datetime, timedelta
from pathlib import Path
from collections import defaultdict
from typing import Dict, List, Optional
import time

# Setup logging
LOG_DIR = Path(__file__).parent / "logs"
LOG_DIR.mkdir(exist_ok=True)
log_file = LOG_DIR / f"jira_weekly_{datetime.now().strftime('%Y%m%d_%H%M%S')}.log"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_file),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)


class JiraWeeklySummary:
    """Main class for JIRA Weekly Summary automation"""
    
    def __init__(self, config_path: str = "config.yaml"):
        """Initialize with config file"""
        self.config_path = Path(__file__).parent / config_path
        self.config = self._load_config()
        self.temp_dir = Path(__file__).parent / "temp"
        self.temp_dir.mkdir(exist_ok=True)
        
    def _load_config(self) -> dict:
        """Load configuration from YAML file"""
        try:
            with open(self.config_path, 'r') as f:
                config = yaml.safe_load(f)
            logger.info(f"Configuration loaded from {self.config_path}")
            return config
        except Exception as e:
            logger.error(f"Failed to load config: {e}")
            sys.exit(1)
    
    def fetch_jira_data(self, team: str) -> dict:
        """Fetch JIRA issues for specified team"""
        logger.info(f"Fetching JIRA data for team: {team}")
        
        team_config = self.config['teams'][team]
        jira_filter = team_config['jira_filter']
        
        url = self.config['jira']['api_url']
        headers = {
            'Authorization': f"Bearer {self.config['jira']['pat_token']}",
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        
        payload = {
            'jql': f'filter = {jira_filter} ORDER BY updated DESC',
            'maxResults': self.config['jira']['max_results'],
            'fields': self.config['jira']['fields']
        }
        
        try:
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()
            
            data = response.json()
            logger.info(f"Successfully fetched {data.get('total', 0)} issues")
            
            # Save to temp file
            temp_file = self.temp_dir / f"jira_response_{team}.json"
            with open(temp_file, 'w') as f:
                json.dump(data, f, indent=2)
            
            return data
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to fetch JIRA data: {e}")
            raise
    
    def _truncate_summary(self, summary: str, max_length: int = 60) -> str:
        """Truncate summary to max length"""
        if len(summary) <= max_length:
            return summary
        return summary[:max_length] + "..."
    
    def _build_member_task_block(self, email: str, tasks: List[dict]) -> str:
        """Build task block for a single member"""
        if not tasks:
            return f"**<mention-tag target=\"seatalk://user?email={email}\"/>:**\n```\nNo tasks this week\n```\n\n"
        
        task_lines = []
        for i, task in enumerate(tasks[:3], 1):
            summary = self._truncate_summary(task['summary'], 60)
            task_lines.append(f"{i}. [{task['key']}] {summary}")
            task_lines.append(f"   Status: {task['status']}")
            task_lines.append("")
        
        # Add "more tasks" line if needed
        remaining = len(tasks) - 3
        if remaining > 0:
            task_lines.append(f"• +{remaining} more task(s)")
        else:
            # Remove last empty line
            task_lines = task_lines[:-1]
        
        tasks_text = "\n".join(task_lines)
        return f"**<mention-tag target=\"seatalk://user?email={email}\"/>:**\n```\n{tasks_text}\n```\n\n"
    
    def _split_into_chunks(self, text: str, max_length: int = 900) -> List[str]:
        """Split text into chunks under max_length"""
        if len(text) <= max_length:
            return [text]
        
        chunks = []
        lines = text.split('\n\n')
        current_chunk = []
        current_length = 0
        
        for line in lines:
            line_length = len(line) + 2
            if current_length + line_length > max_length and current_chunk:
                chunks.append('\n\n'.join(current_chunk))
                current_chunk = [line]
                current_length = line_length
            else:
                current_chunk.append(line)
                current_length += line_length
        
        if current_chunk:
            chunks.append('\n\n'.join(current_chunk))
        
        return chunks
    
    def _generate_clean_summary(self, issues: List[dict], status_filter: List[str]) -> str:
        """Generate clean bullet summary for tickets"""
        summaries = [
            issue['fields']['summary'] 
            for issue in issues 
            if issue['fields']['status']['name'] in status_filter
        ]
        
        if not summaries:
            return "• No tasks"
        
        work_items = []
        
        # Native Regression
        native_regression = [s for s in summaries if 'Native Regression' in s and '3.66' in s]
        if native_regression:
            work_items.append(f"• Native Regression 3.66 ({len(native_regression)} regions)")
        
        # Product Line
        product_line = [s for s in summaries if 'Product Line' in s or 'product line' in s.lower()]
        if product_line:
            work_items.append(f"• Product Line testing ({len(product_line)} tasks)")
        
        # Portal Admin
        portal_admin = [s for s in summaries if 'Portal Admin' in s]
        if portal_admin:
            work_items.append(f"• Portal Admin OO regression")
        
        # Seller-App
        seller_app = [s for s in summaries if 'Seller-App' in s or 'Seller-app' in s or 'seller-app' in s.lower()]
        if seller_app:
            work_items.append(f"• Seller-App testing and fixes")
        
        # POP tasks
        pop_tasks = [s for s in summaries if 'POP' in s or '[POP]' in s]
        for task in pop_tasks[:2]:  # Limit to 2
            work_items.append(f"• {task.replace('[POP]', 'POP:').strip()}")
        
        # Adjacent Market
        adjacent = [s for s in summaries if 'Adjacent' in s or 'AME' in s or '[ame]' in s.lower()]
        if adjacent:
            work_items.append(f"• Adjacent Market Feature QA (KH/MM)")
        
        # Hotfix and Adhoc
        hotfix = [s for s in summaries if 'Hotfix' in s or 'hotfix' in s or 'Adhoc' in s or 'adhoc' in s or 'AdHoc' in s]
        if hotfix and not any('3.66' in h for h in hotfix):
            work_items.append(f"• Hotfix and Adhoc testing")
        
        # Add remaining count if needed
        if len(work_items) > 6:
            work_items = work_items[:5]
            work_items.append(f"• +{len(summaries) - 5} more task(s)")
        elif len(summaries) > sum([len(native_regression), len(product_line), len(portal_admin), len(seller_app), len(pop_tasks), len(adjacent), len(hotfix)]):
            remaining = len(summaries) - len(work_items)
            if remaining > 0:
                work_items.append(f"• +{remaining} more task(s)")
        
        return "\n".join(work_items)
    
    def _calculate_statistics(self, issues: List[dict]) -> dict:
        """Calculate ticket statistics"""
        stats = {
            'total': len(issues),
            'testing': len([i for i in issues if i['fields']['status']['name'] == 'Testing']),
            'doing': len([i for i in issues if i['fields']['status']['name'] == 'Doing']),
            'done': len([i for i in issues if i['fields']['status']['name'] == 'Done']),
            'closed': len([i for i in issues if i['fields']['status']['name'] == 'Closed']),
            'waiting': len([i for i in issues if i['fields']['status']['name'] == 'Waiting'])
        }
        stats['done_closed'] = stats['done'] + stats['closed']
        stats['in_progress'] = stats['testing'] + stats['doing'] + stats['waiting']
        
        return stats
    
    def build_message_all_teams(self, jira_data: dict) -> tuple:
        """Build messages for all_teams (returns 2 messages)"""
        logger.info("Building messages for all_teams")
        
        issues = jira_data['issues']
        
        # Group tasks by assignee
        tasks_by_assignee = defaultdict(list)
        for issue in issues:
            email = issue['fields']['assignee']['emailAddress']
            tasks_by_assignee[email].append({
                'key': issue['key'],
                'summary': issue['fields']['summary'],
                'status': issue['fields']['status']['name'],
                'updated': issue['fields']['updated']
            })
        
        # Sort by updated date
        for email in tasks_by_assignee:
            tasks_by_assignee[email].sort(key=lambda x: x['updated'], reverse=True)
        
        # Calculate stats
        stats = self._calculate_statistics(issues)
        
        # Generate summaries
        in_progress_summary = self._generate_clean_summary(issues, ['Testing', 'Doing'])
        completed_summary = self._generate_clean_summary(issues, ['Done', 'Closed'])
        
        # Date range
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        date_start = start_date.strftime('%d/%b/%y')
        date_end = end_date.strftime('%d/%b/%y')
        
        # Build stats section
        def build_stats_section(subteam_name: str) -> str:
            return f"""**📊 Stats:** {stats['total']} tickets | Testing: {stats['testing']} | Doing: {stats['doing']} | Done/Closed: {stats['done_closed']} | Waiting: {stats['waiting']}

**🧾 Summary:**

{subteam_name} still working on this tasks:
{in_progress_summary}

{subteam_name} has completed these tasks:
{completed_summary}

**📋 To-do:** Please write down any task (if any)

<mention-tag target="seatalk://user?id=0"/>"""
        
        # Build Message 1: Buyer + Seller-Fulfillment
        msg1_config = self.config['teams']['all_teams']['message1']
        buyer_members = msg1_config['buyer']['members']
        seller_members = msg1_config['seller_fulfillment']['members']
        
        buyer_section = f"**🛒 Buyer**\n\n"
        for email in buyer_members:
            tasks = tasks_by_assignee.get(email, [])
            buyer_section += self._build_member_task_block(email, tasks)
        
        seller_section = f"**📦 Seller-Fulfillment**\n\n"
        for email in seller_members:
            tasks = tasks_by_assignee.get(email, [])
            seller_section += self._build_member_task_block(email, tasks)
        
        stats_msg1 = build_stats_section(msg1_config['subteam_name'])
        
        all_text_msg1 = buyer_section + "\n\n" + seller_section + "\n\n" + stats_msg1
        chunks_msg1 = self._split_into_chunks(all_text_msg1, max_length=900)
        
        message1 = self._build_message_structure(chunks_msg1, date_start, date_end, "147119")
        
        # Build Message 2: Order Ops + Promotion
        msg2_config = self.config['teams']['all_teams']['message2']
        order_ops_members = msg2_config['order_ops']['members']
        promotion_members = msg2_config['promotion']['members']
        
        order_ops_section = f"**📋 Order Ops**\n\n"
        for email in order_ops_members:
            tasks = tasks_by_assignee.get(email, [])
            order_ops_section += self._build_member_task_block(email, tasks)
        
        promotion_section = f"**🎯 Promotion**\n\n"
        for email in promotion_members:
            tasks = tasks_by_assignee.get(email, [])
            promotion_section += self._build_member_task_block(email, tasks)
        
        stats_msg2 = build_stats_section(msg2_config['subteam_name'])
        
        all_text_msg2 = order_ops_section + "\n\n" + promotion_section + "\n\n" + stats_msg2
        chunks_msg2 = self._split_into_chunks(all_text_msg2, max_length=900)
        
        message2 = self._build_message_structure(chunks_msg2, date_start, date_end, "147119")
        
        # Save messages
        with open(self.temp_dir / "message_all_teams_1.json", 'w') as f:
            json.dump(message1, f, indent=2)
        with open(self.temp_dir / "message_all_teams_2.json", 'w') as f:
            json.dump(message2, f, indent=2)
        
        logger.info(f"Messages built: {len(chunks_msg1)} + {len(chunks_msg2)} description elements")
        
        return message1, message2
    
    def _build_message_structure(self, chunks: List[str], date_start: str, date_end: str, filter_id: str) -> dict:
        """Build SeaTalk message structure"""
        elements = [
            {
                "element_type": "title",
                "title": {
                    "text": f"👥 All Teams - Weekly Summary ({date_start} - {date_end})"
                }
            }
        ]
        
        # Add description elements
        for chunk in chunks:
            elements.append({
                "element_type": "description",
                "description": {
                    "text": chunk
                }
            })
        
        # Add button
        elements.append({
            "element_type": "button",
            "button": {
                "button_type": "redirect",
                "text": "View Details",
                "mobile_link": {
                    "type": "web",
                    "path": f"https://jira.shopee.io/issues/?filter={filter_id}",
                    "params": {}
                },
                "desktop_link": {
                    "type": "web",
                    "path": f"https://jira.shopee.io/issues/?filter={filter_id}"
                }
            }
        })
        
        return {
            "tag": "interactive_message",
            "interactive_message": {
                "elements": elements
            }
        }
    
    def send_to_webhook(self, message: dict, webhook_id: str, message_num: int = 1) -> bool:
        """Send message to SeaTalk webhook"""
        url = f"https://openapi.seatalk.io/webhook/group/{webhook_id}"
        
        try:
            logger.info(f"Sending message {message_num} to webhook...")
            response = requests.post(url, headers={'Content-Type': 'application/json'}, json=message)
            response.raise_for_status()
            
            result = response.json()
            if result.get('code') == 0:
                logger.info(f"✅ Message {message_num} sent successfully!")
                return True
            else:
                logger.error(f"❌ Webhook returned error: {result}")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"❌ Failed to send message {message_num}: {e}")
            return False
    
    def run(self, team: str = "all_teams", mode: str = "test"):
        """Main execution method"""
        logger.info("="*70)
        logger.info(f"🚀 Starting JIRA Weekly Summary - Team: {team}, Mode: {mode.upper()}")
        logger.info("="*70)
        
        try:
            # Step 1: Fetch JIRA data
            logger.info("📥 Step 1: Fetching JIRA data...")
            jira_data = self.fetch_jira_data(team)
            
            # Step 2: Build messages
            logger.info("🔨 Step 2: Building messages...")
            if team == "all_teams":
                message1, message2 = self.build_message_all_teams(jira_data)
                
                # Step 3: Send to webhook
                logger.info("📤 Step 3: Sending messages to webhook...")
                webhook_id = self.config['teams'][team]['webhook_test'] if mode == 'test' else self.config['teams'][team]['webhook_production']
                
                success1 = self.send_to_webhook(message1, webhook_id, 1)
                time.sleep(2)  # Wait 2 seconds
                success2 = self.send_to_webhook(message2, webhook_id, 2)
                
                if success1 and success2:
                    logger.info("✅ All messages sent successfully!")
                    logger.info(f"📊 Total issues: {len(jira_data['issues'])}")
                    logger.info(f"📱 Webhook: {mode.upper()} ({webhook_id})")
                    return True
                else:
                    logger.error("❌ Some messages failed to send")
                    return False
            else:
                # Single team implementation (to be added if needed)
                logger.warning("Single team mode not yet implemented")
                return False
                
        except Exception as e:
            logger.error(f"❌ Execution failed: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return False
        finally:
            logger.info("="*70)
            logger.info(f"📋 Log file: {log_file}")
            logger.info("="*70)


def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description='JIRA Weekly Summary Automation')
    parser.add_argument('--team', default='all_teams', help='Team name (default: all_teams)')
    parser.add_argument('--mode', default='test', choices=['test', 'production'], help='Execution mode')
    parser.add_argument('--config', default='config.yaml', help='Config file path')
    
    args = parser.parse_args()
    
    summary = JiraWeeklySummary(config_path=args.config)
    success = summary.run(team=args.team, mode=args.mode)
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()

