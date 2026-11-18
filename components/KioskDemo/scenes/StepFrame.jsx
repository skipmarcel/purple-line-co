import KioskButton from './KioskButton';
import k from './Kiosk.module.css';

/** Shared layout for form steps: progress bar, title, content, Back / Next footer. */
export default function StepFrame({ frame, title, nextLabel = 'Next', children }) {
  return (
    <>
      <div className={k.stepBar}>
        <div className={k.stepBarFill} style={{ width: `${frame.stepProgress}%` }} />
      </div>
      <div className={k.stepBody}>
        <div className={k.stepTitle}>{title}</div>
        {children}
      </div>
      <div className={k.stepFooter}>
        <div className={k.backButton}>← Back</div>
        <KioskButton className={k.nextButton} pressed={frame.nextPressed} tap={frame.nextTap} rippleSize={60} rippleRight={50}>
          {nextLabel}<span>→</span>
        </KioskButton>
      </div>
    </>
  );
}
