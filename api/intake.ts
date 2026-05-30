// Audit intake — receives the post-payment intake form from /intake and
// notifies the operator on Discord + Telegram so a real person picks up
// the customer within the 24-hour window the success page promises.
//
// Design notes:
//   - No DB yet. The Discord/Telegram message IS the persistence layer
//     (Troy gets paged, picks up in his usual channels). Add Supabase
//     storage in a v2 when the volume warrants it.
//   - Secrets come from Vercel env vars, not from the client:
//       DISCORD_AUDIT_WEBHOOK  — defaults to DISCORD_WEBHOOK if absent
//       TELEGRAM_BOT_TOKEN     — same bot Hermes uses
//       TELEGRAM_CHAT_ID       — same chat
//   - All three are optional. We send to whichever channel has credentials.
//     A 200 response only requires at least ONE channel to confirm send.
//   - Validation is light: required fields are protocol_name, contact_handle.
//     We don't try to validate contract addresses here — operator does it.

import type { VercelRequest, VercelResponse } from '@vercel/node';

interface IntakeBody {
  tier?: string;
  protocol_name?: string;
  contract_addresses?: string;
  github_url?: string;
  deployment_network?: string;
  solidity_version?: string;
  primary_contact_method?: string;
  contact_handle?: string;
  email_backup?: string;
  focus_areas?: string;
  additional_notes?: string;
}

const DISCORD_WEBHOOK =
  process.env.DISCORD_AUDIT_WEBHOOK || process.env.DISCORD_WEBHOOK || '';
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT = process.env.TELEGRAM_CHAT_ID || '';

// Trim string to avoid abuse — caps every field at 2000 chars.
const clamp = (s: unknown, n = 2000): string => {
  if (typeof s !== 'string') return '';
  return s.slice(0, n).trim();
};

// Generate a short confirmation ID the customer can quote in follow-up.
const confirmationId = (): string => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GBB-${ts}-${rand}`;
};

const buildPlainText = (id: string, body: IntakeBody): string => {
  const lines = [
    `=== NEW AUDIT INTAKE — ${id} ===`,
    `Tier:       ${clamp(body.tier) || 'unspecified'}`,
    `Protocol:   ${clamp(body.protocol_name) || 'unspecified'}`,
    `Network:    ${clamp(body.deployment_network) || 'unspecified'}`,
    `Solidity:   ${clamp(body.solidity_version) || 'unspecified'}`,
    `GitHub:     ${clamp(body.github_url) || '(none)'}`,
    `Contact:    ${clamp(body.primary_contact_method) || 'unspecified'} ${clamp(body.contact_handle) || ''}`,
    `Email:      ${clamp(body.email_backup) || '(not provided)'}`,
    '',
    'Contract addresses:',
    clamp(body.contract_addresses) || '(none provided)',
    '',
    'Focus areas:',
    clamp(body.focus_areas) || '(none specified)',
    '',
    'Notes:',
    clamp(body.additional_notes) || '(none)',
    '',
    `Submitted: ${new Date().toISOString()}`,
  ];
  return lines.join('\n');
};

const sendDiscord = async (id: string, body: IntakeBody): Promise<boolean> => {
  if (!DISCORD_WEBHOOK) return false;
  try {
    const text = buildPlainText(id, body);
    const payload = {
      embeds: [
        {
          title: `[INTAKE] ${clamp(body.protocol_name) || 'New audit'} — ${clamp(body.tier).toUpperCase() || 'tier?'}`,
          description: '```\n' + text + '\n```',
          color: 0xd4af37, // metallic gold
          footer: { text: `Goldbackbond Security Audits • ${id}` },
        },
      ],
    };
    const res = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(7000),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const sendTelegram = async (id: string, body: IntakeBody): Promise<boolean> => {
  if (!TELEGRAM_TOKEN || !TELEGRAM_CHAT) return false;
  try {
    const text = buildPlainText(id, body);
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const params = new URLSearchParams({
      chat_id: TELEGRAM_CHAT,
      text,
    });
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: AbortSignal.timeout(7000),
    });
    return res.ok;
  } catch {
    return false;
  }
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const body = (req.body || {}) as IntakeBody;

  // Minimum-viable validation — operator handles the rest.
  if (!clamp(body.protocol_name) || !clamp(body.contact_handle)) {
    res.status(400).json({
      error: 'missing_required_fields',
      required: ['protocol_name', 'contact_handle'],
    });
    return;
  }

  const id = confirmationId();
  // Fire both channels in parallel — both can succeed, both can fail; we
  // succeed if at least one delivered.
  const [discordOk, telegramOk] = await Promise.all([
    sendDiscord(id, body),
    sendTelegram(id, body),
  ]);

  if (!discordOk && !telegramOk) {
    res.status(502).json({
      error: 'notify_failed',
      message: 'No notification channel could be reached. Please contact us via Telegram directly.',
      confirmation_id: id,
    });
    return;
  }

  res.status(200).json({
    ok: true,
    confirmation_id: id,
    channels: {
      discord: discordOk,
      telegram: telegramOk,
    },
    message: 'Intake received. The Goldbackbond team will reach out within 24 hours.',
  });
}
