import k from './Kiosk.module.css';

/** A kiosk button that can show a "pressed" state and a fading tap ripple. */
export default function KioskButton({ className = '', pressed, tap = 0, rippleSize = 64, rippleRight = 56, children }) {
  return (
    <div className={`${k.button} ${pressed ? k.buttonPressed : ''} ${className}`}>
      {children}
      <span
        className={k.ripple}
        style={{
          right: rippleRight,
          width: rippleSize,
          height: rippleSize,
          marginTop: -rippleSize / 2,
          opacity: tap,
        }}
      />
    </div>
  );
}
