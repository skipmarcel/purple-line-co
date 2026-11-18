import { Check } from '../../icons';
import KioskButton from './KioskButton';
import k from './Kiosk.module.css';

export default function IdScene({ frame }) {
  const captured = frame.captured;
  return (
    <div className={k.idLayout}>
      <div className={k.viewfinder}>
        <div className={k.viewfinderFrame}>
          {/* Sample card (never a real ID) */}
          <div className={k.idCard} style={{ transform: `translateX(${Math.round(frame.cardOffset * 140)}%)` }}>
            <div className={k.idCardTop}>SAMPLE ID</div>
            <div className={k.idCardBody}>
              <div className={k.idCardPhoto} />
              <div className={k.idCardText}>
                <strong>RIVERA, ALEX</strong>
                <div>DOB 04/12/1994</div>
                <div>EXP 08/14/2030</div>
                <div className={k.idCardBar} />
                <div className={k.idCardBar} />
              </div>
            </div>
          </div>
          {captured && (
            <div className={k.gotIt}>
              <span className={k.gotItDot}><Check size={16} color="#fff" strokeWidth={3} /></span>Got it
            </div>
          )}
        </div>
        <div className={k.viewfinderLabel}>Live view of the ID shelf</div>
        <div className={k.flash} style={{ opacity: frame.flash }} />
      </div>

      <div className={k.idPanel}>
        <div className={k.idPointer}>↖ ID shelf, top left of the kiosk</div>
        <div className={k.idTitle}>{captured ? 'Got your ID' : 'Place your ID on the shelf'}</div>
        <div className={k.idHint}>
          {captured
            ? "Looks good. Don't forget to take your ID off the shelf."
            : 'Place it on the ID shelf at the top left of the kiosk, then tap Take photo.'}
        </div>
        <KioskButton className={k.shootButton} pressed={frame.shootPressed} tap={frame.tap}>
          {captured ? 'Next' : 'Take photo'}
        </KioskButton>
      </div>
    </div>
  );
}
