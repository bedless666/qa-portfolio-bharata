"""
Shop Activation Configuration
"""

import os

# ============================================================================
# API CONFIGURATION
# ============================================================================

# Shark API Configuration
SHARK_API = {
    'URL': 'https://shark.test.shopee.io/api/promotion/script/op',
    'COOKIE': 'YOUR_SHARK_COOKIE_HERE',
    'HEADERS': {
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'origin': 'https://shark.test.shopee.io',
        'referer': 'https://shark.test.shopee.io/create-order?type=Tool&subType=1/Tool/Active_Shop',
        'shopee-baggage': 'PFB='
    }
}

# JIRA Configuration
JIRA = {
    'URL': 'https://jira.shopee.io/rest/api/2/issue',
    'TOKEN': 'YOUR_JIRA_TOKEN_HERE',
    'PROJECT_KEY': 'SPMR',
    'ISSUE_TYPE': 'Task',
    'PRIORITY': 'Medium'
}

# SeaTalk Webhook Configuration
SEATALK = {
    'TEST_WEBHOOK': 'YOUR_SEATALK_TEST_WEBHOOK_TOKEN_HERE',
    'PRODUCTION_WEBHOOK': 'YOUR_SEATALK_PRODUCTION_WEBHOOK_TOKEN_HERE',
    'BASE_URL': 'https://openapi.seatalk.io/webhook/group/'
}

# ============================================================================
# FILE PATHS
# ============================================================================

# Get the directory where this config file is located
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# CSV File Paths (relative to parent folder shop-activation-no-script)
PARENT_DIR = os.path.join(BASE_DIR, '..', 'shop-activation-no-script')
TEST_CSV = os.path.join(PARENT_DIR, 'test_shop.csv')
PRODUCTION_CSV = os.path.join(PARENT_DIR, 'active_shop.csv')

# Google Sheets Link
SHEET_LINK = 'https://docs.google.com/spreadsheets/d/1Ka8WrM4VuqbuDdRO02b44mbycbld8x24cLNaN8E7hGw/edit?gid=1476342514#gid=1476342514&range=A55'

# ============================================================================
# SETTINGS
# ============================================================================

# Delay between API calls (in seconds) to avoid rate limiting
API_DELAY = 0.5

# Request timeout (in seconds)
REQUEST_TIMEOUT = 30

# Retry configuration
MAX_RETRIES = 3
RETRY_DELAY = 2

# ============================================================================
# MODE CONFIGURATION
# ============================================================================

MODE_CONFIG = {
    'test': {
        'csv_file': TEST_CSV,
        'webhook': SEATALK['TEST_WEBHOOK'],
        'mode_name': 'TEST',
        'labels': ['shop-activation', 'automation', 'test']
    },
    'production': {
        'csv_file': PRODUCTION_CSV,
        'webhook': SEATALK['PRODUCTION_WEBHOOK'],
        'mode_name': 'PRODUCTION',
        'labels': ['shop-activation', 'automation', 'production']
    }
}

# ============================================================================
# LOGGING CONFIGURATION
# ============================================================================

LOG_DIR = os.path.expanduser('~/Documents/Docs/log')
LOG_FILE = os.path.join(LOG_DIR, 'shop_activation_python.log')

# Ensure log directory exists
os.makedirs(LOG_DIR, exist_ok=True)

