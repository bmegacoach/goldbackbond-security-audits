import { Link } from 'react-router-dom';
import { Star, Shield, Award, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { useStatistics } from '../../context/StatisticsContext';

export const TrustSection = () => {
  const { stats, isLoading } = useStatistics();
  const testimonialsData = [
    {
      name: "Sarah Chen",
      role: "CTO, DeFiYield Protocol",
      rating: 5,
      text: "Goldbackbond's continuous monitoring caught three attack attempts in our first month. Their Guardian system alone saved us millions. Worth every penny of the premium.",
      protocol: "DeFiYield Protocol",
      assets: "$47M TVL"
    },
    {
      name: "Marcus Rodriguez",
      role: "Founder, StableSwap Finance",
      rating: 5,
      text: "Traditional audits left us vulnerable. Goldbackbond's multi-layer approach found 23 critical issues that others missed. Their warranty protection gives us real peace of mind.",
      protocol: "StableSwap Finance",
      assets: "$120M TVL"
    },
    {
      name: "Alex Thompson",
      role: "Security Lead, YieldFarm Plus",
      rating: 5,
      text: "The 24/7 monitoring is game-changing. When someone tried to exploit our lending pool, Goldbackbond's bot paused the protocol in under 2 seconds. Zero losses.",
      protocol: "YieldFarm Plus",
      assets: "$89M TVL"
    }
  ];

  const certifications = [
    {
      icon: Shield,
      title: "ISO 27001 Certified",
      description: "Information Security Management",
      status: "Certified"
    },
    {
      icon: Award,
      title: "SOC 2 Type II",
      description: "Security & Availability Controls",
      status: "Compliant"
    },
    {
      icon: CheckCircle,
      title: "Penetration Testing",
      description: "Annual third-party security audits",
      status: "Passed"
    }
  ];

  const keyStats = [
    { label: "Success Rate", value: "99.7%", subtext: "Attack Prevention" },
    { label: "Response Time", value: "<2s", subtext: "Average Detection" },
    { label: "Client Retention", value: "98.2%", subtext: "Enterprise Clients" },
    { label: "Claims Paid", value: "$0", subtext: "Warranty Claims" }
  ];

  return (
    <section className="py-20 bg-panel-black/30">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading font-bold text-metallic-gold mb-6">
            TRUSTED BY INSTITUTIONAL PROTOCOLS
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Over ${isLoading ? '...' : (stats?.assets_protected_millions || 78).toFixed(0)} in DeFi assets protected. Zero breaches. {isLoading ? '...' : stats?.total_protocols || '37'} successful audits. 
            These numbers speak for themselves.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {keyStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="glass-panel cut-corners p-6 border border-metallic-gold/20 hover:border-cyber-green/40 transition-all duration-300">
                <div className="text-4xl font-heading font-black text-metallic-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-cyber-green font-mono text-sm font-bold uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-text-muted font-mono text-xs">
                  {stat.subtext}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h3 className="text-3xl font-heading font-bold text-metallic-gold text-center mb-12">
            CLIENT SUCCESS STORIES
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="glass-panel cut-corners p-8 border border-metallic-gold/20 hover:border-cyber-green/40 transition-all duration-300 group"
              >
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-metallic-gold fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-text-main mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="border-t border-metallic-gold/20 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-metallic-gold font-heading font-bold">
                        {testimonial.name}
                      </div>
                      <div className="text-text-muted font-mono text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyber-green font-mono text-sm font-bold">
                        {testimonial.assets}
                      </div>
                      <div className="text-text-muted font-mono text-xs">
                        {testimonial.protocol}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 text-cyber-green font-mono text-xs">
                    <CheckCircle className="w-3 h-3" />
                    <span>VERIFIED CLIENT TESTIMONIAL</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-heading font-bold text-metallic-gold text-center mb-12">
            SECURITY CERTIFICATIONS
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div
                  key={index}
                  className="glass-panel cut-corners p-8 border border-metallic-gold/20 text-center group hover:border-cyber-green/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-lg bg-metallic-gold/20 border-2 border-metallic-gold/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-metallic-gold" />
                  </div>
                  
                  <h4 className="text-xl font-heading font-bold text-metallic-gold mb-2">
                    {cert.title}
                  </h4>
                  
                  <p className="text-text-muted font-mono text-sm mb-3">
                    {cert.description}
                  </p>
                  
                  <div className="inline-flex items-center space-x-2 bg-cyber-green/20 border border-cyber-green px-3 py-1 cut-corners">
                    <CheckCircle className="w-3 h-3 text-cyber-green" />
                    <span className="text-cyber-green font-mono text-xs font-bold">
                      {cert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Warranty Coverage */}
        <div className="text-center">
          <div className="glass-panel cut-corners p-12 max-w-4xl mx-auto border border-metallic-gold/30 bg-gradient-to-br from-metallic-gold/5 to-cyber-green/5">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-cyber-green" />
              <h3 className="text-3xl font-heading font-bold text-metallic-gold">
                TREASURY WARRANTY POOL
              </h3>
            </div>
            
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Backed by our Treasury Warranty Protocol, we provide coverage for protocols 
              that meet our security standards, with clear liability limitations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-cyber-green mb-2">
                  $50M
                </div>
                <div className="text-text-muted font-mono text-sm">
                  WARRANTY POOL
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-metallic-gold mb-2">
                  $500K
                </div>
                <div className="text-text-muted font-mono text-sm">
                  MAX COVERAGE
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-white mb-2">
                  24/7
                </div>
                <div className="text-text-muted font-mono text-sm">
                  CLAIMS PROCESSING
                </div>
              </div>
            </div>
            
            <Link 
              to="/pricing"
              className="inline-block bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg"
            >
              LEARN ABOUT COVERAGE
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};