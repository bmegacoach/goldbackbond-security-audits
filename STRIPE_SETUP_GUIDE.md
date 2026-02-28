# Stripe Payment Integration Setup Guide

## Overview
This guide will help you set up production-ready Stripe payment integration for the Goldbackbond Security Audits website.

## Prerequisites
1. Stripe account (sign up at https://stripe.com)
2. Supabase project for backend services
3. Access to deploy Supabase Edge Functions

## Step 1: Configure Stripe Dashboard

### 1.1 Enable Crypto Payments
1. Go to your Stripe Dashboard → Settings → Payment Methods
2. Enable "Crypto" payment method
3. Configure supported cryptocurrencies (BTC, ETH, USDC recommended)

### 1.2 Disable Tax Collection
1. Go to your Stripe Dashboard → Settings → Tax
2. Disable automatic tax calculation for this product
3. Or configure tax rules if required in your jurisdiction

### 1.3 Create Price Objects
Create these one-time prices in Stripe Dashboard:

| Tier | Amount | Currency | Description |
|------|--------|----------|-------------|
| Silver | $3,500 | USD | Goldbackbond Static Security Audit |
| Gold | $6,500 | USD | Goldbackbond Deep Dive Audit |
| Platinum | $9,500 | USD | Goldbackbond Institutional Audit |

**Note**: Record the Price IDs (e.g., `price_1ABC123DEF456`) for the next step.

## Step 2: Update Edge Function

### 2.1 Configure Price IDs
Edit `/workspace/goldbackbond-security/supabase/functions/create-payment-intent/index.ts`:

```typescript
// Map tiers to Stripe price IDs (replace with your actual Price IDs)
const tierPriceMap = {
    silver: 'price_1ABC123',     // Replace with your Silver Price ID
    gold: 'price_1DEF456',       // Replace with your Gold Price ID
    platinum: 'price_1GHI789'    // Replace with your Platinum Price ID
};
```

## Step 3: Set Up Environment Variables

### 3.1 Frontend (.env.local)
Create `.env.local` in the project root:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.2 Supabase Edge Function
In your Supabase Dashboard → Settings → Edge Functions → Environment Variables:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Step 4: Deploy Supabase Edge Function

### 4.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 4.2 Login and Link Project
```bash
supabase login
supabase link --project-ref your-project-ref
```

### 4.3 Deploy Edge Function
```bash
supabase functions deploy create-payment-intent
```

## Step 5: Test Payment Integration

### 5.1 Test with Stripe Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Requires authentication: `4000 0027 6000 3184`

### 5.2 Test Crypto Payments
1. Use Stripe's crypto payment testing
2. Verify crypto transactions are processed correctly

## Step 6: Go Live

### 6.1 Switch to Live Mode
1. Update all environment variables to live keys (remove `_test_` prefix)
2. Redeploy edge functions with live configuration
3. Update frontend to use live Stripe keys

### 6.2 Verify Production Setup
- Test real payment processing
- Verify webhook endpoints
- Confirm email receipts
- Test refund process

## API Integration Details

### Frontend Payment Flow
1. User selects tier and enters protocol name
2. `handlePayment()` is called
3. `PaymentService.redirectToCheckout()` processes payment
4. User redirected to success page with confirmation

### Backend Processing
1. Supabase Edge Function creates Stripe Payment Intent
2. Enables crypto payment methods
3. Handles payment confirmation
4. Returns client secret for frontend

### Error Handling
- Network failures
- Invalid API keys
- Payment declines
- Currency issues

## Security Considerations

1. **API Keys**: Never expose secret keys in frontend code
2. **Webhook Verification**: Implement webhook signature verification
3. **PCI Compliance**: Use Stripe's secure payment forms
4. **Rate Limiting**: Implement rate limiting on edge functions

## Troubleshooting

### Common Issues
1. **"Stripe not configured"**: Check environment variables
2. **CORS errors**: Verify edge function deployment
3. **Payment declines**: Check card details and limits
4. **Crypto payments not working**: Verify crypto payment method is enabled

### Debug Mode
Enable detailed logging by checking browser console and Supabase function logs.

## Support
- Stripe Documentation: https://stripe.com/docs
- Supabase Documentation: https://supabase.com/docs
- Goldbackbond Support: security@goldbackbond.com
