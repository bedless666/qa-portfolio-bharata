#!/bin/bash
# Run JIRA Weekly Report for All Teams
# Sends reports for all 4 teams to the specified webhook
# Usage: ./run_all_teams.sh [webhook_id] [mode]

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
WEBHOOK_ID="${1:-YOUR_PRODUCTION_WEBHOOK_TOKEN}"
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
# JIRA Weekly Summary - Runtime Configuration File (sanitized)

jira:
  api_url: "https://jira.company.example/rest/api/2/search"
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
    jira_filter: 100002
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "qa.member14@company.example"
      - "qa.member15@company.example"
      - "qa.member13@company.example"

  buyer:
    jira_filter: 100003
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "qa.member01@company.example"
      - "qa.member02@company.example"
      - "qa.member03@company.example"

  seller_fulfillment:
    jira_filter: 100004
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "qa.member04@company.example"
      - "qa.member05@company.example"
      - "qa.member06@company.example"
      - "qa.member08@company.example"

  order_ops:
    jira_filter: 100005
    webhook_test: "WEBHOOK_PLACEHOLDER"
    webhook_production: "WEBHOOK_PLACEHOLDER"
    members:
      - "qa.member09@company.example"
      - "qa.member10@company.example"
      - "qa.member11@company.example"
      - "qa.member12@company.example"
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
