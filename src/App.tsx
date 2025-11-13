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
      case 'users':
        return <UsersPage />
      case 'books':
        return <BooksPage />
      case 'loans':
        return <LoansPage />
      default:
        return <UsersPage />
    }
  }

  return (
    <div className={styles.appContainer}>
      <header className={styles.productHeader}>
        <i className="fa-solid fa-book-open"></i>
        <h1 className={styles.productName}>PageSwap Admin</h1>
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
