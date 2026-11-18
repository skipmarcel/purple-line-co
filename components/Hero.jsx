'use client';

import { ArrowRight } from './icons';
import { RESTART_DEMO_EVENT } from './KioskDemo/timeline';
import styles from './Hero.module.css';

export default function Hero() {
  // "Watch a check-in": scroll to the iPad and restart the walkthrough from the welcome screen.
  const watch = (e) => {
    e.preventDefault();
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent(RESTART_DEMO_EVENT));
  };

  return (
    <section id="top" className={`container ${styles.hero}`}>
      <p className={styles.badge}>
        <span aria-hidden="true" className={styles.dot} />
        Coming soon from Purple Line Co.
      </p>
      <h1 className={styles.title}>
        Introducing <span className={styles.accent}>Purple Line Consent.</span>
      </h1>
      <p className={styles.lede}>
        Tattoo consent forms on a dedicated iPad at your front desk. No client phones, no QR codes,
        and it keeps working without Wi-Fi.
      </p>
      <div className={styles.actions}>
        <a className="btn btn-primary btn-lg" href="#early-access">
          Get early access <ArrowRight />
        </a>
        <a className="btn btn-ghost btn-lg" href="#demo" onClick={watch}>
          Watch a check-in
        </a>
      </div>
    </section>
  );
}
