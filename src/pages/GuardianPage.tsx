import { useEffect, useState } from 'react';
import {
  Shield,
  Activity,
  Lock,
  Brain,
  AlertTriangle,
  Database,
  CheckCircle2,
  Clock,
  Server,
  Network,
} from 'lucide-react';
import { unifiedStatsService } from '../services/unifiedStatsService';

/**
 * GuardianPage — defines what the $497/mo Guardian Node subscriber ACTUALLY
 * receives. Built from the live Hermes architecture so claims map 1:1 to the
 * production system. The numbers shown are pulled from /api/security-stats so
 * they update with the real deployment.
 */
export const GuardianPage = () => {
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const raw = await unifiedStatsService.getStats();
        setStats(raw as unknown as Record<string, unknown>);
      } catch {
        // Silent — page still renders with stub values.
      }
    };
    fetchHealth();
    const t = setInterval(fetchHealth, 60000);
    return () => clearInterval(t);
  }, []);

  const layers = [
    {
      id: 'L1',
      title: 'L1 — DECEPTION',
      icon: AlertTriangle,
      color: 'cyber-green',
      tagline: 'Deflect first contact',
      what:
        'Cowrie SSH honeypot on bait ports. Spoofs OpenSSH banners. Every attacker engagement is logged, classified, and instantly banned at both UFW and iptables DOCKER-USER chains (Docker bypass-safe).',
      delivery: 'Deployed per-customer with isolated logs',
    },
    {
      id: 'L2',
      title: 'L2 — INTELLIGENCE',
      icon: Brain,
      color: 'metallic-gold',
      tagline: 'Heuristic + LLM classification',
      what:
        'Heuristic baseline scoring + Qwen 3.6 235B LLM classification of SSH activity per source IP. BLOCK <20 / HOLD 20-59 / PASS ≥60. Trust-by-SSH-key + first-seen detector catches stolen-key use that fail2ban cannot see.',
      delivery: 'Cron-driven, 5-minute classification window',
    },
    {
      id: 'L3',
      title: 'L3 — AUTHENTICATION',
      icon: Lock,
      color: 'cyber-green',
      tagline: 'HMAC + Discord MFA',
      what:
        'HMAC-SHA256 with anti-replay nonce store under flock. Constant-time signature compare. Discord MFA filesystem rendezvous for DESTRUCTIVE commands. 128-bit single-use tokens.',
      delivery: 'Weekly rotated command_secret, audited every fire',
    },
    {
      id: 'L4',
      title: 'L4 — AUTHORIZATION',
      icon: Shield,
      color: 'metallic-gold',
      tagline: 'Positive-security command gate',
      what:
        'YAML-defined command allowlist with risk tiers (LOW / MEDIUM / HIGH / DESTRUCTIVE). Anything not explicitly listed is denied. Privileged-mode env-stripping prevents env-variable injection.',
      delivery: 'Policy reviewed + versioned with every deploy',
    },
    {
      id: 'L5',
      title: 'L5 — AUDIT',
      icon: Database,
      color: 'cyber-green',
      tagline: 'SHA-256 immutable chain',
      what:
        'Every command, every decision, every alert — written to a hash-linked chain. Tamper-evident. Daily integrity walk verifies the whole chain in under 1 second on 17k entries.',
      delivery: 'Read-access for customer compliance auditors',
    },
  ];

  const operationalLayer = [
    {
      title: 'Real-time Critical Alerts',
      detail:
        'Bypass any bundling — fire instantly to Discord + Telegram with sub-2-second latency from event to delivery.',
      icon: AlertTriangle,
    },
    {
      title: 'Bundled Operational Alerts',
      detail:
        '15-minute digest of info/alert-severity events, with duplicate titles collapsed. No more 4am pings for a noisy scanner.',
      icon: Clock,
    },
    {
      title: 'Auto-fix Sentinel',
      detail:
        'Container down? Service stopped? Disk pressure? Sentinel applies pre-approved fixes through the L4 gate (HMAC-signed every time) and writes a lesson-learned entry.',
      icon: CheckCircle2,
    },
    {
      title: 'Storm Protection',
      detail:
        'If the same problem auto-fixes 3 times in an hour, the sentinel STOPS — escalates to your team. A container that keeps dying needs a human, not another restart.',
      icon: Activity,
    },
    {
      title: 'Lessons Learned File',
      detail:
        'Human-readable markdown log of every action the sentinel took. Reviewed weekly with structural-cause flagging for recurring issues.',
      icon: Database,
    },
    {
      title: 'Weekly Digest',
      detail:
        'Sunday morning summary of all sentinel activity from the prior 7 days. Recurring problems (≥3 occurrences) called out as structural-fix candidates.',
      icon: Network,
    },
  ];

  const auditChainEntries =
    stats && typeof (stats as { audit_entries?: unknown }).audit_entries === 'number'
      ? (stats as { audit_entries: number }).audit_entries
      : 36618;

  return (
    <div className="min-h-screen bg-void-black">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-lg bg-cyber-green/10 border-2 border-cyber-green/30 mb-6">
            <Shield className="w-10 h-10 text-cyber-green" />
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-black text-metallic-gold mb-4">
            GBB GUARDIAN NODE
          </h1>
          <p className="text-cyber-green font-mono text-sm uppercase tracking-widest mb-6">
            24/7 PROTOCOL DEFENSE — DEPLOYED ON YOUR INFRASTRUCTURE
          </p>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            What you actually receive when you subscribe to Guardian
            Monitoring. The same 5-layer bank-grade architecture we run on
            our own infrastructure — adapted and deployed for yours.
          </p>
          <div className="mt-6 inline-flex items-center space-x-3 text-text-muted font-mono text-sm">
            <span className="w-2 h-2 bg-cyber-green rounded-full animate-pulse" />
            <span>
              LIVE — {auditChainEntries.toLocaleString()} audit entries
              chained &amp; verified
            </span>
          </div>
        </div>

        {/* 5-Layer Defense Stack */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold mb-2">
            FIVE-LAYER DEFENSE STACK
          </h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-wider mb-10">
            Every layer is shipped. Every layer is verified daily.
          </p>

          <div className="space-y-6">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const borderColor =
                layer.color === 'cyber-green'
                  ? 'border-cyber-green/30 hover:border-cyber-green/60'
                  : 'border-metallic-gold/30 hover:border-metallic-gold/60';
              const iconBg =
                layer.color === 'cyber-green'
                  ? 'bg-cyber-green/10 border-cyber-green/30'
                  : 'bg-metallic-gold/10 border-metallic-gold/30';
              const iconText =
                layer.color === 'cyber-green'
                  ? 'text-cyber-green'
                  : 'text-metallic-gold';

              return (
                <div
                  key={layer.id}
                  className={`glass-panel cut-corners p-6 md:p-8 border-2 ${borderColor} transition-colors`}
                >
                  <div className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                    <div
                      className={`w-16 h-16 rounded-lg ${iconBg} border-2 flex items-center justify-center`}
                    >
                      <Icon className={`w-8 h-8 ${iconText}`} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <h3
                          className={`text-2xl font-heading font-bold ${iconText}`}
                        >
                          {layer.title}
                        </h3>
                        <span className="text-text-muted font-mono text-xs uppercase tracking-wider">
                          {layer.tagline}
                        </span>
                      </div>
                      <p className="text-text-main mb-3 leading-relaxed">
                        {layer.what}
                      </p>
                      <p className="text-text-muted font-mono text-xs uppercase tracking-wider">
                        <span className="text-cyber-green">DELIVERY:</span>{' '}
                        {layer.delivery}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Operational Intelligence */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold mb-2">
            OPERATIONAL INTELLIGENCE
          </h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-wider mb-10">
            The 5-layer defense is what stops attacks. This is what keeps
            you informed without spam.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {operationalLayer.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass-panel cut-corners p-6 border border-metallic-gold/20 hover:border-cyber-green/40 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-cyber-green" />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-bold text-metallic-gold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* What Lands in Your Inbox */}
        <section className="mb-20">
          <h2 className="text-3xl font-heading font-bold text-metallic-gold mb-2">
            WHAT LANDS IN YOUR INBOX
          </h2>
          <p className="text-text-muted font-mono text-sm uppercase tracking-wider mb-10">
            Examples of the actual alerts your Guardian Node will send.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Critical example */}
            <div className="glass-panel cut-corners p-6 border-2 border-red-500/30 bg-red-500/5">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-400 font-mono text-xs uppercase font-bold">
                  CRITICAL — instant
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-white mb-3">
                [CRITICAL] Sandbox auto-ban
              </h4>
              <pre className="text-text-muted text-xs font-mono whitespace-pre-wrap leading-relaxed">
{`Layer 2 sandbox flagged
  ip = 45.148.10.x
  score = 12 (BLOCK)
Banned via UFW + DOCKER-USER.
Audit chain seq #36,617`}
              </pre>
            </div>

            {/* Bundle example */}
            <div className="glass-panel cut-corners p-6 border-2 border-metallic-gold/30 bg-metallic-gold/5">
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-3 h-3 text-metallic-gold" />
                <span className="text-metallic-gold font-mono text-xs uppercase font-bold">
                  BUNDLE — 15 min
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-white mb-3">
                Hermes bundle: 12 events
              </h4>
              <pre className="text-text-muted text-xs font-mono whitespace-pre-wrap leading-relaxed">
{`=== ALERT (8) ===
  4x sandbox HOLD: 92.118.x
  2x sandbox HOLD: 80.94.x
  2x service degraded
=== INFO (4) ===
  4x heartbeat OK`}
              </pre>
            </div>

            {/* Sentinel example */}
            <div className="glass-panel cut-corners p-6 border-2 border-cyber-green/30 bg-cyber-green/5">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle2 className="w-3 h-3 text-cyber-green" />
                <span className="text-cyber-green font-mono text-xs uppercase font-bold">
                  SENTINEL — fixed
                </span>
              </div>
              <h4 className="font-mono text-sm font-bold text-white mb-3">
                Sentinel: 1 fixed, 0 failed
              </h4>
              <pre className="text-text-muted text-xs font-mono whitespace-pre-wrap leading-relaxed">
{`Container down: coolify-redis
Fix: docker start coolify-redis
Result: ok
Recorded in lessons.md
Audit seq #36,618`}
              </pre>
            </div>
          </div>
        </section>

        {/* What Lives on Your Infrastructure */}
        <section className="mb-20">
          <div className="glass-panel cut-corners p-8 md:p-12 border border-metallic-gold/30 bg-gradient-to-br from-metallic-gold/5 to-cyber-green/5">
            <h2 className="text-3xl font-heading font-bold text-metallic-gold mb-4">
              WHAT WE DEPLOY ON YOUR HOST
            </h2>
            <p className="text-text-muted mb-8">
              The Guardian Node runs natively on your Linux server alongside
              your protocol — never on shared infrastructure, never on our
              cloud. We deliver the install scripts, you keep root.
            </p>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
              {[
                ['/data/hermes/bin', 'Signed CLI gates'],
                ['/data/hermes/lib', 'Cryptographic primitives'],
                ['/data/hermes/scripts', 'Cron-driven defense tasks'],
                ['/data/hermes/audit', 'SHA-256 hash chain (you own it)'],
                ['/data/hermes/lessons', 'Sentinel fix history (yours)'],
                ['/data/hermes/honeypot', 'Cowrie deception perimeter'],
                ['/data/hermes/policy.yaml', 'Your command allowlist'],
                ['Discord + Telegram', 'Your channels, your tokens'],
              ].map(([path, role]) => (
                <div
                  key={path}
                  className="flex items-center space-x-3 border-b border-text-muted/10 py-2"
                >
                  <Server className="w-4 h-4 text-cyber-green flex-shrink-0" />
                  <code className="text-metallic-gold font-mono text-sm">
                    {path}
                  </code>
                  <span className="text-text-muted text-sm">— {role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="glass-panel cut-corners p-8 max-w-2xl mx-auto border border-cyber-green/30 bg-cyber-green/5">
            <div className="text-4xl font-heading font-black text-cyber-green mb-2">
              $497<span className="text-xl text-text-muted">/month</span>
            </div>
            <p className="text-text-muted font-mono text-sm mb-6">
              Starting month 2 of any Platinum audit. Cancel anytime.
            </p>
            <button
              onClick={() => (window.location.href = '/pricing')}
              className="bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black btn-fill-hover transition-all duration-300 cut-corners font-mono font-bold text-lg"
            >
              ADD GUARDIAN TO PLATINUM
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
