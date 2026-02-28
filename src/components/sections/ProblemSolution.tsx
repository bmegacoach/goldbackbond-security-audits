import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, Shield, Target } from 'lucide-react';

export const ProblemSolution = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Surface-Level Audits",
      description: "Traditional audits miss 60% of vulnerabilities due to shallow analysis and outdated tools.",
      impact: "Critical vulnerabilities left undetected"
    },
    {
      icon: AlertTriangle,
      title: "Static Analysis Only",
      description: "Most firms rely solely on automated tools without manual code review or fuzz testing.",
      impact: "Logic flaws and business logic vulnerabilities ignored"
    },
    {
      icon: AlertTriangle,
      title: "No Post-Deployment Protection",
      description: "Once the audit is done, protocols are left vulnerable to new attack vectors.",
      impact: "Zero protection against evolving threats"
    }
  ];

  const solutions = [
    {
      icon: Shield,
      title: "Multi-Layer Analysis",
      description: "We combine automated tools with manual review, static analysis, fuzz testing, and formal verification.",
      benefit: "Comprehensive vulnerability detection"
    },
    {
      icon: Target,
      title: "24/7 Active Monitoring",
      description: "Our Guardian network monitors your protocol in real-time and blocks attacks automatically.",
      benefit: "Instant threat response and mitigation"
    },
    {
      icon: CheckCircle,
      title: "Financial Guarantee",
      description: "Up to $500,000 coverage backed by our Treasury Warranty Protocol for additional peace of mind.",
      benefit: "Financial protection for protocol operators"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-void-black to-panel-black/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-heading font-bold text-metallic-gold mb-6">
            THE PROBLEM WITH TRADITIONAL AUDITS
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            While other firms provide basic compliance checks, sophisticated attacks require sophisticated solutions. 
            We identify and prevent threats that others miss.
          </p>
        </div>

        {/* Problem Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-red-400 mb-4">
              CURRENT SECURITY GAPS
            </h3>
            <div className="w-24 h-1 bg-red-400 mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <div
                  key={index}
                  className="glass-panel cut-corners p-8 border border-red-400/30 bg-red-400/5 hover:bg-red-400/10 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-red-400/20 border-2 border-red-400/30 flex items-center justify-center">
                      <Icon className="w-8 h-8 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-bold text-red-400 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-red-300 font-mono text-sm uppercase tracking-wider">
                        COMMON FAILURE
                      </p>
                    </div>
                  </div>

                  <p className="text-text-main mb-4 leading-relaxed">
                    {problem.description}
                  </p>

                  <div className="border-t border-red-400/20 pt-4">
                    <div className="text-red-400 font-mono text-sm font-bold uppercase tracking-wider">
                      IMPACT:
                    </div>
                    <div className="text-red-300 text-sm mt-1">
                      {problem.impact}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center my-16">
          <div className="flex items-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent w-32" />
            <div className="text-cyber-green font-mono text-sm font-bold uppercase tracking-wider">
              OUR SOLUTION
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent w-32" />
          </div>
        </div>

        {/* Solution Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-cyber-green mb-4">
              GOLDBACKBOND DIFFERENCE
            </h3>
            <div className="w-24 h-1 bg-cyber-green mx-auto" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div
                  key={index}
                  className="glass-panel cut-corners p-8 border border-cyber-green/30 bg-cyber-green/5 hover:bg-cyber-green/10 transition-all duration-300 group"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-lg bg-cyber-green/20 border-2 border-cyber-green/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-cyber-green" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-heading font-bold text-cyber-green mb-2">
                        {solution.title}
                      </h4>
                      <p className="text-cyber-green font-mono text-sm uppercase tracking-wider">
                        PREMIUM FEATURE
                      </p>
                    </div>
                  </div>

                  <p className="text-text-main mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  <div className="border-t border-cyber-green/20 pt-4">
                    <div className="text-cyber-green font-mono text-sm font-bold uppercase tracking-wider">
                      BENEFIT:
                    </div>
                    <div className="text-cyber-green/80 text-sm mt-1">
                      {solution.benefit}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="h-px bg-gradient-to-r from-transparent via-cyber-green/50 to-transparent" />
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-cyber-green font-mono text-xs">PREMIUM SECURITY</span>
                      <span className="text-cyber-green font-mono text-xs">✓ ACTIVE</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-panel cut-corners p-8 max-w-4xl mx-auto border border-metallic-gold/30 bg-metallic-gold/5">
            <h3 className="text-3xl font-heading font-bold text-metallic-gold mb-6">
              READY TO SECURE YOUR PROTOCOL?
            </h3>
            <p className="text-xl text-text-muted mb-8">
              Get comprehensive security analysis that goes beyond compliance.
              Trust Goldbackbond to protect your assets and users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/verification"
                className="inline-block bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg"
              >
                START PREMIUM AUDIT
              </Link>
              <button 
                onClick={() => {
                  // Trigger contact modal by dispatching a custom event
                  window.dispatchEvent(new CustomEvent('openContactModal'));
                }}
                className="inline-block glass-panel cut-corners px-8 py-4 border border-metallic-gold/30 text-metallic-gold hover:bg-metallic-gold/10 transition-all duration-300 font-mono font-bold text-lg"
              >
                REQUEST CONSULTATION
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};