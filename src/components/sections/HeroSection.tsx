import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Zap } from 'lucide-react';
import { useStatistics } from '../../context/StatisticsContext';

export const HeroSection = () => {
  const { stats, isLoading } = useStatistics();
  const [radarRotation, setRadarRotation] = useState(0);
  const [scanLine, setScanLine] = useState(0);

  useEffect(() => {
    const radarTimer = setInterval(() => {
      setRadarRotation((prev) => (prev + 1) % 360);
    }, 50);

    const scanTimer = setInterval(() => {
      setScanLine((prev) => (prev + 2) % 100);
    }, 100);

    return () => {
      clearInterval(radarTimer);
      clearInterval(scanTimer);
    };
  }, []);

  return (
    <section className="min-h-screen bg-void-black relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="scanlines absolute inset-0" />
        <div className="grid-pattern absolute inset-0" />
      </div>

      {/* Gradient Overlay to separate content from radar */}
      <div className="absolute inset-0 bg-gradient-to-r from-void-black via-void-black/95 to-transparent lg:hidden" />

      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Side - Content */}
          <div className="space-y-6 relative z-20">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 glass-panel cut-corners px-4 py-2 border border-metallic-gold/30">
              <Shield className="w-4 h-4 text-cyber-green" />
              <span className="text-cyber-green font-mono text-sm font-bold">INSTITUTIONAL SECURITY</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-heading font-black leading-tight relative z-10">
                <span className="text-metallic-gold text-glow">GOLDBACKBOND</span>
                <br />
                <span className="text-white">SECURITY</span>
                <br />
                <span className="text-cyber-green">AUDITS</span>
              </h1>
              
              <p className="text-xl text-text-muted max-w-lg leading-relaxed">
                The world's most advanced DeFi security platform. 
                Protecting institutional protocols with military-grade precision and financial guarantees.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              {[
                "Advanced Static Analysis & Fuzz Testing",
                "24/7 On-Chain Threat Detection",
                "Up to $500K Financial Coverage"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyber-green rounded-full" />
                  <span className="text-text-main font-mono">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                to="/verification"
                className="inline-flex items-center justify-center space-x-2 bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg group"
              >
                <span>START SECURITY AUDIT</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center space-x-2 glass-panel cut-corners px-8 py-4 border border-metallic-gold/30 text-metallic-gold hover:bg-metallic-gold/10 transition-all duration-300 font-mono font-bold text-lg"
              >
                <span>VIEW PLANS</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8 border-t border-metallic-gold/20">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-metallic-gold">
                  {isLoading ? '...' : stats?.total_protocols || '37'}
                </div>
                <div className="text-text-muted font-mono text-sm">PROTOCOLS SECURED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-cyber-green">
                  ${isLoading ? '...' : (stats?.assets_protected_millions || 78).toFixed(0)}
                </div>
                <div className="text-text-muted font-mono text-sm">ASSETS PROTECTED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white">0</div>
                <div className="text-text-muted font-mono text-sm">BREACHES</div>
              </div>
            </div>
          </div>

          {/* Right Side - Radar Visualization */}
          <div className="relative z-10">
            <div className="glass-panel cut-corners p-8 border border-metallic-gold/30 bg-black/40">
              <div className="text-center mb-6">
                <h3 className="text-xl font-heading font-bold text-metallic-gold mb-2">
                  THREAT DETECTION RADAR
                </h3>
                <p className="text-cyber-green font-mono text-sm">
                  LIVE PROTOCOL MONITORING // STATUS: SECURE
                </p>
              </div>

              {/* Radar Display */}
              <div className="relative w-80 h-80 mx-auto">
                {/* Radar Grid */}
                <svg className="w-full h-full" viewBox="0 0 320 320">
                  {/* Grid circles */}
                  {[1, 2, 3, 4].map((i) => (
                    <circle
                      key={i}
                      cx="160"
                      cy="160"
                      r={i * 40}
                      fill="none"
                      stroke="rgb(212, 175, 55)"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  ))}
                  
                  {/* Grid lines */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                    const radians = (angle * Math.PI) / 180;
                    const x1 = 160 + 160 * Math.cos(radians);
                    const y1 = 160 + 160 * Math.sin(radians);
                    return (
                      <line
                        key={angle}
                        x1="160"
                        y1="160"
                        x2={x1}
                        y2={y1}
                        stroke="rgb(212, 175, 55)"
                        strokeWidth="0.5"
                        opacity="0.3"
                      />
                    );
                  })}
                  
                  {/* Radar sweep */}
                  <g transform={`rotate(${radarRotation} 160 160)`}>
                    <path
                      d="M160 160 L160 0 A160 160 0 0 1 173.6 15.6 Z"
                      fill="rgba(0, 255, 148, 0.2)"
                    />
                    <line
                      x1="160"
                      y1="160"
                      x2="160"
                      y2="0"
                      stroke="rgb(0, 255, 148)"
                      strokeWidth="2"
                    />
                  </g>
                  
                  {/* Scan line */}
                  <line
                    x1="0"
                    y1={320 - (scanLine * 3.2)}
                    x2="320"
                    y2={320 - (scanLine * 3.2)}
                    stroke="rgb(0, 255, 148)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  
                  {/* Target blips */}
                  <circle cx="120" cy="100" r="3" fill="rgb(255, 0, 0)" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="220" r="3" fill="rgb(255, 0, 0)" opacity="0.8">
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </svg>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyber-green rounded-full" />
              </div>

              {/* Status Panel */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-sm">SCAN STATUS</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                    <span className="text-cyber-green font-mono text-sm font-bold">ACTIVE</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-sm">THREATS DETECTED</span>
                  <span className="text-white font-mono text-sm font-bold">0</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-muted font-mono text-sm">PROTOCOLS MONITORED</span>
                  <span className="text-metallic-gold font-mono text-sm font-bold">
                    {isLoading ? '...' : stats?.total_protocols || '37'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};