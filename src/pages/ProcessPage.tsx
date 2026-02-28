import { useState } from 'react';
import { Search, TestTube, Shield, Activity, CheckCircle, ArrowRight, Play, Pause, AlertTriangle } from 'lucide-react';

export const ProcessPage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      id: 0,
      title: 'Static Analysis',
      subtitle: 'Deep Code Review',
      icon: Search,
      duration: '2-3 Days',
      description: 'Comprehensive automated and manual analysis of smart contract code',
      details: [
        'Automated vulnerability scanning with Slither, Mythril, and Aderyn',
        'Manual line-by-line code review by senior security engineers',
        'Gas optimization analysis and best practices verification',
        'Business logic vulnerability assessment',
        'Dependency and import analysis',
        'Access control and privilege escalation testing'
      ],
      tools: ['Slither', 'Mythril', 'Aderyn', 'Manual Review'],
      deliverables: ['Vulnerability Report', 'Code Quality Assessment', 'Optimization Suggestions'],
      color: 'border-blue-400/30 bg-blue-400/5'
    },
    {
      id: 1,
      title: 'Fuzz Testing',
      subtitle: 'Adversarial Simulation',
      icon: TestTube,
      duration: '3-4 Days',
      description: 'Advanced fuzzing and simulation of extreme market conditions',
      details: [
        'Automated fuzz testing using Foundry framework',
        'Flash loan attack simulation and prevention',
        'Price manipulation and oracle attack testing',
        'Reentrancy and MEV vulnerability verification',
        'Liquidation cascade scenario testing',
        'Cross-chain bridge security assessment'
      ],
      tools: ['Foundry', 'Custom Harnesses', 'AI Testing', 'Echidna'],
      deliverables: ['Fuzz Test Results', 'Attack Simulation Report', 'Mitigation Strategies'],
      color: 'border-purple-400/30 bg-purple-400/5'
    },
    {
      id: 2,
      title: 'Deployment',
      subtitle: 'Guardian Integration',
      icon: Shield,
      duration: '2-3 Days',
      description: 'Secure deployment with integrated monitoring and protection systems',
      details: [
        'Guardian node deployment and configuration',
        'Real-time monitoring system activation',
        'Emergency pause mechanism setup',
        'Warranty policy activation and verification',
        'Integration testing with production environment',
        'Performance baseline establishment'
      ],
      tools: ['Guardian Nodes', 'Monitoring Systems', 'Warranty API'],
      deliverables: ['Guardian Setup', 'Monitoring Dashboard', 'Warranty Certificate'],
      color: 'border-metallic-gold/30 bg-metallic-gold/5'
    },
    {
      id: 3,
      title: 'Active Monitoring',
      subtitle: '24/7 Protection',
      icon: Activity,
      duration: 'Ongoing',
      description: 'Continuous monitoring, threat detection, and automatic response',
      details: [
        'Real-time transaction monitoring and analysis',
        'Automated threat detection and classification',
        'Instant emergency pause mechanism activation',
        'Anomaly detection using machine learning',
        'Daily security reports and notifications',
        'Quarterly security assessments and updates'
      ],
      tools: ['ML Detection', 'Auto-Pause', 'Threat Intelligence', 'Analytics'],
      deliverables: ['Live Dashboard', 'Daily Reports', 'Threat Alerts', 'Quarterly Reviews'],
      color: 'border-cyber-green/30 bg-cyber-green/5'
    }
  ];

  const techStack = [
    { name: 'Slither', category: 'Static Analysis', description: 'Solidity static analyzer' },
    { name: 'Mythril', category: 'Symbolic Execution', description: 'Smart contract security analysis' },
    { name: 'Aderyn', category: 'AST Analysis', description: 'Advanced vulnerability detection' },
    { name: 'Foundry', category: 'Testing Framework', description: 'Ethereum development toolkit' },
    { name: 'Echidna', category: 'Fuzz Testing', description: 'Ethereum smart contract fuzzer' },
    { name: 'Guardian Nodes', category: 'Monitoring', description: 'Real-time threat detection' },
    { name: 'ML Detection', category: 'AI/ML', description: 'Machine learning threat classification' },
    { name: 'Auto-Pause', category: 'Response', description: 'Automatic emergency response' }
  ];

  const timeline = [
    { phase: 'Days 1-3', activities: ['Static Analysis', 'Initial Review'], status: 'complete' },
    { phase: 'Days 4-7', activities: ['Fuzz Testing', 'Simulation'], status: 'complete' },
    { phase: 'Days 8-10', activities: ['Guardian Setup', 'Integration'], status: 'active' },
    { phase: 'Ongoing', activities: ['Active Monitoring', 'Threat Response'], status: 'pending' }
  ];

  return (
    <div className="min-h-screen bg-void-black">
      <div className="container mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-heading font-black text-metallic-gold mb-6">
            ACTIVE DEFENSE METHODOLOGY
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Our comprehensive security process goes beyond traditional audits. 
            From deep static analysis to 24/7 active monitoring and protection.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold text-center mb-12">
            SECURITY PROCESS TIMELINE
          </h2>
          
          <div className="grid lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <div
                key={index}
                className={`glass-panel cut-corners p-6 border transition-all duration-300 ${
                  phase.status === 'complete' 
                    ? 'border-cyber-green/30 bg-cyber-green/5' 
                    : phase.status === 'active'
                    ? 'border-metallic-gold/30 bg-metallic-gold/5'
                    : 'border-gray-500/30 bg-gray-500/5'
                }`}
              >
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center mx-auto mb-4 ${
                    phase.status === 'complete'
                      ? 'border-cyber-green/30 bg-cyber-green/20'
                      : phase.status === 'active'
                      ? 'border-metallic-gold/30 bg-metallic-gold/20'
                      : 'border-gray-500/30 bg-gray-500/20'
                  }`}>
                    {phase.status === 'complete' ? (
                      <CheckCircle className="w-6 h-6 text-cyber-green" />
                    ) : phase.status === 'active' ? (
                      <Play className="w-6 h-6 text-metallic-gold" />
                    ) : (
                      <Pause className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <h3 className={`text-xl font-heading font-bold mb-3 ${
                    phase.status === 'complete'
                      ? 'text-cyber-green'
                      : phase.status === 'active'
                      ? 'text-metallic-gold'
                      : 'text-gray-400'
                  }`}>
                    {phase.phase}
                  </h3>
                  
                  <div className="space-y-2">
                    {phase.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="text-text-muted font-mono text-sm">
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Process Steps */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold text-center mb-12">
            DETAILED METHODOLOGY
          </h2>
          
          {/* Step Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center space-x-3 px-6 py-3 cut-corners border font-mono transition-all duration-300 ${
                    activeStep === index
                      ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                      : 'bg-black/40 border-metallic-gold/30 text-metallic-gold hover:bg-metallic-gold/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Detail */}
          <div className="glass-panel cut-corners p-12 border border-cyber-green/30 bg-cyber-green/5">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return activeStep === index ? (
                <div key={index} className="grid lg:grid-cols-2 gap-12">
                  
                  {/* Left: Step Info */}
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 rounded-lg bg-black/40 border-2 border-cyber-green/30 flex items-center justify-center">
                          <Icon className="w-8 h-8 text-cyber-green" />
                        </div>
                        <div>
                          <h3 className="text-3xl font-heading font-bold text-cyber-green mb-2">
                            {step.title}
                          </h3>
                          <p className="text-metallic-gold font-mono text-sm uppercase tracking-wider">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-heading font-bold text-white">{step.duration}</div>
                          <div className="text-text-muted font-mono text-xs">DURATION</div>
                        </div>
                      </div>
                      
                      <p className="text-text-main text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Tools Used */}
                    <div>
                      <h4 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
                        TOOLS & TECHNOLOGIES:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.tools.map((tool, toolIndex) => (
                          <span
                            key={toolIndex}
                            className="px-3 py-1 bg-black/40 border border-cyber-green/30 text-cyber-green font-mono text-xs cut-corners"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Detailed Activities */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-6">
                        DETAILED ACTIVITIES:
                      </h4>
                      <div className="space-y-4">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-cyber-green rounded-full mt-2 flex-shrink-0" />
                            <span className="text-text-main">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div>
                      <h4 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
                        DELIVERABLES:
                      </h4>
                      <div className="space-y-3">
                        {step.deliverables.map((deliverable, delIndex) => (
                          <div key={delIndex} className="flex items-center space-x-3">
                            <CheckCircle className="w-4 h-4 text-cyber-green" />
                            <span className="text-text-main">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold text-center mb-12">
            TECHNOLOGY STACK
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {['Analysis Tools', 'Testing & Simulation', 'Monitoring & Response', 'AI & Machine Learning'].map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-4">
                <h3 className="text-xl font-heading font-bold text-metallic-gold mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {techStack
                    .filter(tool => 
                      (categoryIndex === 0 && ['Slither', 'Mythril', 'Aderyn'].includes(tool.name)) ||
                      (categoryIndex === 1 && ['Foundry', 'Echidna'].includes(tool.name)) ||
                      (categoryIndex === 2 && ['Guardian Nodes', 'Auto-Pause'].includes(tool.name)) ||
                      (categoryIndex === 3 && ['ML Detection'].includes(tool.name))
                    )
                    .map((tool, toolIndex) => (
                      <div
                        key={toolIndex}
                        className="glass-panel cut-corners p-4 border border-metallic-gold/20 hover:border-cyber-green/40 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-metallic-gold font-mono font-bold">{tool.name}</h4>
                            <p className="text-text-muted text-sm">{tool.description}</p>
                          </div>
                          <span className="text-cyber-green font-mono text-xs bg-cyber-green/20 px-2 py-1 cut-corners">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Active Defense */}
        <div className="text-center">
          <div className="glass-panel cut-corners p-12 max-w-4xl mx-auto border border-metallic-gold/30 bg-gradient-to-br from-metallic-gold/5 to-cyber-green/5">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-cyber-green" />
              <h3 className="text-3xl font-heading font-bold text-metallic-gold">
                WHY ACTIVE DEFENSE WINS
              </h3>
            </div>
            
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Traditional audits are snapshots. Active defense is continuous protection. 
              Your protocol evolves, so should your security.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-red-400 mb-2">60%</div>
                <div className="text-text-muted font-mono text-sm">OF VULNERABILITIES FOUND POST-DEPLOYMENT</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-cyber-green mb-2">&lt;2s</div>
                <div className="text-text-muted font-mono text-sm">AVERAGE THREAT RESPONSE TIME</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-metallic-gold mb-2">99.7%</div>
                <div className="text-text-muted font-mono text-sm">SUCCESS RATE IN THREAT PREVENTION</div>
              </div>
            </div>
            
            <button className="bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg">
              START YOUR ACTIVE DEFENSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};