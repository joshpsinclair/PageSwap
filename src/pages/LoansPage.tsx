import styles from './Page.module.css'

export function LoansPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <i className={`fa-solid fa-arrow-right-arrow-left ${styles.icon}`}></i>
        <h1 className={styles.title}>Loans & Swaps</h1>
      </div>
      <div className={styles.emptyState}>
        <i className="fa-solid fa-arrow-right-arrow-left" style={{ fontSize: '48px', color: 'var(--color-text-disabled)' }}></i>
        <p className={styles.emptyText}>Loan and swap management coming soon</p>
      </div>
    </div>
  )
}
