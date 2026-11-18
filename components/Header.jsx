import Logo from './Logo';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logoLink} aria-label="Purple Line Co. home">
          <Logo />
          <span className={styles.name}>Purple Line Co.</span>
        </a>
        <a className={`btn btn-primary ${styles.cta}`} href="#early-access">Get early access</a>
      </div>
    </header>
  );
}
