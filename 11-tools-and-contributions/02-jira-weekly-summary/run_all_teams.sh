#!/bin/bash
# Run JIRA Weekly Report for All Teams
# Sends reports for all 4 teams to the specified webhook
# Usage: ./run_all_teams.sh [webhook_id] [mode]

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WEBHOOK_ID="${1:-7BTJoSlqSnKFhaYOAnD1Aw}"
MODE="${2:-production}"
PYTHON_BIN="/usr/bin/python3"

echo "=========================================="
echo "JIRA Weekly - All Teams Report"
echo "Webhook: $WEBHOOK_ID"
echo "Mode: $MODE"
echo "Time: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="

# Create temporary config with custom webhook
CONFIG_FILE="$SCRIPT_DIR/config_runtime.yaml"

cat > "$CONFIG_FILE" << 'EOF'
# JIRA Weekly Summary - Runtime Configuration File

jira:
  api_url: "https://jira.shopee.io/rest/api/2/search"
  pat_token: "YOUR_JIRA_PAT_TOKEN_HERE"
  fields:
    - "key"
    - "summary"
    - "status"
    - "assignee"
    - "updated"
  max_results: 100

teams:
  promotion:
    jira_filter: 148522
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "rika.wulandari@shopee.com"
      - "bharata.aryaseta@shopee.com"
      - "kevin.gosalim@shopee.com"
  
  buyer:
    jira_filter: 149233
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "theresia.theresia@shopee.com"
      - "herrista.putri@shopee.com"
      - "anisa.karina@shopee.com"
  
  seller_fulfillment:
    jira_filter: 149234
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "ivan.jond@shopee.com"
      - "rizky.ashari@shopee.com"
      - "hanif.kusuma@shopee.com"
      - "flavianus.delvin@shopee.com"
  
  order_ops:
    jira_filter: 147119
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "otavia.novi@shopee.com"
      - "adelina.nataye@shopee.com"
      - "katriel.widjaja@shopee.com"
      - "otniel.hussin@shopee.com"
EOF

# Replace webhook placeholder with actual webhook ID
sed -i '' "s/WEBHOOK_PLACEHOLDER/$WEBHOOK_ID/g" "$CONFIG_FILE"

# Run reports for all teams
TEAMS=("buyer" "seller_fulfillment" "promotion" "order_ops")
SUCCESS_COUNT=0
FAIL_COUNT=0

for TEAM in "${TEAMS[@]}"; do
    echo ""
    echo "--- Running: $TEAM ---"
    cd "$SCRIPT_DIR"
    if $PYTHON_BIN jira_weekly.py --team "$TEAM" --mode "$MODE" --config config_runtime.yaml 2>&1 | grep -E "(Starting|fetched|sent|Total issues)"; then
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo "❌ Failed: $TEAM"
        FAIL_COUNT=$((FAIL_COUNT + 1))
    fi
    sleep 2  # Wait 2 seconds between teams
done

# Cleanup temp config
rm -f "$CONFIG_FILE"

echo ""
echo "=========================================="
echo "Summary: $SUCCESS_COUNT succeeded, $FAIL_COUNT failed"
echo "=========================================="

