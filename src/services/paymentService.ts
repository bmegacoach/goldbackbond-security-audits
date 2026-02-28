import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_dummy');

export interface PaymentData {
  amount: number;
  currency: string;
  tier: 'silver' | 'gold' | 'platinum';
  customerEmail?: string;
  protocolName?: string;
  description?: string;
}

export interface PaymentResult {
  success: boolean;
  error?: string;
  paymentIntentId?: string;
}

export class PaymentService {
  private static async getStripe() {
    return await stripePromise;
  }

  // Create payment intent via Supabase Edge Function
  static async createPaymentIntent(paymentData: PaymentData): Promise<PaymentResult> {
    try {
      console.log('Creating payment intent for:', paymentData);

      // Check if we have valid Stripe configuration
      if (!this.validateConfiguration()) {
        throw new Error('Stripe is not properly configured. Please add your API keys.');
      }

      // Call Supabase Edge Function
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase configuration is missing.');
      }
      
      const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Payment processing failed');
      }

      const result = await response.json();
      
      return {
        success: true,
        paymentIntentId: result.data.paymentIntentId
      };
    } catch (error) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Payment processing failed'
      };
    }
  }

  // Redirect to Stripe Checkout (production implementation)
  static async redirectToCheckout(tier: 'silver' | 'gold' | 'platinum', protocolName?: string): Promise<void> {
    console.log('PaymentService.redirectToCheckout called with:', { tier, protocolName });

    const successUrl = `${window.location.origin}/payment-success?tier=${tier}&protocol=${encodeURIComponent(protocolName || '')}`;
    const cancelUrl = `${window.location.origin}/pricing`;
    
    // Get price IDs from environment variables with fallback placeholders
    const tierPriceMap = {
      silver: import.meta.env.VITE_STRIPE_SILVER_PRICE_ID || 'price_silver_placeholder',
      gold: import.meta.env.VITE_STRIPE_GOLD_PRICE_ID || 'price_gold_placeholder',
      platinum: import.meta.env.VITE_STRIPE_PLATINUM_PRICE_ID || 'price_platinum_placeholder'
    };

    const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';

    // Check if we have real Stripe configuration
    const hasRealStripeConfig = 
      !tierPriceMap[tier].includes('placeholder') && 
      !stripePublishableKey.includes('placeholder') &&
      !stripePublishableKey.includes('pk_test_dummy');

    if (!hasRealStripeConfig) {
      // Demo mode - show configuration message
      console.log('Stripe not configured. Showing demo payment flow.');
      
      // Show demo modal or redirect to demo success page
      alert(`Demo Mode: Stripe payment for ${tier.toUpperCase()} tier would redirect to real checkout.

To enable real payments, please provide:
1. Stripe Price IDs for each tier
2. Stripe Publishable Key

Demo will proceed to success page for testing.`);
      
      // Redirect to success page for demo
      window.location.href = successUrl;
      return;
    }

    // For production, use Stripe Checkout with proper API integration
    // This creates a checkout session and redirects to Stripe
    
    // First, get the Stripe instance
    const { loadStripe } = await import('@stripe/stripe-js');
    const stripe = await loadStripe(stripePublishableKey);
    
    if (!stripe) {
      throw new Error('Failed to load Stripe');
    }

    // Create a checkout session via backend API
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      // If no backend available, redirect to Stripe Checkout URL directly
      console.log('No backend available, redirecting to Stripe Checkout URL');
      
      // Construct Stripe checkout URL
      const checkoutUrl = `https://checkout.stripe.com/c/pay?client_reference_id=${tier}&metadata=${encodeURIComponent(JSON.stringify({ tier, protocolName }))}&success_url=${encodeURIComponent(successUrl)}&cancel_url=${encodeURIComponent(cancelUrl)}#pay`;
      
      window.location.href = checkoutUrl;
      return;
    }

    // Create payment intent via Supabase Edge Function
    const response = await fetch(`${supabaseUrl}/functions/v1/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        amount: tier === 'silver' ? 3500 : tier === 'gold' ? 6500 : 9500,
        currency: 'usd',
        tier,
        protocolName,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { data } = await response.json();
    
    if (data.clientSecret) {
      // Use Stripe Elements for card collection
      const { error } = await stripe.confirmPayment({
        clientSecret: data.clientSecret,
        confirmParams: {
          return_url: successUrl,
        },
      });

      if (error) {
        console.error('Stripe payment error:', error);
        throw new Error(error.message || 'Payment failed');
      }
    }
  }

  // Validate payment configuration
  static validateConfiguration(): boolean {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    return !!publishableKey && publishableKey !== 'pk_test_dummy';
  }
}
