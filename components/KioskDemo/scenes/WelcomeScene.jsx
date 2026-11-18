import { SHOP_NAME } from '../timeline';
import KioskButton from './KioskButton';
import k from './Kiosk.module.css';

const STEPS = ['A few details about you', 'Your tattoo and health', 'A quick photo of your ID', 'Sign and send'];

export default function WelcomeScene({ frame }) {
  return (
    <div className={k.welcome}>
      <div className={k.welcomeMain}>
        <div className={k.welcomeKicker}>Client check-in</div>
        <div className={k.welcomeTitle}>Hi! Welcome to {SHOP_NAME}.</div>
        <div className={k.welcomeBody}>
          Let&apos;s get your release signed before your session. It takes about three minutes.
        </div>
        <KioskButton className={k.startButton} pressed={frame.startPressed} tap={frame.tap} rippleSize={70} rippleRight={60}>
          Start new release <span>→</span>
        </KioskButton>
      </div>
      <div className={k.welcomeSteps}>
        {STEPS.map((s, i) => (
          <div key={s} className={k.welcomeStep}><b>0{i + 1}</b>{s}</div>
        ))}
      </div>
    </div>
  );
}
