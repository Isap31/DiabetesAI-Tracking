#!/bin/bash

# AuroraFlow Test Runner Script

echo "🚀 AuroraFlow Test Runner"
echo "========================"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Function to run tests
run_tests() {
    local test_type=$1
    local command=$2
    
    echo ""
    echo "🧪 Running $test_type tests..."
    echo "Command: $command"
    echo ""
    
    eval $command
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ $test_type tests passed!"
    else
        echo ""
        echo "❌ $test_type tests failed!"
        exit 1
    fi
}

# Parse command line arguments
case "${1:-test}" in
    "test")
        run_tests "all" "npm test"
        ;;
    "watch")
        run_tests "watch mode" "npm run test:watch"
        ;;
    "coverage")
        run_tests "coverage" "npm run test:coverage"
        echo ""
        echo "📊 Coverage report generated in coverage/ directory"
        ;;
    "ui")
        run_tests "UI mode" "npm run test:ui"
        ;;
    "ci")
        run_tests "CI mode" "npm run test:ci"
        ;;
    "debug")
        run_tests "debug mode" "npm run test:debug"
        ;;
    "help")
        echo ""
        echo "Available test commands:"
        echo "  test      - Run all tests"
        echo "  watch     - Run tests in watch mode"
        echo "  coverage  - Run tests with coverage report"
        echo "  ui        - Run tests with UI"
        echo "  ci        - Run tests for CI/CD"
        echo "  debug     - Run tests in debug mode"
        echo "  help      - Show this help message"
        echo ""
        ;;
    *)
        echo "❌ Unknown command: $1"
        echo "Use 'help' to see available commands"
        exit 1
        ;;
esac 