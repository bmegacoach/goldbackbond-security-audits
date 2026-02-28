import { useEffect, useState } from 'react';
import { unifiedStatsService, type StatItem } from '../../services/unifiedStatsService';

export const LiveStats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isProduction, setIsProduction] = useState(false);

  // Fetch real-time statistics from unified service
  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const frontendStats = await unifiedStatsService.getFrontendStats();
      setStats(frontendStats);
      setLastUpdate(new Date());
      setIsProduction(unifiedStatsService.isProduction());
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
      // Fallback to base stats if service fails
      setStats([
        { label: "Total Protocols Audited", value: "37", change: "+1", trend: 'up' },
        { label: "Vulnerabilities Prevented", value: "478", change: "+1", trend: 'up' },
        { label: "Assets Protected ($M)", value: "$78", change: "+4", trend: 'up' },
        { label: "Hack Attempts Blocked", value: "46", change: "0", trend: 'up' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Initial fetch
    fetchStats();
    
    // Update current time every second
    const timeTimer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Update stats every 30 seconds for real-time effect
    const statsTimer = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(statsTimer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      timeZone: 'UTC'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <section className="py-16 bg-panel-black/50 border-y border-metallic-gold/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-heading font-bold text-metallic-gold mb-2">
              LIVE SECURITY FEED
            </h2>
            <p className="text-text-muted font-mono">
              REAL-TIME PROTOCOL MONITORING // THREAT DETECTION ACTIVE
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-cyber-green font-mono text-xl font-bold">
              UTC {formatTime(currentTime)}
            </div>
            <div className="text-text-muted font-mono text-sm">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="glass-panel cut-corners p-6 border border-metallic-gold/20 animate-pulse"
              >
                <div className="space-y-4">
                  <div className="h-4 bg-metallic-gold/20 rounded w-3/4"></div>
                  <div className="h-8 bg-metallic-gold/20 rounded w-1/2"></div>
                  <div className="h-px bg-metallic-gold/30"></div>
                  <div className="flex items-center justify-between">
                    <div className="h-3 bg-metallic-gold/20 rounded w-16"></div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyber-green/50 rounded-full animate-pulse"></div>
                      <div className="h-3 bg-cyber-green/20 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel cut-corners p-6 border border-metallic-gold/20 hover:border-cyber-green/40 transition-all duration-300 group"
            >
              <div className="text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              
              <div className="flex items-end justify-between mb-2">
                <div className="text-3xl font-heading font-bold text-metallic-gold">
                  {stat.value}
                </div>
                
                <div className={`flex items-center space-x-1 ${
                  stat.trend === 'up' ? 'text-cyber-green' : 'text-red-400'
                }`}>
                  <span className="font-mono text-sm">
                    {stat.trend === 'up' ? '↗' : '↘'}
                  </span>
                  <span className="font-mono text-sm font-bold">
                    {stat.change}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-metallic-gold/30 to-transparent mb-3" />
              
              <div className="flex items-center justify-between">
                <span className="text-text-muted font-mono text-xs">STATUS</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
                  <span className="text-cyber-green font-mono text-xs font-bold">SECURE</span>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
        
        {/* Real-time indicator */}
        {!isLoading && lastUpdate && (
          <div className="mt-6 text-center">
            <p className="text-text-muted font-mono text-sm">
              Last updated: {lastUpdate.toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' })} UTC
              {isProduction && (
                <span className="text-cyber-green ml-2">• PRODUCTION DATA</span>
              )}
              {!isProduction && (
                <span className="text-yellow-400 ml-2">• SIMULATED DATA</span>
              )}
            </p>
          </div>
        )}

        {/* Live Feed */}
        <div className="mt-12">
          <div className="glass-panel cut-corners p-6 border border-metallic-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-heading font-bold text-metallic-gold">
                SECURITY EVENTS LOG
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-mono text-sm font-bold">MONITORING</span>
              </div>
            </div>
            
            <div className="space-y-3 max-h-40 overflow-y-auto">
              {[
                "12:47 UTC - Protocol GBB-Staking-001: Advanced threat detected and neutralized",
                "12:45 UTC - Automated security scan completed for new deployment",
                "12:43 UTC - Guardian node deployed for protocol DeFiYield-2024",
                "12:41 UTC - Vulnerability assessment completed: 0 critical issues",
                "12:39 UTC - Real-time monitoring activated for 37 active protocols"
              ].map((event, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 hover:bg-black/20 transition-colors duration-200">
                  <span className="text-cyber-green font-mono text-sm font-mono mt-1">•</span>
                  <span className="text-text-main font-mono text-sm">{event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};