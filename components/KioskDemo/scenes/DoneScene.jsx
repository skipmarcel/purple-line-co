import { Check } from '../../icons';
import { SHOP_NAME } from '../timeline';
import k from './Kiosk.module.css';

export default function DoneScene({ frame }) {
  return (
    <div className={k.done}>
      <div className={k.doneCheck} style={{ transform: `scale(${frame.pop})` }}>
        <Check size={54} color="#fff" strokeWidth={3} />
      </div>
      <div className={k.doneTitle}>You&apos;re all set, Alex!</div>
      <div className={k.doneBody}>
        {SHOP_NAME} has your signed release. Hand the tablet back to the front desk and get comfy.
      </div>
      <div className={k.doneFooter}>
        <div>Signed today, 2:14 PM</div>
        <div>Clearing in {frame.countdown}s</div>
      </div>
    </div>
  );
}
