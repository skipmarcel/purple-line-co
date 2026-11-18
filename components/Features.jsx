import { WifiOff, PhoneOff, IdCard } from './icons';
import styles from './Features.module.css';

const FEATURES = [
  {
    Icon: WifiOff,
    title: "Doesn't need Wi-Fi",
    body: 'Shop internet down? Working a convention with no signal? Clients keep checking in, and releases sync automatically once the iPad reconnects.',
  },
  {
    Icon: PhoneOff,
    title: "Never uses your client's phone",
    body: 'No QR codes, no texted links, no app downloads, no blurry camera-roll photos. Everything happens on your kiosk.',
  },
  {
    Icon: IdCard,
    title: 'ID photo in one tap',
    body: 'Clients set their ID on the shelf built into the kiosk and tap Take photo. Clear, readable, and saved with their signed release.',
  },
];

export default function Features() {
  return (
    <section className={styles.section} aria-label="Why Purple Line Consent">
      <div className={`container ${styles.grid}`}>
        {FEATURES.map(({ Icon, title, body }) => (
          <div key={title} className={styles.item}>
            <span className={styles.icon}><Icon /></span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.body}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
