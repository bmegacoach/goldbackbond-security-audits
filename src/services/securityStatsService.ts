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

class SecurityStatsService {
  private baseStats: SecurityStats = {
    total_protocols: 37,
    vulnerabilities_prevented: 478,
    assets_protected_millions: 78.00,
    hack_attempts_blocked: 46,
    last_updated: new Date().toISOString()
  };

  private currentStats: SecurityStats = { ...this.baseStats };

  // Simulate realistic data changes
  private generateRealisticChange(): number {
    // Small random changes to simulate real-time monitoring
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

  // Update statistics with realistic changes
  private updateStats(): SecurityStats {
    const vulnerabilitiesChange = this.generateRealisticChange();
    const hackAttemptsChange = this.generateRealisticChange();
    const assetsChange = Math.random() > 0.7 ? (Math.random() * 5).toFixed(2) : "0";

    return {
      total_protocols: 37, // Protocols remain stable
      vulnerabilities_prevented: this.currentStats.vulnerabilities_prevented + vulnerabilitiesChange,
      assets_protected_millions: this.currentStats.assets_protected_millions + parseFloat(assetsChange),
      hack_attempts_blocked: this.currentStats.hack_attempts_blocked + hackAttemptsChange,
      last_updated: new Date().toISOString()
    };
  }

  // Get current statistics
  async getCurrentStats(): Promise<SecurityStats> {
    // Update stats every 30 seconds with realistic changes
    const lastUpdate = new Date(this.currentStats.last_updated);
    const now = new Date();
    const timeDiff = now.getTime() - lastUpdate.getTime();
    
    // Update if more than 30 seconds have passed
    if (timeDiff > 30000) {
      this.currentStats = this.updateStats();
    }
    
    return this.currentStats;
  }

  // Convert backend stats to frontend format
  async getFrontendStats(): Promise<StatItem[]> {
    const stats = await this.getCurrentStats();
    
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

  // Production implementation for Supabase (when credentials available)
  async getStatsFromSupabase(): Promise<SecurityStats> {
    // This would be the actual implementation with Supabase
    /*
    const { data, error } = await supabase
      .from('security_statistics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error fetching stats:', error);
      return this.baseStats;
    }

    return data || this.baseStats;
    */
    
    // Fallback to mock for now
    return this.getCurrentStats();
  }

  // Production implementation for updating stats
  async updateStatsInSupabase(newStats: Partial<SecurityStats>): Promise<void> {
    // This would be the actual implementation with Supabase
    /*
    const { error } = await supabase
      .from('security_statistics')
      .insert({
        ...newStats,
        created_at: new Date().toISOString(),
        last_updated: new Date().toISOString()
      });

    if (error) {
      console.error('Error updating stats:', error);
      throw error;
    }
    */
    
    // For now, just update local state
    this.currentStats = { ...this.currentStats, ...newStats };
  }
}

export const securityStatsService = new SecurityStatsService();
export type { SecurityStats, StatItem };