import React, { createContext, useContext, useEffect, useState } from 'react';
import { unifiedStatsService, type SecurityStats } from '../services/unifiedStatsService';

interface StatisticsContextType {
  stats: SecurityStats | null;
  isLoading: boolean;
  error: string | null;
  isProduction: boolean;
  refreshStats: () => Promise<void>;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};

interface StatisticsProviderProps {
  children: React.ReactNode;
}

export const StatisticsProvider: React.FC<StatisticsProviderProps> = ({ children }) => {
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProduction, setIsProduction] = useState(false);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const statsData = await unifiedStatsService.getStats();
      setStats(statsData);
      setIsProduction(unifiedStatsService.isProduction());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch statistics';
      setError(errorMessage);
      console.error('Statistics fetch error:', err);
      
      // Set fallback stats
      setStats({
        total_protocols: 37,
        vulnerabilities_prevented: 478,
        assets_protected_millions: 78.00,
        hack_attempts_blocked: 46,
        last_updated: new Date().toISOString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshStats = async () => {
    await fetchStats();
  };

  useEffect(() => {
    fetchStats();

    // Update stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  const value: StatisticsContextType = {
    stats,
    isLoading,
    error,
    isProduction,
    refreshStats
  };

  return (
    <StatisticsContext.Provider value={value}>
      {children}
    </StatisticsContext.Provider>
  );
};