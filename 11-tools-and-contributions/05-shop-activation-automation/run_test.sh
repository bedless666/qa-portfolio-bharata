#!/bin/bash

# Shop Activation - Test Mode Runner
# This script runs shop activation in TEST mode

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🧪 Running Shop Activation - TEST MODE"
echo "========================================"
echo ""

# Run the Python script in test mode
python3 "$SCRIPT_DIR/activate_shops.py" test

exit_code=$?

if [ $exit_code -eq 0 ]; then
    echo ""
    echo "✅ Test activation completed successfully!"
else
    echo ""
    echo "⚠️  Test activation completed with errors. Check logs for details."
fi

exit $exit_code

