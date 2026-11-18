import LogoPlaceholder from './LogoPlaceholder';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <LogoPlaceholder size="sm" tone="dark" />
          <span className={styles.name}>Purple Line Co.</span>
        </div>
        <a href="mailto:hello@purplelineco.com">hello@purplelineco.com</a>
        {/* TODO: replace with the real Instagram handle */}
        <a href="#">Instagram</a>
        <span className={styles.copy}>© {new Date().getFullYear()} Purple Line Co.</span>
      </div>
    </footer>
  );
}
