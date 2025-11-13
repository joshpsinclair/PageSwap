import styles from './Sidebar.module.css'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'users', label: 'Users', icon: 'fa-solid fa-users' },
    { id: 'books', label: 'Books', icon: 'fa-solid fa-book' },
    { id: 'loans', label: 'Loans & Swaps', icon: 'fa-solid fa-arrow-right-arrow-left' },
  ]

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${currentPage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
