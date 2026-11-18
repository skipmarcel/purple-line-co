import styles from './KioskDemo.module.css';

/** The Lilitab iPad ID Scan Shelf: a black plate on an arm at the top left of the kiosk. */
export default function IdShelf({ frame }) {
  const onShelf = frame.sceneId === 'id' && frame.cardVisible;
  const offset = frame.sceneId === 'id' ? -Math.round(frame.cardOffset * 150) : -150;

  return (
    <div className={styles.shelf} aria-hidden="true">
      <div className={styles.shelfRow}>
        <div className={styles.shelfPlate}>
          <div
            className={styles.miniCard}
            style={{ transform: `translateX(${offset}%)`, opacity: onShelf ? 1 : 0 }}
          >
            <div className={styles.miniCardTop} />
            <div className={styles.miniCardBody}>
              <div className={styles.miniCardPhoto} />
              <div className={styles.miniCardLines}><span /><span /><span /></div>
            </div>
          </div>
        </div>
        <div className={styles.shelfArm} />
      </div>
      <div className={styles.shelfLabel}>ID Scan Shelf</div>
    </div>
  );
}
