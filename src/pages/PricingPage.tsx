import { useState } from 'react';
import { Check, Zap, Shield, Crown, Calculator, CreditCard, Activity } from 'lucide-react';
import { PaymentService } from '../services/paymentService';

export const PricingPage = () => {
  const [selectedTier, setSelectedTier] = useState('platinum');
  const [financingMode, setFinancingMode] = useState('pay-now');
  const [tokenAmount, setTokenAmount] = useState('50000');
  const [isProcessing, setIsProcessing] = useState(false);
  const [protocolName, setProtocolName] = useState('');

  const tiers = [
    {
      id: 'silver',
      name: 'Silver',
      subtitle: 'STATIC SECURITY',
      price: '$3,500',
      delivery: '5-7 days',
      description: 'Comprehensive static analysis and manual review for smaller protocols',
      features: [
        'Automated Static Analysis (Slither/Mythril)',
        'Manual Logic Review',
        'Gas Optimization Report',
        '1 Added Re-audit',
        'Standard Security Badge',
        'Email Support',
        '5-7 Day Report Delivery'
      ],
      limitations: [
        'No Active Monitoring'
      ],
      expedite: '+20%',
      color: 'border-gray-500/30 bg-gray-500/5',
      buttonClass: 'border-gray-500/30 text-gray-400 hover:bg-gray-500/10',
      icon: Shield,
      recommended: false
    },
    {
      id: 'gold',
      name: 'Gold',
      subtitle: 'DEEP DIVE',
      price: '$6,500',
      delivery: '7-10 days',
      description: 'Advanced audit with comprehensive testing and expert analysis',
      features: [
        'Everything in Silver',
        'Foundry Invariant Testing (Fuzzing)',
        'Economic Attack Simulation',
        'Remediation Support (1 Re-audit included)',
        'Premium Security Badge',
        'Priority Support',
        '7-10 Day Report Delivery'
      ],
      limitations: [],
      expedite: '+20%',
      color: 'border-metallic-gold/30 bg-metallic-gold/5',
      buttonClass: 'border-metallic-gold/30 text-metallic-gold hover:bg-metallic-gold/10',
      icon: Zap,
      recommended: false
    },
    {
      id: 'platinum',
      name: 'Platinum',
      subtitle: 'INSTITUTIONAL',
      price: '$9,500',
      delivery: '10 days',
      description: 'The ultimate security solution with 24/7 monitoring and warranty coverage',
      features: [
        'Everything in Gold',
        'GBB Guardian Node (24/7 Monitoring) $497/mo starting month 2, cancel anytime',
        'Performance Warranty (Liability Shield)',
        'Zero-Trust Dashboard Access',
        'Institutional Security Badge',
        'Dedicated Security Analyst',
        '10-Day Report Delivery'
      ],
      limitations: [],
      expedite: '+20%',
      color: 'border-cyber-green/30 bg-cyber-green/5 ring-2 ring-cyber-green/20',
      buttonClass: 'bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green text-cyber-green hover:text-void-black',
      icon: Crown,
      recommended: true,
      financingSection: {
        title: 'FINANCING AVAILABLE:',
        description: 'Preserve your treasury. Up to 50 assets available. No monthly payment.'
      }
    }
  ];

  const goldbackbondBenefits = [
    'Up to 90% LTV Financing',
    'Flexible Repayment Terms',
    'No Treasury Liquidation Required',
    'Institutional-Grade Terms',
    'Asset-Backed Financing Available'
  ];

  const handlePayment = async (tier: 'silver' | 'gold' | 'platinum') => {
    if (isProcessing) return;
    
    console.log('handlePayment called with tier:', tier, 'protocolName:', protocolName);
    setIsProcessing(true);
    
    try {
      await PaymentService.redirectToCheckout(tier, protocolName);
    } catch (error) {
      console.error('Payment error:', error);
      // In production, show proper error handling
      alert('Payment processing failed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Separate handlers to avoid closure issues
  const handleSilverPayment = () => handlePayment('silver');
  const handleGoldPayment = () => handlePayment('gold');
  const handlePlatinumPayment = () => handlePayment('platinum');

  return (
    <div className="min-h-screen bg-void-black">
      <div className="container mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-heading font-black text-metallic-gold mb-6">
            SECURITY THAT PROTECTS
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Choose the security tier that matches your protocol's ambition. 
            From automated scans to institutional-grade protection with warranty coverage.
          </p>
          
          {/* Protocol Name Input */}
          <div className="mt-8 max-w-md mx-auto">
            <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-3">
              Protocol Name (Optional)
            </label>
            <input
              type="text"
              value={protocolName}
              onChange={(e) => setProtocolName(e.target.value)}
              placeholder="Enter your protocol name"
              className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green"
            />
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
            <div key={tier.id} className={`relative glass-panel cut-corners p-8 border-2 ${tier.color} hover:border-opacity-60`}>
                {/* Recommended Badge */}
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-cyber-green/20 border border-cyber-green px-4 py-1 cut-corners">
                      <span className="text-cyber-green font-mono text-sm font-bold">
                        MOST POPULAR
                      </span>
                    </div>
                  </div>
                )}

                {/* Tier Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 rounded-lg bg-black/40 border-2 ${tier.color.includes('border-cyber-green') ? 'border-cyber-green/30' : tier.color.includes('border-metallic-gold') ? 'border-metallic-gold/30' : 'border-gray-500/30'} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${tier.color.includes('border-cyber-green') ? 'text-cyber-green' : tier.color.includes('border-metallic-gold') ? 'text-metallic-gold' : 'text-gray-400'}`} />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-metallic-gold mb-2">
                    {tier.name}
                  </h3>
                  
                  <p className="text-cyber-green font-mono text-sm uppercase tracking-wider mb-3">
                    {tier.subtitle}
                  </p>
                  
                  <div className="text-4xl font-heading font-black text-white mb-2">
                    {tier.price}
                  </div>
                  
                  <div className="text-cyber-green font-mono text-sm mb-3">
                    {tier.delivery}
                  </div>
                  
                  <div className="text-gray-400 font-mono text-xs mb-4">
                    Expedite Available {tier.expedite}
                  </div>
                  
                  <p className="text-text-muted text-sm">
                    {tier.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider">
                    INCLUDES:
                  </h4>
                  
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 text-cyber-green mt-0.5 flex-shrink-0" />
                      <span className="text-text-main text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.limitations.length > 0 && (
                    <>
                      <div className="pt-4 border-t border-text-muted/20" />
                      <h4 className="text-gray-400 font-mono text-sm font-bold uppercase tracking-wider">
                        LIMITATIONS:
                      </h4>
                      {tier.limitations.map((limitation, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-4 h-4 rounded-full border border-gray-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-400 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <div className="space-y-2">
                  <button 
                    data-tier={tier.id}
                    onClick={(e) => {
                      const tierId = e.currentTarget.getAttribute('data-tier');
                      console.log('Button clicked - data-tier:', tierId, 'tier.id:', tier.id);
                      
                      if (tierId === 'gold') {
                        handlePayment('gold');
                      } else if (tierId === 'platinum') {
                        handlePayment('platinum');
                      } else {
                        handlePayment('silver');
                      }
                    }}
                    disabled={isProcessing}
                    className={`w-full py-4 px-6 cut-corners font-mono font-bold text-lg transition-all duration-300 ${tier.buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isProcessing ? 'PROCESSING...' : tier.recommended ? 'START PLATINUM AUDIT' : 'SELECT TIER'}
                  </button>
                  {tier.id === 'platinum' && tier.financingSection && (
                    <div className="mt-4 p-3 bg-cyber-green/10 border border-cyber-green/30 cut-corners">
                      <h4 className="text-cyber-green font-mono text-sm font-bold uppercase mb-1">
                        {tier.financingSection.title}
                      </h4>
                      <p className="text-text-main text-xs">
                        {tier.financingSection.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Financing Section */}
        <div className="max-w-6xl mx-auto">
          <div className="glass-panel cut-corners p-12 border border-metallic-gold/30 bg-gradient-to-br from-metallic-gold/5 to-cyber-green/5">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <CreditCard className="w-8 h-8 text-cyber-green" />
                <h2 className="text-4xl font-heading font-bold text-metallic-gold">
                  FINANCING AVAILABLE
                </h2>
              </div>
              
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Clients can access <strong>Financing Available</strong>. We accept top tokens as collateral to finance the entire audit and monitoring suite. <strong>Zero upfront ETH required.</strong>
              </p>
            </div>

            {/* Financing Calculator */}
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Left: Calculator */}
              <div className="space-y-8">
                <h3 className="text-2xl font-heading font-bold text-metallic-gold">
                  AUDIT FINANCING CALCULATOR
                </h3>
                
                <div className="space-y-6">
                  {/* Tier Selection */}
                  <div>
                    <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-3">
                      SELECT AUDIT TIER:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {tiers.map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setSelectedTier(tier.id)}
                          className={`p-3 cut-corners border font-mono text-sm transition-all duration-300 ${
                            selectedTier === tier.id
                              ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                              : 'bg-black/40 border-metallic-gold/30 text-metallic-gold hover:bg-metallic-gold/10'
                          }`}
                        >
                          {tier.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Financing Mode */}
                  <div>
                    <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-3">
                      FINANCING MODE:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFinancingMode('pay-now')}
                        className={`p-3 cut-corners border font-mono text-sm transition-all duration-300 ${
                          financingMode === 'pay-now'
                            ? 'bg-metallic-gold/20 border-metallic-gold text-metallic-gold'
                            : 'bg-black/40 border-gray-500/30 text-gray-400 hover:bg-gray-500/10'
                        }`}
                      >
                        PAY NOW
                      </button>
                      <button
                        onClick={() => setFinancingMode('finance')}
                        className={`p-3 cut-corners border font-mono text-sm transition-all duration-300 ${
                          financingMode === 'finance'
                            ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                            : 'bg-black/40 border-gray-500/30 text-gray-400 hover:bg-gray-500/10'
                        }`}
                      >
                        FINANCE (0% UPFRONT)
                      </button>
                    </div>
                  </div>

                  {/* Financing Amount */}
                  <div>
                    <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-3">
                      FINANCING AMOUNT:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={selectedTier === 'silver' ? '2800' : selectedTier === 'gold' ? '5200' : '7600'}
                        readOnly
                        className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-metallic-gold placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted font-mono">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="glass-panel cut-corners p-6 bg-black/40 border border-cyber-green/30">
                    <h4 className="text-cyber-green font-mono text-sm font-bold uppercase tracking-wider mb-4">
                      FINANCING TERMS:
                    </h4>
                    
                    {financingMode === 'pay-now' ? (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-muted">Upfront Payment:</span>
                          <span className="text-metallic-gold font-bold">{selectedTier === 'silver' ? '$3,500' : selectedTier === 'gold' ? '$6,500' : '$9,500'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Expedite (+20%):</span>
                          <span className="text-metallic-gold font-bold">{selectedTier === 'silver' ? '$700' : selectedTier === 'gold' ? '$1,300' : '$1,900'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Delivery:</span>
                          <span className="text-cyber-green">{selectedTier === 'silver' ? '5-7 days' : selectedTier === 'gold' ? '7-10 days' : '10 days'}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-text-muted">Upfront Cost:</span>
                          <span className="text-cyber-green font-bold">$0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Financing Amount:</span>
                          <span className="text-metallic-gold">{selectedTier === 'silver' ? '$2,800' : selectedTier === 'gold' ? '$5,200' : '$7,600'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">LTV Ratio:</span>
                          <span className="text-white">Up to 90%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Interest Rate:</span>
                          <span className="text-white">8.5% APR</span>
                        </div>
                        <div className="border-t border-cyber-green/20 pt-3 mt-3">
                          <div className="flex justify-between">
                            <span className="text-text-muted">Audit Status:</span>
                            <span className="text-cyber-green font-bold">✓ APPROVED</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Benefits */}
              <div className="space-y-8">
                <h3 className="text-2xl font-heading font-bold text-metallic-gold">
                  GOLDBACKBOND BENEFITS
                </h3>
                
                <div className="space-y-6">
                  {goldbackbondBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-cyber-green mt-0.5 flex-shrink-0" />
                      <span className="text-text-main">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Trust Badge */}
                <div className="glass-panel cut-corners p-6 bg-metallic-gold/10 border border-metallic-gold/30 text-center">
                  <div className="w-16 h-16 rounded-lg bg-metallic-gold/20 border-2 border-metallic-gold/30 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-metallic-gold" />
                  </div>
                  
                  <h4 className="text-xl font-heading font-bold text-metallic-gold mb-2">
                    TREASURY WARRANTY PROTOCOL
                  </h4>
                  
                  <p className="text-text-muted text-sm mb-4">
                    If the GBB Guardian fails to execute a pause command during a flagged exploit, we cover the damage.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-heading font-bold text-cyber-green">$50M</div>
                      <div className="text-text-muted font-mono text-xs">WARRANTY POOL</div>
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-metallic-gold">$500K</div>
                      <div className="text-text-muted font-mono text-xs">MAX COVERAGE</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 cut-corners">
                    <p className="text-red-400 font-mono text-xs">
                      * Coverage strictly limited to direct fund loss from Guardian Node failure. Does not cover private key compromise, phishing, or governance attacks.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <button className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg">
                    APPLY FOR COVERAGE
                  </button>
                  <p className="text-text-muted font-mono text-xs text-center">
                    *Only Available with Platinum Audit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 24/7 Guardian Monitoring */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="glass-panel cut-corners p-12 border border-cyber-green/30 bg-gradient-to-br from-cyber-green/5 to-metallic-gold/5">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Activity className="w-8 h-8 text-cyber-green" />
                <h2 className="text-4xl font-heading font-bold text-cyber-green">
                  24/7 GUARDIAN MONITORING
                </h2>
              </div>
              
              <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
                Enterprise-grade continuous monitoring with automatic threat response. 
                Our Guardian nodes watch your protocol 24/7 and can pause operations in under 2 seconds.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-cyber-green/20 border-2 border-cyber-green/30 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-cyber-green" />
                </div>
                <h3 className="text-xl font-heading font-bold text-cyber-green mb-2">AUTOMATIC PAUSE</h3>
                <p className="text-text-muted text-sm">Instant protocol halt on detected threats</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-metallic-gold/20 border-2 border-metallic-gold/30 flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-metallic-gold" />
                </div>
                <h3 className="text-xl font-heading font-bold text-metallic-gold mb-2">REAL-TIME ALERTS</h3>
                <p className="text-text-muted text-sm">Instant notifications to your security team</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-lg bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-2">DEDICATED NODES</h3>
                <p className="text-text-muted text-sm">Custom-built infrastructure for your protocol</p>
              </div>
            </div>

            <div className="text-center">
              <div className="glass-panel cut-corners p-6 bg-black/40 border border-cyber-green/30 inline-block mb-6">
                <div className="text-3xl font-heading font-bold text-cyber-green mb-2">
                  $497/month
                </div>
                <div className="text-text-muted font-mono text-sm">
                  Starting month 2, cancel anytime
                </div>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/guardian"
                  className="inline-block bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg"
                >
                  SEE WHAT YOU RECEIVE →
                </a>
                <p className="text-text-muted font-mono text-xs">
                  *Only Available with Platinum Audit
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-panel cut-corners p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-metallic-gold mb-4">
              READY TO SECURE YOUR PROTOCOL?
            </h3>
            <p className="text-text-muted mb-6">
              Trust Goldbackbond to protect your assets and users.
            </p>
            <button className="bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold px-8 py-4 text-metallic-gold hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg">
              REQUEST CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};