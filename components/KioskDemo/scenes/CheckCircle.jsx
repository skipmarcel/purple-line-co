import { Check } from '../../icons';
import k from './Kiosk.module.css';

export default function CheckCircle({ on, size = 20 }) {
  return (
    <div className={`${k.checkCircle} ${on ? k.checkCircleOn : ''}`}>
      {on && <Check size={size} color="#fff" strokeWidth={3} />}
    </div>
  );
}
