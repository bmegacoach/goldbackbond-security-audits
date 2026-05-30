import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();

  const tier = searchParams.get('tier') || 'unknown';
  const protocol = searchParams.get('protocol') || '';
  const intakeHref = `/intake?tier=${encodeURIComponent(tier)}&protocol=${encodeURIComponent(protocol)}`;

  const getTierInfo = (tierName: string) => {
    const tierMap = {
      silver: { name: 'STATIC SECURITY', price: '$3,500', color: 'text-gray-400' },
      gold: { name: 'DEEP DIVE', price: '$6,500', color: 'text-metallic-gold' },
      platinum: { name: 'INSTITUTIONAL', price: '$9,500', color: 'text-cyber-green' }
    };
    return tierMap[tierName as keyof typeof tierMap] || { name: 'Unknown', price: '$0', color: 'text-white' };
  };

  const tierInfo = getTierInfo(tier);

  return (
    <div className="min-h-screen bg-void-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative mb-8">
            <div className="absolute -inset-8 bg-cyber-green/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-24 h-24 rounded-lg bg-cyber-green/20 border-2 border-cyber-green/30 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-cyber-green" />
            </div>
          </div>
          
          <h1 className="text-5xl font-heading font-black text-cyber-green mb-4 tracking-wider">
            PAYMENT CONFIRMED
          </h1>
          
          <p className="text-xl text-text-muted">
            Your security audit payment has been processed successfully
          </p>
        </div>

        {/* Payment Details */}
        <div className="glass-panel cut-corners p-8 border border-cyber-green/30 bg-gradient-to-br from-cyber-green/5 to-metallic-gold/5 mb-8">
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
                AUDIT TIER
              </h3>
              <div className={`text-3xl font-heading font-black ${tierInfo.color} mb-2`}>
                {tierInfo.name}
              </div>
              <div className="text-text-muted font-mono text-lg">
                {tierInfo.price}
              </div>
            </div>
            
            <div>
              <h3 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
                PROTOCOL NAME
              </h3>
              <div className="text-white font-mono text-lg">
                {protocol || 'Not specified'}
              </div>
            </div>
          </div>

          <div className="border-t border-cyber-green/20 pt-6">
            <h3 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
              ONE MORE STEP — TELL US ABOUT YOUR PROTOCOL
            </h3>
            <p className="text-text-muted text-sm mb-4">
              The faster you submit your contract addresses, GitHub URL, and contact preference,
              the faster we kick off your audit. Takes about 2 minutes.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyber-green rounded-full mt-2" />
                <div>
                  <div className="text-white font-mono font-bold">After you submit intake</div>
                  <div className="text-text-muted text-sm">Our team reaches out within 24 hours via your preferred channel.</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-metallic-gold rounded-full mt-2" />
                <div>
                  <div className="text-white font-mono font-bold">Day 1-3</div>
                  <div className="text-text-muted text-sm">Static analysis begins (Slither + Mythril + Aderyn + manual review).</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-white rounded-full mt-2" />
                <div>
                  <div className="text-white font-mono font-bold">Per-tier SLA</div>
                  <div className="text-text-muted text-sm">Comprehensive report delivered. Guardian Node deployed if Platinum.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to={intakeHref}
            className="w-full bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg text-center block"
          >
            SUBMIT AUDIT INTAKE
            <ArrowRight className="w-5 h-5 inline ml-2" />
          </Link>

          <Link
            to="/"
            className="w-full bg-metallic-gold/10 hover:bg-metallic-gold/20 border border-metallic-gold/30 px-8 py-3 text-metallic-gold transition-all duration-300 cut-corners font-mono text-sm text-center block"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            BACK TO HOME
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 p-6 bg-black/40 border border-metallic-gold/20 cut-corners">
          <h4 className="text-metallic-gold font-mono font-bold mb-2">NEED IMMEDIATE ASSISTANCE?</h4>
          <p className="text-text-muted text-sm mb-4">
            Our security team is standing by to help with your audit
          </p>
          <div className="space-y-2">
            <a href="https://t.me/goldbackbond_official" target="_blank" rel="noopener noreferrer" className="text-cyber-green font-mono text-sm hover:text-white transition-colors">
              Telegram: @goldbackbond_official
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
