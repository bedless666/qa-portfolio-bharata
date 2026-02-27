#!/bin/bash

# JIRA Weekly Summary - Cronjob Runner
# This script is designed to be called by cron

# Set working directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Activate virtual environment if exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Run Python script
python3 jira_weekly.py --team all_teams --mode production

# Check exit code
if [ $? -eq 0 ]; then
    echo "$(date): JIRA Weekly Summary executed successfully" >> cronjob.log
else
    echo "$(date): JIRA Weekly Summary execution failed" >> cronjob.log
fi

