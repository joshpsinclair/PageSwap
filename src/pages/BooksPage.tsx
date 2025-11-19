import styles from './Page.module.css';

export function BooksPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <i className={`fa-solid fa-book ${styles.icon}`}></i>
        <h1 className={styles.title}>Book Management</h1>
      </div>
      <div className={styles.emptyState}>
        <i className="fa-solid fa-book" style={{ fontSize: '48px', color: 'var(--color-text-disabled)' }}></i>
        <p className={styles.emptyText}>Book management coming soon</p>
      </div>
    </div>
  );
}
