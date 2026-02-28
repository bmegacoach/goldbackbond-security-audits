import { Link } from 'react-router-dom';
import { Search, TestTube, Shield, Award } from 'lucide-react';

export const FeatureGrid = () => {
  const features = [
    {
      icon: Search,
      title: "Deep Static Analysis",
      subtitle: "Beyond Surface-Level Review",
      description: "We run Slither, Mythril, and Aderyn. Then we start the real work. Our proprietary tools analyze 47 different vulnerability patterns.",
      tech: ["Slither", "Mythril", "Aderyn", "Custom Tools"],
      gradient: "from-cyber-green/20 to-cyber-green/5",
      borderColor: "border-cyber-green/30",
    },
    {
      icon: TestTube,
      title: "Advanced Fuzz Testing",
      subtitle: "Simulate 10 Years of Traffic",
      description: "Using Foundry and custom harnesses, we simulate extreme market conditions and adversarial attacks in minutes.",
      tech: ["Foundry", "Custom Harnesses", "AI Testing"],
      gradient: "from-metallic-gold/20 to-metallic-gold/5",
      borderColor: "border-metallic-gold/30",
    },
    {
      icon: Shield,
      title: "Active Guardian",
      subtitle: "24/7 On-Chain Protection",
      description: "If a hack is attempted, our on-chain bot pauses your contract in under 2 seconds. Zero human intervention required.",
      tech: ["Guardian Nodes", "Auto-Pause", "Emergency Response"],
      gradient: "from-cyber-green/20 to-cyber-green/5",
      borderColor: "border-cyber-green/30",
    },
    {
      icon: Award,
      title: "Financial Guarantee",
      subtitle: "Backed by Treasury Warranty",
      description: "Up to $500,000 coverage backed by the GBB Treasury Warranty Protocol. We put our money where our mouth is.",
      tech: ["$500K Coverage", "Treasury Backed", "Instant Payout"],
      gradient: "from-metallic-gold/20 to-metallic-gold/5",
      borderColor: "border-metallic-gold/30",
    },
  ];

  return (
    <section className="py-20 bg-panel-black/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-heading font-bold text-metallic-gold mb-6">
            WHY WE ARE PREMIUM
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            We don't just find problems. We prevent them. Our multi-layered approach ensures your protocol stays secure long after deployment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`glass-panel cut-corners p-8 group hover:border-opacity-80 transition-all duration-500 ${feature.borderColor} bg-gradient-to-br ${feature.gradient}`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-lg bg-black/40 border-2 ${feature.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-metallic-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-heading font-bold text-metallic-gold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-cyber-green font-mono text-sm uppercase tracking-wider">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-text-main mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3">
                  <div className="text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                    TECHNOLOGIES:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feature.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-black/40 border border-metallic-gold/30 text-metallic-gold font-mono text-xs cut-corners"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="h-px bg-gradient-to-r from-transparent via-metallic-gold/50 to-transparent" />
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-metallic-gold font-mono text-sm">PREMIUM FEATURE</span>
                    <span className="text-cyber-green font-mono text-sm">✓ ACTIVE</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-panel cut-corners p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-metallic-gold mb-4">
              READY FOR PLATINUM SECURITY?
            </h3>
            <p className="text-text-muted mb-6">
              Get the only audit that continues protecting your protocol long after deployment.
            </p>
            <Link 
              to="/pricing"
              className="inline-block bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-3 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold"
            >
              UPGRADE TO PLATINUM
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};