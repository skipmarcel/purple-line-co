import styles from './LogoPlaceholder.module.css';

/**
 * Stand-in for the Purple Line Co. logo.
 * When the logo is ready: put it in /public (e.g. /public/logo.svg) and replace this
 * component's markup with <Image src="/logo.svg" alt="Purple Line Co." width={…} height={…} />.
 */
export default function LogoPlaceholder({ size = 'md', tone = 'light' }) {
  return (
    <div
      role="img"
      aria-label="Purple Line Co."
      className={`${styles.box} ${styles[size]} ${tone === 'dark' ? styles.dark : ''}`}
    >
      Logo
    </div>
  );
}
