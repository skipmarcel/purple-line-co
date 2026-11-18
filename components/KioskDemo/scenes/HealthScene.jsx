import CheckCircle from './CheckCircle';
import k from './Kiosk.module.css';

export default function HealthScene({ frame }) {
  return (
    <>
      <div className={k.grid2}>
        <div className={k.field}>
          <div className={k.fieldLabel}>Who&apos;s your artist?</div>
          <div className={k.fieldBox}>
            {frame.artist || <span className={k.placeholder}>Pick your artist</span>}
          </div>
        </div>
        <div className={k.field}>
          <div className={k.fieldLabel}>Where on your body?</div>
          <div className={k.fieldBox}>{frame.placement}</div>
        </div>
      </div>
      <div className={k.checkGrid}>
        {frame.health.map((item) => (
          <div key={item.text} className={`${k.checkItem} ${item.checked ? k.checkItemOn : ''}`}>
            <CheckCircle on={item.checked} />
            {item.text}
          </div>
        ))}
      </div>
    </>
  );
}
