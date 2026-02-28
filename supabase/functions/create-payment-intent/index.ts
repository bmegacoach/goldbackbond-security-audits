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
        const { amount, currency = 'usd', tier, customerEmail, protocolName } = await req.json();

        console.log('Payment intent request received:', { amount, currency, tier });

        // Validate required parameters
        if (!amount || amount <= 0) {
            throw new Error('Valid amount is required');
        }

        if (!tier || !['silver', 'gold', 'platinum'].includes(tier)) {
            throw new Error('Valid tier is required (silver, gold, or platinum)');
        }

        // Get environment variables
        const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
        
        if (!stripeSecretKey) {
            console.error('Stripe secret key not found in environment');
            throw new Error('Stripe secret key not configured');
        }

        console.log('Environment variables validated, creating payment intent...');

        // Map tiers to Stripe price IDs (these would be created in Stripe Dashboard)
        const tierPriceMap = {
            silver: 'price_1ABC123', // Replace with actual Stripe Price ID for Silver tier
            gold: 'price_1DEF456',   // Replace with actual Stripe Price ID for Gold tier
            platinum: 'price_1GHI789' // Replace with actual Stripe Price ID for Platinum tier
        };

        // Prepare Stripe payment intent data
        const stripeParams = new URLSearchParams();
        stripeParams.append('amount', Math.round(amount * 100).toString()); // Convert to cents
        stripeParams.append('currency', currency);
        stripeParams.append('payment_method_types[]', 'card');
        stripeParams.append('payment_method_types[]', 'crypto'); // Enable crypto payments
        stripeParams.append('metadata[tier]', tier);
        stripeParams.append('metadata[protocol_name]', protocolName || '');
        stripeParams.append('metadata[customer_email]', customerEmail || '');

        // Create payment intent with Stripe
        const stripeResponse = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${stripeSecretKey}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: stripeParams.toString()
        });

        console.log('Stripe API response status:', stripeResponse.status);

        if (!stripeResponse.ok) {
            const errorData = await stripeResponse.text();
            console.error('Stripe API error:', errorData);
            throw new Error(`Stripe API error: ${errorData}`);
        }

        const paymentIntent = await stripeResponse.json();
        console.log('Payment intent created successfully:', paymentIntent.id);

        const result = {
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
                amount: amount,
                currency: currency,
                tier: tier,
                status: 'pending'
            }
        };

        console.log('Payment intent creation completed successfully');

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Payment intent creation error:', error);

        const errorResponse = {
            error: {
                code: 'PAYMENT_INTENT_FAILED',
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
