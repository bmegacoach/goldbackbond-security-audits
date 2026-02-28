Deno.serve(async (req) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
        'Access-Control-Max-Age': '86400',
        'Access-Control-Allow-Credentials': 'false'
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 200, headers: corsHeaders });
    }

    try {
        // Get the service role key
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        console.log('Fetching security statistics...');

        // Get the most recent statistics record
        const statsResponse = await fetch(`${supabaseUrl}/rest/v1/security_statistics?select=*&order=created_at.desc&limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!statsResponse.ok) {
            const errorText = await statsResponse.text();
            console.error('Database query failed:', errorText);
            throw new Error(`Database query failed: ${errorText}`);
        }

        const statsData = await statsResponse.json();
        
        // Return the most recent stats or default values if none exist
        const currentStats = statsData.length > 0 ? statsData[0] : {
            total_protocols: 37,
            vulnerabilities_prevented: 478,
            assets_protected_millions: 78.00,
            hack_attempts_blocked: 46,
            last_updated: new Date().toISOString()
        };

        console.log('Statistics retrieved successfully:', currentStats);

        return new Response(JSON.stringify({
            data: {
                stats: currentStats,
                timestamp: new Date().toISOString()
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Security stats fetch error:', error);

        const errorResponse = {
            error: {
                code: 'STATS_FETCH_FAILED',
                message: error.message,
                timestamp: new Date().toISOString()
            }
        };

        return new Response(JSON.stringify(errorResponse), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
});