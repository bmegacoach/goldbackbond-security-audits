import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText,
  Github,
  Network,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

/**
 * IntakePage — the post-payment customer onboarding form.
 *
 * Lives at /intake. Customers land here from PaymentSuccessPage right
 * after Stripe redirects back. The form captures the audit specifics
 * (contracts, GitHub, network, contact preference) and fires them at
 * /api/intake which pages Troy on Discord + Telegram.
 *
 * The success state shows a confirmation ID the customer can quote in
 * any follow-up — and a clear "what happens next" promise.
 */
export const IntakePage = () => {
  const [searchParams] = useSearchParams();
  const initialTier = searchParams.get('tier') || '';
  const initialProtocol = searchParams.get('protocol') || '';

  const [form, setForm] = useState({
    tier: initialTier,
    protocol_name: initialProtocol,
    contract_addresses: '',
    github_url: '',
    deployment_network: '',
    solidity_version: '',
    primary_contact_method: 'telegram',
    contact_handle: '',
    email_backup: '',
    focus_areas: '',
    additional_notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<
    | { state: 'idle' }
    | { state: 'success'; id: string; message: string }
    | { state: 'error'; message: string }
  >({ state: 'idle' });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResult({ state: 'idle' });

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.confirmation_id) {
        setResult({
          state: 'success',
          id: data.confirmation_id,
          message: data.message || 'Intake received.',
        });
      } else if (data.confirmation_id) {
        // Notify failed but we still have an ID — encourage Telegram fallback
        setResult({
          state: 'error',
          message: `${data.message || 'Submission stored locally but notification failed.'} Confirmation ID: ${data.confirmation_id}`,
        });
      } else {
        setResult({
          state: 'error',
          message:
            data.error === 'missing_required_fields'
              ? 'Please provide your protocol name and a contact handle.'
              : 'Submission failed. Please try again or contact us on Telegram.',
        });
      }
    } catch (err) {
      setResult({
        state: 'error',
        message: 'Network error. Please try again or contact us on Telegram.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success state ────────────────────────────────────────────────────────
  if (result.state === 'success') {
    return (
      <div className="min-h-screen bg-void-black flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="relative mb-8">
            <div className="absolute -inset-8 bg-cyber-green/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative w-24 h-24 rounded-lg bg-cyber-green/20 border-2 border-cyber-green/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-cyber-green" />
            </div>
          </div>
          <h1 className="text-5xl font-heading font-black text-cyber-green mb-4 tracking-wider">
            INTAKE RECEIVED
          </h1>
          <p className="text-xl text-text-muted mb-8">{result.message}</p>

          <div className="glass-panel cut-corners p-8 border border-cyber-green/30 bg-cyber-green/5 mb-8">
            <div className="text-text-muted font-mono text-sm uppercase tracking-wider mb-2">
              CONFIRMATION ID
            </div>
            <div className="text-3xl font-mono font-bold text-metallic-gold tracking-wider">
              {result.id}
            </div>
            <div className="text-text-muted font-mono text-xs mt-3">
              Quote this in any follow-up message.
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
            {[
              {
                t: '< 24 hours',
                d: 'Our security team will reach out via your preferred channel to confirm scope.',
              },
              {
                t: 'Day 1-3',
                d: 'Static analysis kicks off. Slither, Mythril, Aderyn, manual review.',
              },
              {
                t: 'Per tier',
                d: 'Delivery within the SLA you paid for. Guardian setup if Platinum.',
              },
            ].map((step, i) => (
              <div
                key={i}
                className="glass-panel cut-corners p-4 border border-metallic-gold/20"
              >
                <div className="text-metallic-gold font-mono text-sm font-bold mb-2">
                  {step.t}
                </div>
                <div className="text-text-muted text-sm">{step.d}</div>
              </div>
            ))}
          </div>

          <Link
            to="/"
            className="inline-flex items-center bg-metallic-gold/20 hover:bg-metallic-gold/30 border border-metallic-gold px-8 py-4 text-metallic-gold hover:text-void-black transition-all duration-300 cut-corners font-mono font-bold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  // ── Form state ───────────────────────────────────────────────────────────
  const labelCls =
    'block text-text-muted font-mono text-sm uppercase tracking-wider mb-2';
  const inputCls =
    'w-full bg-black/40 border border-metallic-gold/30 px-4 py-3 text-white placeholder-text-muted cut-corners focus:outline-none focus:border-cyber-green';
  const textareaCls = `${inputCls} font-mono text-sm`;

  return (
    <div className="min-h-screen bg-void-black">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-cyber-green/10 border-2 border-cyber-green/30 mb-4">
            <FileText className="w-8 h-8 text-cyber-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-black text-metallic-gold mb-3">
            AUDIT INTAKE
          </h1>
          <p className="text-text-muted max-w-2xl mx-auto">
            Tell us about your protocol. The more you give us up front, the
            faster we move. Required: protocol name and a contact handle.
          </p>
        </div>

        <form onSubmit={submit} className="space-y-8">
          {/* Tier + Protocol */}
          <div className="glass-panel cut-corners p-6 border border-metallic-gold/20">
            <h2 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
              <FileText className="w-4 h-4 inline mr-2" />
              PROTOCOL
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Tier purchased</label>
                <select
                  value={form.tier}
                  onChange={(e) => update('tier', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select tier</option>
                  <option value="silver">Silver ($3,500)</option>
                  <option value="gold">Gold ($6,500)</option>
                  <option value="platinum">Platinum ($9,500)</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>
                  Protocol name <span className="text-cyber-green">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.protocol_name}
                  onChange={(e) => update('protocol_name', e.target.value)}
                  placeholder="MyProtocol"
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* Code references */}
          <div className="glass-panel cut-corners p-6 border border-metallic-gold/20">
            <h2 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
              <Github className="w-4 h-4 inline mr-2" />
              CODE &amp; CONTRACTS
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>GitHub / Git repository URL</label>
                <input
                  type="url"
                  value={form.github_url}
                  onChange={(e) => update('github_url', e.target.value)}
                  placeholder="https://github.com/your-org/your-protocol"
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>
                  Deployed contract addresses{' '}
                  <span className="text-text-muted">(one per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.contract_addresses}
                  onChange={(e) => update('contract_addresses', e.target.value)}
                  placeholder={'0xVaultAddress  Vault\n0xTokenAddress Token'}
                  className={textareaCls}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Deployment network</label>
                  <select
                    value={form.deployment_network}
                    onChange={(e) =>
                      update('deployment_network', e.target.value)
                    }
                    className={inputCls}
                  >
                    <option value="">Select network</option>
                    <option value="ethereum">Ethereum mainnet</option>
                    <option value="arbitrum">Arbitrum</option>
                    <option value="optimism">Optimism</option>
                    <option value="base">Base</option>
                    <option value="polygon">Polygon</option>
                    <option value="bsc">BNB Chain</option>
                    <option value="avalanche">Avalanche</option>
                    <option value="solana">Solana</option>
                    <option value="testnet">Testnet only</option>
                    <option value="not-deployed">Not yet deployed</option>
                    <option value="other">Other (specify in notes)</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Solidity version</label>
                  <input
                    type="text"
                    value={form.solidity_version}
                    onChange={(e) =>
                      update('solidity_version', e.target.value)
                    }
                    placeholder="0.8.24"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="glass-panel cut-corners p-6 border border-metallic-gold/20">
            <h2 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              CONTACT
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Preferred channel</label>
                <select
                  value={form.primary_contact_method}
                  onChange={(e) =>
                    update('primary_contact_method', e.target.value)
                  }
                  className={inputCls}
                >
                  <option value="telegram">Telegram</option>
                  <option value="discord">Discord</option>
                  <option value="email">Email</option>
                  <option value="signal">Signal</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>
                  Handle / address <span className="text-cyber-green">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.contact_handle}
                  onChange={(e) => update('contact_handle', e.target.value)}
                  placeholder="@yourhandle"
                  className={inputCls}
                />
              </div>
            </div>
            <div className="mt-4">
              <label className={labelCls}>Email (backup)</label>
              <input
                type="email"
                value={form.email_backup}
                onChange={(e) => update('email_backup', e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>
          </div>

          {/* Scope */}
          <div className="glass-panel cut-corners p-6 border border-metallic-gold/20">
            <h2 className="text-metallic-gold font-mono text-sm font-bold uppercase tracking-wider mb-4">
              <Network className="w-4 h-4 inline mr-2" />
              SCOPE &amp; FOCUS
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelCls}>
                  Specific focus areas / known concerns
                </label>
                <textarea
                  rows={3}
                  value={form.focus_areas}
                  onChange={(e) => update('focus_areas', e.target.value)}
                  placeholder="Oracle manipulation, reentrancy in withdraw flow, access control on admin functions, etc."
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Additional notes</label>
                <textarea
                  rows={3}
                  value={form.additional_notes}
                  onChange={(e) => update('additional_notes', e.target.value)}
                  placeholder="Timeline pressure, prior audits, integrations to be aware of, etc."
                  className={inputCls}
                />
              </div>
            </div>
          </div>

          {/* Error state */}
          {result.state === 'error' && (
            <div className="glass-panel cut-corners p-4 border border-red-500/30 bg-red-500/5 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="text-red-400 font-mono text-sm">
                {result.message}
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-text-muted font-mono text-xs">
              <span className="text-cyber-green">*</span> required
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="bg-cyber-green/20 hover:bg-cyber-green/30 border border-cyber-green px-8 py-4 text-cyber-green hover:text-void-black transition-all duration-300 btn-fill-hover cut-corners font-mono font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'SUBMITTING...' : 'SUBMIT INTAKE'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
