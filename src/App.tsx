import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { UsersPage } from './pages/UsersPage'
import { BooksPage } from './pages/BooksPage'
import { LoansPage } from './pages/LoansPage'
import styles from './App.module.css'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('users')
  
  const renderPage = () => {
    switch (currentPage) {
      case 'books':
        return <BooksPage />
      case 'loans':
        return <LoansPage />
      case 'users':
        return <UsersPage />
      default:
        return <UsersPage />
    }
  }

  return (
    <div className={styles.appContainer}>
      <header className={styles.productHeader}>
        <i className="fa-solid fa-book-open"></i>
        <div className={styles.productName}>Page<span>Swap</span></div>
      </header>
      
      <div className={styles.mainLayout}>
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className={styles.content}>
          <div className={styles.pageContainer}>
            {renderPage()}
          </div>
          <footer className={styles.footer}>
            <p>© 2025 PageSwap. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
