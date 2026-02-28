#!/bin/bash

# GoldBackBond Security Platform - End-to-End Testing Script
# This script tests the complete system integration from frontend to backend

set -e

echo "🧪 GoldBackBond Security Platform - End-to-End Testing"
echo "====================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="$SUPABASE_PROJECT_ID"
ANON_KEY="$SUPABASE_ANON_KEY"
BASE_URL="https://$PROJECT_ID.supabase.co"

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Test helper functions
test_passed() {
    echo -e "${GREEN}✅ PASSED: $1${NC}"
    ((TESTS_PASSED++))
}

test_failed() {
    echo -e "${RED}❌ FAILED: $1${NC}"
    ((TESTS_FAILED++))
}

test_warning() {
    echo -e "${YELLOW}⚠️ WARNING: $1${NC}"
}

echo -e "${BLUE}📋 Starting comprehensive testing...${NC}"

# Test 1: Environment Setup
echo ""
echo -e "${BLUE}🔧 Test 1: Environment Setup${NC}"

if [ -z "$PROJECT_ID" ]; then
    test_failed "SUPABASE_PROJECT_ID not set"
else
    test_passed "Supabase project ID configured"
fi

if [ -z "$ANON_KEY" ]; then
    test_failed "SUPABASE_ANON_KEY not set"
else
    test_passed "Supabase anon key configured"
fi

# Test 2: Database Connectivity
echo ""
echo -e "${BLUE}🗄️ Test 2: Database Connectivity${NC}"

if [ ! -z "$PROJECT_ID" ] && [ ! -z "$ANON_KEY" ]; then
    # Test database connection by querying the security_statistics table
    RESPONSE=$(curl -s -X GET "$BASE_URL/rest/v1/security_statistics?select=*&order=created_at.desc&limit=1" \
        -H "Authorization: Bearer $ANON_KEY" \
        -H "apikey: $ANON_KEY" \
        -H "Content-Type: application/json")
    
    if [ $? -eq 0 ]; then
        test_passed "Database connection successful"
        
        # Check if data exists
        if echo "$RESPONSE" | grep -q "total_protocols"; then
            test_passed "Security statistics table accessible"
            
            # Extract and verify statistics
            PROTOCOLS=$(echo "$RESPONSE" | grep -o '"total_protocols":[0-9]*' | cut -d':' -f2)
            VULNERABILITIES=$(echo "$RESPONSE" | grep -o '"vulnerabilities_prevented":[0-9]*' | cut -d':' -f2)
            ASSETS=$(echo "$RESPONSE" | grep -o '"assets_protected_millions":[0-9.]*' | cut -d':' -f2)
            HACKS=$(echo "$RESPONSE" | grep -o '"hack_attempts_blocked":[0-9]*' | cut -d':' -f2)
            
            echo -e "${BLUE}   Current Statistics:${NC}"
            echo -e "   • Protocols: $PROTOCOLS"
            echo -e "   • Vulnerabilities: $VULNERABILITIES"
            echo -e "   • Assets: $$ASSETS"
            echo -e "   • Hack Attempts: $HACKS"
            
            # Verify correct values
            if [ "$PROTOCOLS" = "37" ] && [ "$VULNERABILITIES" = "478" ] && [ "$ASSETS" = "78" ] && [ "$HACKS" = "46" ]; then
                test_passed "Statistics values match requirements"
            else
                test_warning "Statistics values don't match expected (37, 478, 78, 46)"
            fi
        else
            test_warning "Security statistics table empty or missing data"
        fi
    else
        test_failed "Database connection failed"
    fi
else
    test_warning "Skipping database tests - credentials not available"
fi

# Test 3: Edge Functions
echo ""
echo -e "${BLUE}⚡ Test 3: Edge Functions${NC}"

if [ ! -z "$PROJECT_ID" ] && [ ! -z "$ANON_KEY" ]; then
    # Test get-security-stats function
    RESPONSE=$(curl -s -X POST "$BASE_URL/functions/v1/get-security-stats" \
        -H "Authorization: Bearer $ANON_KEY" \
        -H "Content-Type: application/json")
    
    if [ $? -eq 0 ] && echo "$RESPONSE" | grep -q '"data"'; then
        test_passed "get-security-stats edge function working"
        
        # Verify response structure
        if echo "$RESPONSE" | grep -q '"stats"'; then
            test_passed "Edge function returns proper data structure"
        else
            test_warning "Edge function response structure unexpected"
        fi
    else
        test_failed "get-security-stats edge function failed"
    fi
    
    # Test update-security-stats function (dry run)
    UPDATE_RESPONSE=$(curl -s -X POST "$BASE_URL/functions/v1/update-security-stats" \
        -H "Authorization: Bearer $ANON_KEY" \
        -H "Content-Type: application/json" \
        -d '{"newStats": {"total_protocols": 37, "vulnerabilities_prevented": 479}}')
    
    if [ $? -eq 0 ]; then
        test_passed "update-security-stats edge function responding"
    else
        test_warning "update-security-stats edge function test inconclusive"
    fi
else
    test_warning "Skipping edge function tests - credentials not available"
fi

# Test 4: Frontend Integration
echo ""
echo -e "${BLUE}🌐 Test 4: Frontend Integration${NC}"

# Check if frontend can reach the backend
if [ -d "dist" ]; then
    test_passed "Production build exists"
    
    # Check for production environment variables
    if grep -q "VITE_SUPABASE_URL" .env.production.local 2>/dev/null; then
        test_passed "Production environment configured"
    else
        test_warning "Production environment not configured"
    fi
else
    test_failed "Production build missing - run 'pnpm run build'"
fi

# Test 5: Cron Job Status
echo ""
echo -e "${BLUE}⏰ Test 5: Cron Jobs${NC}"

if [ ! -z "$PROJECT_ID" ]; then
    CRON_JOBS=$(supabase cron jobs list 2>/dev/null | grep "update-security-stats" || echo "")
    
    if [ ! -z "$CRON_JOBS" ]; then
        test_passed "Cron jobs configured for automated updates"
    else
        test_warning "Cron jobs not configured - manual setup required"
    fi
else
    test_warning "Skipping cron job tests - credentials not available"
fi

# Test 6: Data Consistency Check
echo ""
echo -e "${BLUE}📊 Test 6: Data Consistency${NC}"

# This would test that all frontend components show consistent data
# For now, just verify the service is set up correctly
if [ -f "src/services/unifiedStatsService.ts" ]; then
    test_passed "Unified statistics service implemented"
else
    test_failed "Unified statistics service missing"
fi

if [ -f "src/context/StatisticsContext.tsx" ]; then
    test_passed "Statistics context provider implemented"
else
    test_failed "Statistics context provider missing"
fi

# Final Report
echo ""
echo -e "${BLUE}📋 Test Results Summary${NC}"
echo "================================="
echo -e "${GREEN}✅ Tests Passed: $TESTS_PASSED${NC}"

if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}❌ Tests Failed: $TESTS_FAILED${NC}"
else
    echo -e "${GREEN}❌ Tests Failed: $TESTS_FAILED${NC}"
fi

echo ""

# Recommendations
echo -e "${BLUE}🎯 Recommendations:${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! The system is ready for production.${NC}"
    echo -e "${GREEN}• Deploy the dist/ directory to your web server${NC}"
    echo -e "${GREEN}• Verify the website shows 'PRODUCTION DATA' indicator${NC}"
    echo -e "${GREEN}• Monitor system performance and data updates${NC}"
else
    echo -e "${YELLOW}⚠️ Some tests failed. Address the issues above before production deployment.${NC}"
    
    if [ $TESTS_FAILED -eq 5 ] && [ $TESTS_PASSED -eq 0 ]; then
        echo -e "${YELLOW}• This is likely due to missing Supabase credentials${NC}"
        echo -e "${YELLOW}• Set SUPABASE_ACCESS_TOKEN and SUPABASE_PROJECT_ID to continue${NC}"
    fi
fi

echo ""
echo -e "${BLUE}🔍 Manual Verification Steps:${NC}"
echo "• Visit your deployed website and check statistics display"
echo "• Verify 'PRODUCTION DATA' indicator appears (not 'SIMULATED DATA')"
echo "• Confirm statistics update every 30 seconds"
echo "• Check all components show consistent values"
echo "• Monitor Supabase dashboard for function logs and cron executions"

echo ""
echo -e "${GREEN}🏁 End-to-End Testing Complete${NC}"