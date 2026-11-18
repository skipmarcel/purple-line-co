import k from './Kiosk.module.css';

const SIGNATURE_PATH =
  'M110 170 C 140 90, 170 80, 175 140 S 190 200, 215 150 S 250 70, 270 120 S 280 190, 310 160 C 330 140, 345 110, 360 150 S 390 180, 420 140 C 440 115, 455 140, 470 155 S 520 130, 560 145 C 600 160, 640 120, 690 135';
const PATH_LENGTH = 1100;

export default function SignScene({ frame }) {
  return (
    <>
      <div className={k.field} style={{ maxWidth: 560 }}>
        <div className={k.fieldLabel}>Printed name</div>
        <div className={k.fieldBox}>{frame.printedName}</div>
      </div>
      <div className={k.signature}>
        <div className={k.signatureLine} />
        <div className={k.signatureX}>×</div>
        <svg className={k.signatureSvg} viewBox="0 0 1000 250" preserveAspectRatio="none" aria-hidden="true">
          <path
            d={SIGNATURE_PATH}
            fill="none"
            stroke="#1d1b1f"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={PATH_LENGTH}
            strokeDashoffset={Math.round(PATH_LENGTH * (1 - frame.signature))}
          />
        </svg>
      </div>
    </>
  );
}
