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
        console.log('Starting scheduled security stats update...');

        // Get the service role key
        const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        if (!serviceRoleKey || !supabaseUrl) {
            throw new Error('Supabase configuration missing');
        }

        // Get current statistics
        const currentStatsResponse = await fetch(`${supabaseUrl}/rest/v1/security_statistics?select=*&order=created_at.desc&limit=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json'
            }
        });

        if (!currentStatsResponse.ok) {
            throw new Error('Failed to fetch current statistics');
        }

        const currentStatsData = await currentStatsResponse.json();
        const currentStats = currentStatsData.length > 0 ? currentStatsData[0] : {
            total_protocols: 37,
            vulnerabilities_prevented: 478,
            assets_protected_millions: 78.00,
            hack_attempts_blocked: 46
        };

        // Generate realistic changes
        const vulnerabilitiesChange = Math.random() > 0.6 ? Math.floor(Math.random() * 8) + 1 : 0;
        const hackAttemptsChange = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0;
        const assetsChange = Math.random() > 0.8 ? (Math.random() * 3).toFixed(2) : "0";

        // Calculate new stats
        const newStats = {
            total_protocols: 37, // Protocols remain stable
            vulnerabilities_prevented: currentStats.vulnerabilities_prevented + vulnerabilitiesChange,
            assets_protected_millions: parseFloat(currentStats.assets_protected_millions) + parseFloat(assetsChange),
            hack_attempts_blocked: currentStats.hack_attempts_blocked + hackAttemptsChange
        };

        console.log('Generated new stats:', newStats);

        // Insert new statistics record
        const insertResponse = await fetch(`${supabaseUrl}/rest/v1/security_statistics`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'apikey': serviceRoleKey,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                ...newStats,
                last_updated: new Date().toISOString(),
                created_at: new Date().toISOString()
            })
        });

        if (!insertResponse.ok) {
            const errorText = await insertResponse.text();
            console.error('Database insert failed:', errorText);
            throw new Error(`Database insert failed: ${errorText}`);
        }

        const insertedStats = await insertResponse.json();
        console.log('Scheduled stats update completed successfully:', insertedStats);

        return new Response(JSON.stringify({
            data: {
                message: 'Security statistics updated successfully',
                changes: {
                    vulnerabilities_added: vulnerabilitiesChange,
                    hack_attempts_added: hackAttemptsChange,
                    assets_added: parseFloat(assetsChange)
                },
                new_stats: insertedStats[0]
            }
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Scheduled stats update error:', error);

        const errorResponse = {
            error: {
                code: 'SCHEDULED_UPDATE_FAILED',
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