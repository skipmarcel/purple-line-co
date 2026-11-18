import LogoPlaceholder from './LogoPlaceholder';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logoLink} aria-label="Purple Line Co. home">
          <LogoPlaceholder />
        </a>
        <a className="btn btn-primary" href="#early-access">Get early access</a>
      </div>
    </header>
  );
}
