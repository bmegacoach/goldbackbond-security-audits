import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

export const WarRoomHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Guardian', path: '/guardian' },
    { name: 'Verification', path: '/verification' },
    { name: 'Process', path: '/process' }
  ];

  // Listen for custom event to open contact modal
  useEffect(() => {
    const handleOpenContactModal = () => {
      setShowContactModal(true);
    };

    window.addEventListener('openContactModal', handleOpenContactModal);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenContactModal);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-void-black/95 backdrop-blur-sm border-b border-metallic-gold/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
              <Shield className="w-8 h-8 text-metallic-gold" />
              <div>
                <h1 className="text-xl font-heading font-bold text-metallic-gold">
                  GOLDBACKBOND
                </h1>
                <p className="text-xs text-text-muted font-mono uppercase">
                  SECURITY AUDITS
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-text-muted hover:text-metallic-gold transition-colors duration-300 font-mono text-sm uppercase tracking-wider"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setShowContactModal(true)}
                className="bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold/30 px-6 py-2 text-metallic-gold hover:text-void-black transition-all duration-300 cut-corners font-mono font-bold"
              >
                REQUEST INTEL
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-metallic-gold hover:text-cyber-green transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-metallic-gold/20">
              <nav className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-text-muted hover:text-metallic-gold transition-colors duration-300 font-mono text-sm uppercase tracking-wider"
                  >
                    {item.name}
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    setShowContactModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold/30 px-6 py-2 text-metallic-gold hover:text-void-black transition-all duration-300 cut-corners font-mono font-bold text-left"
                >
                  REQUEST INTEL
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="glass-panel cut-corners p-8 max-w-2xl w-full border border-metallic-gold/30 bg-void-black">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-heading font-bold text-metallic-gold">
                REQUEST SECURITY INTEL
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-text-muted hover:text-white transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green"
                    placeholder="Protocol Name"
                  />
                </div>
                <div>
                  <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                    Telegram Username
                  </label>
                  <input
                    type="text"
                    className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green"
                    placeholder="@yourusername"
                  />
                </div>
              </div>

              <div>
                <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                  Protocol Type
                </label>
                <select className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white cut-corners focus:outline-none focus:border-cyber-green">
                  <option value="">Select Protocol Type</option>
                  <option value="defi">DeFi Protocol</option>
                  <option value="dex">Decentralized Exchange</option>
                  <option value="lending">Lending/Borrowing</option>
                  <option value="yield">Yield Farming</option>
                  <option value="bridge">Cross-Chain Bridge</option>
                  <option value="stablecoin">Stablecoin</option>
                  <option value="nft">NFT Platform</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                  TVL (Total Value Locked)
                </label>
                <select className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white cut-corners focus:outline-none focus:border-cyber-green">
                  <option value="">Select TVL Range</option>
                  <option value="0-1m">$0 - $1M</option>
                  <option value="1m-10m">$1M - $10M</option>
                  <option value="10m-100m">$10M - $100M</option>
                  <option value="100m-1b">$100M - $1B</option>
                  <option value="1b+">$1B+</option>
                </select>
              </div>

              <div>
                <label className="block text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                  Security Requirements
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green"
                  placeholder="Describe your security needs, timeline, and any specific concerns..."
                ></textarea>
              </div>

              {/* Telegram Contact Option */}
              <div className="border-t border-metallic-gold/20 pt-6">
                <h4 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-3">
                  PREFER DIRECT CONTACT?
                </h4>
                <a
                  href="https://t.me/goldbackbond_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-4 py-3 text-cyber-green hover:text-void-black transition-all duration-300 cut-corners font-mono text-sm"
                >
                  <span>📱</span>
                  <span>CONTACT VIA TELEGRAM</span>
                </a>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-6 py-3 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold"
                >
                  SUBMIT REQUEST
                </button>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold/30 px-6 py-3 text-metallic-gold hover:text-void-black transition-all duration-300 cut-corners font-mono font-bold"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};