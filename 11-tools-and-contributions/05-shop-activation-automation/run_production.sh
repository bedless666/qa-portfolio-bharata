#!/bin/bash

# Shop Activation - Production Mode Runner
# This script runs shop activation in PRODUCTION mode

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Running Shop Activation - PRODUCTION MODE"
echo "============================================="
echo ""

# Run the Python script in production mode with confirmation skip (for cronjob)
python3 "$SCRIPT_DIR/activate_shops.py" production --skip-confirmation

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo ""
    echo "✅ Production activation completed successfully!"
else
    echo ""
    echo "⚠️  Production activation completed with errors. Check logs for details."
fi

exit $exit_code

