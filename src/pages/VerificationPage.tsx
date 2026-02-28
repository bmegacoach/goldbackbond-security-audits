import { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Lock, Search, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

export const VerificationPage = () => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, SUCCESS, ERROR
  const [logs, setLogs] = useState<string[]>([]);
  const [contractData, setContractData] = useState<any>(null);

  const sampleContracts = [
    {
      address: '0xCAMP',
      name: 'CAMP Protocol',
      status: 'SECURE',
      protocol: 'CAMP',
      tvl: '$47M',
      tier: 'PLATINUM',
      guardian: 'ONLINE 🟢',
      warranty: 'ACTIVE',
      hash: '0x7d...a1b2'
    },
    {
      address: '0x7d...a1b2',
      name: 'CAMP Protocol (Hash)',
      status: 'SECURE',
      protocol: 'CAMP',
      tvl: '$47M',
      tier: 'PLATINUM',
      guardian: 'ONLINE 🟢',
      warranty: 'ACTIVE',
      hash: '0x7d...a1b2'
    }
  ];

  const MOCK_DB = {
    "CAMP": {
      status: "SECURE",
      tier: "PLATINUM",
      guardian: "ONLINE 🟢",
      warranty: "ACTIVE",
      hash: "0x7d...a1b2" 
    },
    "0xCAMP": {
      status: "SECURE",
      tier: "PLATINUM", 
      guardian: "ONLINE 🟢",
      warranty: "ACTIVE",
      hash: "0x7d...a1b2"
    }
  };

  const simulateScan = () => {
    if (!input || input.length < 6) return;
    setStatus('SCANNING');
    setLogs([]);
    setContractData(null);
    
    const contractAddress = input.substring(0, 10);
    const scanSteps = [
      { text: `> ESTABLISHING SECURE HANDSHAKE...`, delay: 400 },
      { text: `> CONNECTING TO GBB SENTINEL NODE [v2.4.0]...`, delay: 1100 },
      { text: `> FETCHING CONTRACT BYTECODE: ${contractAddress}...`, delay: 1800 },
      { text: `> VERIFYING HASH INTEGRITY...`, delay: 2400 },
      { text: `> CHECKING GUARDIAN UPTIME... 100%`, delay: 3000 },
      { text: `> SECURITY POLICY: PLATINUM INSURED`, delay: 3600 },
      { text: `> ANALYZING CONTRACT BEHAVIOR...`, delay: 4200 },
      { text: `> SCANNING FOR VULNERABILITIES...`, delay: 4800 },
      { text: `> THREAT ASSESSMENT: CLEAR`, delay: 5400 },
    ];

    scanSteps.forEach(({ text, delay }) => {
      setTimeout(() => {
        setLogs(prev => [...prev, text]);
      }, delay);
    });

    // Simulate finding a matching contract
    setTimeout(() => {
      // Check MOCK_DB first
      const mockData = MOCK_DB[input.toUpperCase()] || MOCK_DB[input];
      
      if (mockData) {
        setContractData({
          name: 'CAMP Protocol',
          protocol: 'CAMP',
          tvl: '$47M',
          tier: mockData.tier,
          guardian: mockData.guardian,
          warranty: mockData.warranty,
          hash: mockData.hash,
          status: mockData.status
        });
        setLogs(prev => [...prev, `> CONTRACT MATCH FOUND: CAMP Protocol`]);
        setLogs(prev => [...prev, `> PROTOCOL: CAMP`]);
        setLogs(prev => [...prev, `> TVL: $47M`]);
        setLogs(prev => [...prev, `> TIER: ${mockData.tier}`]);
        setLogs(prev => [...prev, `> GUARDIAN: ${mockData.guardian}`]);
        setLogs(prev => [...prev, `> WARRANTY: ${mockData.warranty}`]);
        setStatus('SUCCESS');
      } else {
        setLogs(prev => [...prev, `> CONTRACT NOT FOUND IN GBB DATABASE`]);
        setLogs(prev => [...prev, `> PERFORMING EXTERNAL VERIFICATION...`]);
        setTimeout(() => {
          setLogs(prev => [...prev, `> EXTERNAL VERIFICATION: SAFE`]);
          setStatus('SUCCESS');
        }, 1000);
      }
    }, 6000);
  };

  const loadSampleContract = (contract: any) => {
    setInput(contract.address);
    setStatus('IDLE');
    setLogs([]);
    setContractData(null);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'SUCCESS':
        return <CheckCircle className="w-6 h-6 text-cyber-green" />;
      case 'ERROR':
        return <XCircle className="w-6 h-6 text-red-400" />;
      case 'SCANNING':
        return <Activity className="w-6 h-6 text-metallic-gold animate-pulse" />;
      default:
        return <Lock className="w-6 h-6 text-text-muted" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'SUCCESS':
        return 'text-cyber-green';
      case 'ERROR':
        return 'text-red-400';
      case 'SCANNING':
        return 'text-metallic-gold';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div className="min-h-screen bg-void-black">
      <div className="container mx-auto px-6 py-16">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <ShieldCheck className="w-12 h-12 text-cyber-green" />
            <h1 className="text-6xl font-heading font-black text-metallic-gold">
              VERIFICATION TERMINAL
            </h1>
          </div>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Free contract verification with live monitoring status. 
            Get instant security insights before purchasing a full audit.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          
          {/* Left: Sample Contracts */}
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold text-metallic-gold">
            FREE CONTRACT VERIFICATION
          </h2>
            <p className="text-text-muted text-sm">
              Try these verified contracts to see our monitoring system
            </p>
            
            <div className="space-y-4">
              {sampleContracts.map((contract, index) => (
                <div
                  key={index}
                  className="glass-panel cut-corners p-6 border border-metallic-gold/20 hover:border-cyber-green/40 transition-all duration-300 cursor-pointer group"
                  onClick={() => loadSampleContract(contract)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-heading font-bold text-metallic-gold group-hover:text-cyber-green transition-colors duration-300">
                      {contract.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                      <span className="text-cyber-green font-mono text-xs font-bold">
                        {contract.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-text-muted font-mono text-sm">
                      {contract.protocol}
                    </div>
                    <div className="text-text-muted font-mono text-xs">
                      {contract.address}
                    </div>
                    <div className="text-cyber-green font-mono text-sm font-bold">
                      TVL: {contract.tvl}
                    </div>
                    <div className="text-metallic-gold font-mono text-xs">
                      TIER: {contract.tier}
                    </div>
                    <div className="text-cyber-green font-mono text-xs">
                      {contract.guardian}
                    </div>
                    <div className="text-cyber-green font-mono text-xs">
                      WARRANTY: {contract.warranty}
                    </div>
                  </div>
                  
          <span className="text-metallic-gold font-mono text-sm font-bold">
                    VERIFY THIS CONTRACT
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Terminal */}
          <div className="lg:col-span-2">
            <div className="glass-panel cut-corners border border-metallic-gold/30 bg-black/60">
              
              {/* Terminal Header */}
              <div className="bg-black/90 border-b border-metallic-gold/30 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-metallic-gold font-mono text-sm font-bold">
                    GBB_SECURE_SHELL -- v.2.4.0
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon()}
                  <span className={`font-mono text-sm font-bold ${getStatusColor()}`}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="p-6 min-h-[500px] relative overflow-hidden">
                
                {/* Background Grid Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,148,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,148,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Input Area */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-center border-b border-metallic-gold/30 pb-4">
                    <span className="text-cyber-green font-mono mr-3 text-lg">➜</span>
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="ENTER CONTRACT ADDRESS TO VERIFY..."
                      className="w-full bg-transparent text-cyber-green focus:outline-none placeholder-gray-700 font-mono text-lg"
                      onKeyDown={(e) => e.key === 'Enter' && simulateScan()}
                      disabled={status === 'SCANNING'}
                    />
                    <button 
                      onClick={simulateScan}
                      disabled={status === 'SCANNING' || !input || input.length < 6}
                      className="p-3 hover:bg-metallic-gold/10 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="w-5 h-5 text-metallic-gold" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-text-muted font-mono text-xs">
                    <span>PRESS ENTER TO START SCAN</span>
                    <span>MINIMUM: 6 CHARACTERS</span>
                  </div>
                </div>

                {/* Logs Output */}
                <div className="space-y-2 relative z-10 font-mono text-sm min-h-[300px]">
                  {logs.length === 0 && status === 'IDLE' && (
                    <div className="text-text-muted/60 italic">
                      Ready to verify contract security...
                    </div>
                  )}
                  
                  {logs.map((log, i) => (
                    <div key={i} className="text-cyber-green/80 animate-fade-in">
                      {log}
                    </div>
                  ))}
                  
                  {status === 'SCANNING' && (
                    <div className="flex items-center space-x-2 text-metallic-gold animate-pulse">
                      <span>SCANNING IN PROGRESS</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-metallic-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                        <div className="w-2 h-2 bg-metallic-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                        <div className="w-2 h-2 bg-metallic-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Success State Overlay */}
                {status === 'SUCCESS' && contractData && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <div className="relative text-center max-w-md">
                      
                      {/* Glowing Shield */}
                      <div className="relative mb-6">
                        <div className="absolute -inset-8 bg-cyber-green/20 blur-2xl rounded-full animate-pulse" />
                        <div className="relative w-24 h-24 rounded-lg bg-cyber-green/20 border-2 border-cyber-green/30 flex items-center justify-center">
                          <ShieldCheck className="w-12 h-12 text-cyber-green" />
                        </div>
                      </div>
                      
                      <h2 className="text-3xl font-heading font-black text-cyber-green mb-4 tracking-wider">
                        VERIFIED SECURE
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-2 bg-cyber-green/10 border border-cyber-green/30 px-4 py-2 cut-corners">
                          <Activity className="w-4 h-4 text-cyber-green" />
                          <span className="text-cyber-green font-mono font-bold">ACTIVE MONITORING ENABLED</span>
                        </div>
                        
                        <div className="glass-panel cut-corners p-4 bg-black/40 border border-cyber-green/20">
                          <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                              <div className="text-cyber-green font-mono text-xs uppercase tracking-wider">Contract</div>
                              <div className="text-white font-mono text-sm">{contractData.name}</div>
                            </div>
                            <div>
                              <div className="text-cyber-green font-mono text-xs uppercase tracking-wider">Protocol</div>
                              <div className="text-metallic-gold font-mono text-sm">{contractData.protocol}</div>
                            </div>
                            <div>
                              <div className="text-cyber-green font-mono text-xs uppercase tracking-wider">Tier</div>
                              <div className="text-metallic-gold font-mono text-sm">{contractData.tier}</div>
                            </div>
                            <div>
                              <div className="text-cyber-green font-mono text-xs uppercase tracking-wider">Guardian</div>
                              <div className="text-cyber-green font-mono text-sm">{contractData.guardian}</div>
                            </div>
                          </div>
                          <div className="mt-3 text-center">
                            <div className="text-cyber-green font-mono text-xs uppercase tracking-wider">Warranty Status</div>
                            <div className="text-cyber-green font-mono text-sm font-bold">{contractData.warranty}</div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => {
                            setStatus('IDLE');
                            setLogs([]);
                            setInput('');
                            setContractData(null);
                          }}
                          className="bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold px-6 py-3 text-metallic-gold hover:text-void-black transition-all duration-300 cut-corners font-mono font-bold mr-4"
                        >
                          VERIFY ANOTHER CONTRACT
                        </button>
                        <button 
                          onClick={() => window.location.href = '/pricing'}
                          className="bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-6 py-3 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold"
                        >
                          GET FULL AUDIT
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="glass-panel cut-corners p-8 border border-metallic-gold/30 bg-gradient-to-br from-cyber-green/5 to-metallic-gold/5 text-center">
            <h3 className="text-2xl font-heading font-bold text-metallic-gold mb-4">
              ABOUT GOLDBACKBOND VERIFICATION
            </h3>
            <p className="text-text-muted mb-6 max-w-2xl mx-auto">
              Our verification system connects to real-time security monitoring networks 
              to provide instant contract verification with active protection status.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-cyber-green/20 border border-cyber-green/30 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-cyber-green" />
                </div>
                <h4 className="text-cyber-green font-mono font-bold mb-2">REAL-TIME</h4>
                <p className="text-text-muted text-sm">Live security monitoring and threat detection</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-metallic-gold/20 border border-metallic-gold/30 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-6 h-6 text-metallic-gold" />
                </div>
                <h4 className="text-metallic-gold font-mono font-bold mb-2">INSTITUTIONAL</h4>
                <p className="text-text-muted text-sm">Bank-grade security with warranty coverage</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-cyber-green/20 border border-cyber-green/30 flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-cyber-green" />
                </div>
                <h4 className="text-cyber-green font-mono font-bold mb-2">24/7 ACTIVE</h4>
                <p className="text-text-muted text-sm">Continuous protection and emergency response</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};