'use client';

import { useState } from 'react';
import { ArrowRight, Check } from './icons';
import styles from './EarlyAccess.module.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
const EMPTY = { email: '', shop: '', artists: '' };

const PERKS = [
  'Founding-shop pricing, locked in',
  'Personal help setting up your iPad kiosk',
  'A say in what we build next',
];

export default function EarlyAccess() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError('');
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (!EMAIL_RE.test(form.email.trim())) return setError('Enter a valid email address.');
    if (!form.shop.trim()) return setError('Add your shop name.');

    // No endpoint configured yet (local dev): show the success state without sending.
    if (!ENDPOINT) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'purplelineco.com coming soon' }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('idle');
      setError("Something went wrong. Please try again, or email hello@purplelineco.com.");
    }
  }

  const reset = () => {
    setForm(EMPTY);
    setStatus('idle');
  };

  return (
    <section id="early-access" className={`container ${styles.section}`}>
      <div className={styles.copy}>
        <p className="eyebrow">Early access</p>
        <h2 className={styles.title}>Be one of our founding shops.</h2>
        <p className={styles.lede}>
          Join the list and you&apos;ll be first in line when Purple Line Consent launches. Founding
          shops lock in a special launch rate and get hands-on help setting up their kiosk.
        </p>
        <ul className={styles.perks}>
          {PERKS.map((p) => (
            <li key={p}><Check color="var(--purple)" />{p}</li>
          ))}
        </ul>
      </div>

      <div className={styles.card}>
        {status === 'sent' ? (
          <div role="status" className={styles.success}>
            <div className={styles.successIcon}><Check size={34} color="#fff" strokeWidth={3} /></div>
            <p className={styles.successTitle}>You&apos;re on the list.</p>
            <p className={styles.successBody}>
              Thanks{form.shop.trim() ? `, ${form.shop.trim()}` : ''}. We&apos;ll email {form.email} as soon as
              founding-shop spots open.
            </p>
            <button type="button" className="btn btn-ghost" onClick={reset}>Add another shop</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="ea-email">Email</label>
              <input id="ea-email" className={styles.input} type="email" autoComplete="email"
                placeholder="you@yourshop.com" value={form.email} onChange={update('email')} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="ea-shop">Shop name</label>
              <input id="ea-shop" className={styles.input} type="text" autoComplete="organization"
                value={form.shop} onChange={update('shop')} required />
            </div>
            <div className={styles.field}>
              <label htmlFor="ea-artists">How many artists?</label>
              <select id="ea-artists" className={styles.input} value={form.artists} onChange={update('artists')}>
                <option value="">Choose one</option>
                <option value="1-2">1–2</option>
                <option value="3-6">3–6</option>
                <option value="7-12">7–12</option>
                <option value="13+">13 or more</option>
              </select>
            </div>
            {error && <p role="alert" className={styles.error}>{error}</p>}
            <button type="submit" className={`btn btn-primary btn-lg ${styles.submit}`} disabled={status === 'sending'}>
              {status === 'sending' ? 'Joining…' : 'Join the early access list'} <ArrowRight />
            </button>
            <p className={styles.fine}>We&apos;ll only email you about Purple Line Consent. No spam.</p>
          </form>
        )}
      </div>
    </section>
  );
}
