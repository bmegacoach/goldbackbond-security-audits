import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase (to be set when credentials available)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Hermes-backed live stats: same-origin Vercel API route that proxies
// http://VPS:8443/security-stats.json over HTTPS. Set VITE_USE_HERMES_STATS=true
// to prefer this real-data source over the Supabase / mock fallbacks.
const USE_HERMES_STATS =
  (import.meta.env.VITE_USE_HERMES_STATS || 'true').toString().toLowerCase() === 'true';
const HERMES_STATS_PATH = import.meta.env.VITE_HERMES_STATS_PATH || '/api/security-stats';

interface SecurityStats {
  total_protocols: number;
  vulnerabilities_prevented: number;
  assets_protected_millions: number;
  hack_attempts_blocked: number;
  last_updated: string;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

interface UnifiedStatsService {
  getStats(): Promise<SecurityStats>;
  getFrontendStats(): Promise<StatItem[]>;
  isProduction(): boolean;
}

/**
 * HermesStatsService — reads live security data from the Hermes Chief of
 * Security agent via the same-origin Vercel API route at
 * /api/security-stats. Falls back transparently if the upstream is down.
 *
 * The data flow:
 *   VPS cron every 5min -> /data/hermes/public/security-stats.json
 *   nginx:alpine on VPS:8443 serves that file
 *   Vercel edge function /api/security-stats proxies + caches at edge
 *   This class fetches /api/security-stats from the browser
 */
class HermesStatsService implements UnifiedStatsService {
  private lastSuccessfulStats: SecurityStats | null = null;

  async getStats(): Promise<SecurityStats> {
    const response = await fetch(HERMES_STATS_PATH, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      if (this.lastSuccessfulStats) {
        console.warn(
          `Hermes stats upstream ${response.status} — serving last cached`,
        );
        return this.lastSuccessfulStats;
      }
      throw new Error(`Hermes stats unavailable (HTTP ${response.status})`);
    }

    const data = await response.json();
    // Defensive: validate shape before trusting it
    if (!data?.stats) {
      throw new Error('Hermes stats response missing .stats field');
    }

    const stats: SecurityStats = {
      total_protocols: Number(data.stats.total_protocols_audited) || 0,
      vulnerabilities_prevented: Number(data.stats.vulnerabilities_prevented) || 0,
      assets_protected_millions: Number(data.stats.assets_protected_millions) || 0,
      hack_attempts_blocked: Number(data.stats.hack_attempts_blocked) || 0,
      last_updated: data.last_updated || new Date().toISOString(),
    };
    this.lastSuccessfulStats = stats;
    return stats;
  }

  async getFrontendStats(): Promise<StatItem[]> {
    const stats = await this.getStats();
    return [
      {
        label: 'Total Protocols Audited',
        value: stats.total_protocols.toString(),
        change: '+1',
        trend: 'up',
      },
      {
        label: 'Vulnerabilities Prevented',
        value: stats.vulnerabilities_prevented.toLocaleString(),
        change: 'live',
        trend: 'up',
      },
      {
        label: 'Assets Protected ($M)',
        value: `$${stats.assets_protected_millions.toFixed(0)}`,
        change: '+0',
        trend: 'up',
      },
      {
        label: 'Hack Attempts Blocked',
        value: stats.hack_attempts_blocked.toLocaleString(),
        change: 'live',
        trend: 'up',
      },
    ];
  }

  isProduction(): boolean {
    return true;
  }
}

class MockStatsService implements UnifiedStatsService {
  private baseStats: SecurityStats = {
    total_protocols: 37,
    vulnerabilities_prevented: 478,
    assets_protected_millions: 78.00,
    hack_attempts_blocked: 46,
    last_updated: new Date().toISOString()
  };

  private currentStats: SecurityStats = { ...this.baseStats };

  private generateRealisticChange(): number {
    const changes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const weights = [0.4, 0.25, 0.15, 0.1, 0.05, 0.03, 0.01, 0.005, 0.003, 0.001, 0.001];
    
    const random = Math.random();
    let cumulative = 0;
    
    for (let i = 0; i < changes.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return changes[i];
      }
    }
    return 0;
  }

  private updateStats(): SecurityStats {
    const vulnerabilitiesChange = this.generateRealisticChange();
    const hackAttemptsChange = this.generateRealisticChange();
    const assetsChange = Math.random() > 0.7 ? (Math.random() * 5).toFixed(2) : "0";

    return {
      total_protocols: 37,
      vulnerabilities_prevented: this.currentStats.vulnerabilities_prevented + vulnerabilitiesChange,
      assets_protected_millions: this.currentStats.assets_protected_millions + parseFloat(assetsChange),
      hack_attempts_blocked: this.currentStats.hack_attempts_blocked + hackAttemptsChange,
      last_updated: new Date().toISOString()
    };
  }

  async getStats(): Promise<SecurityStats> {
    const lastUpdate = new Date(this.currentStats.last_updated);
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdate.getTime();
    
    if (timeDiff > 30000) {
      this.currentStats = this.updateStats();
    }
    
    return this.currentStats;
  }

  async getFrontendStats(): Promise<StatItem[]> {
    const stats = await this.getStats();
    
    return [
      {
        label: "Total Protocols Audited",
        value: stats.total_protocols.toString(),
        change: "+1",
        trend: 'up'
      },
      {
        label: "Vulnerabilities Prevented", 
        value: stats.vulnerabilities_prevented.toString(),
        change: `+${this.generateRealisticChange()}`,
        trend: 'up'
      },
      {
        label: "Assets Protected ($M)",
        value: `$${stats.assets_protected_millions.toFixed(0)}`,
        change: `+${(Math.random() * 5).toFixed(1)}`,
        trend: 'up'
      },
      {
        label: "Hack Attempts Blocked",
        value: stats.hack_attempts_blocked.toString(),
        change: `+${this.generateRealisticChange()}`,
        trend: 'up'
      }
    ];
  }

  isProduction(): boolean {
    return false;
  }
}

class ProductionStatsService implements UnifiedStatsService {
  private supabase: any;
  private isInitialized = false;

  constructor() {
    // Validate credentials before initializing
    const isValidUrl = SUPABASE_URL && 
                       SUPABASE_URL.startsWith('http') && 
                       SUPABASE_URL.includes('supabase.co');
    const isValidKey = SUPABASE_ANON_KEY && 
                       SUPABASE_ANON_KEY.length > 0 && 
                       SUPABASE_ANON_KEY.startsWith('eyJ');
    
    if (isValidUrl && isValidKey) {
      try {
        this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        this.isInitialized = true;
        console.log('Supabase client initialized successfully');
      } catch (error) {
        console.warn('Failed to initialize Supabase client:', error);
        this.isInitialized = false;
      }
    } else {
      console.log('Invalid Supabase credentials, falling back to mock service');
      this.isInitialized = false;
    }
  }

  async getStats(): Promise<SecurityStats> {
    if (!this.isInitialized || !this.supabase) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data, error } = await this.supabase
        .from('security_statistics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching stats:', error);
        throw error;
      }

      return data || {
        total_protocols: 37,
        vulnerabilities_prevented: 478,
        assets_protected_millions: 78.00,
        hack_attempts_blocked: 46,
        last_updated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Production stats fetch failed:', error);
      throw error;
    }
  }

  async getFrontendStats(): Promise<StatItem[]> {
    const stats = await this.getStats();
    
    return [
      {
        label: "Total Protocols Audited",
        value: stats.total_protocols.toString(),
        change: "+1",
        trend: 'up'
      },
      {
        label: "Vulnerabilities Prevented", 
        value: stats.vulnerabilities_prevented.toString(),
        change: "+1",
        trend: 'up'
      },
      {
        label: "Assets Protected ($M)",
        value: `$${stats.assets_protected_millions.toFixed(0)}`,
        change: "+4",
        trend: 'up'
      },
      {
        label: "Hack Attempts Blocked",
        value: stats.hack_attempts_blocked.toString(),
        change: "0",
        trend: 'up'
      }
    ];
  }

  isProduction(): boolean {
    return this.isInitialized;
  }
}

// Unified service factory.
// Preference order:
//   1. Hermes (live VPS data) if VITE_USE_HERMES_STATS is truthy (default)
//   2. Supabase (production stats table) if credentials present
//   3. Mock (simulated data) as final fallback
export const createUnifiedStatsService = (): UnifiedStatsService => {
  if (USE_HERMES_STATS) {
    console.log(
      `Initializing Hermes Statistics Service (real data via ${HERMES_STATS_PATH})`,
    );
    return new HermesStatsService();
  }

  // Enhanced credential validation
  const isValidUrl = SUPABASE_URL &&
                     SUPABASE_URL.startsWith('http') &&
                     SUPABASE_URL.includes('supabase.co');
  const isValidKey = SUPABASE_ANON_KEY &&
                     SUPABASE_ANON_KEY.length > 0 &&
                     SUPABASE_ANON_KEY.startsWith('eyJ');

  if (isValidUrl && isValidKey) {
    console.log('Initializing Production Statistics Service (Supabase)');
    return new ProductionStatsService();
  } else {
    console.log('Initializing Mock Statistics Service (Production Ready)');
    console.log('Note: Supabase credentials not available or invalid');
    return new MockStatsService();
  }
};

export const unifiedStatsService = createUnifiedStatsService();
export type { SecurityStats, StatItem, UnifiedStatsService };