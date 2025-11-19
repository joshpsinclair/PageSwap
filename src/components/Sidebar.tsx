import { useState } from 'react';
import styles from './Sidebar.module.css';
import { useDevUtilities } from '../repositories';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { clearUsers, seedUsers } = useDevUtilities();
  const [isLoading, setIsLoading] = useState(false);

  const navItems = [
    { id: 'books', label: 'Books', icon: 'fa-solid fa-book' },
    { id: 'loans', label: 'Loans & Swaps', icon: 'fa-solid fa-arrow-right-arrow-left' },
    { id: 'users', label: 'Users', icon: 'fa-solid fa-gear' },
  ];

  const handleClearUsers = async () => {
    if (!confirm('Are you sure you want to clear all users from the database?')) {
      return;
    }

    setIsLoading(true);
    try {
      await clearUsers();
      alert('Users cleared successfully!');

      // Trigger a page refresh to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error clearing users:', error);
      alert('Failed to clear users. Check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportUsers = async () => {
    if (!confirm('This will clear existing users and import from users.json. Continue?')) {
      return;
    }

    setIsLoading(true);
    try {
      // Fetch the generated users.json file
      const response = await fetch('/users.json');
      if (!response.ok) {
        throw new Error('Failed to fetch users.json');
      }

      const usersData = await response.json();
      const users = usersData.users;

      await clearUsers();
      await seedUsers(users);

      alert(`Successfully imported ${users.length} users!`);

      // Trigger a page refresh to update the UI
      window.location.reload();
    } catch (error) {
      console.error('Error importing users:', error);
      alert("Failed to import users. Check console for details. Did you forget to run 'npm run seed [nUsers]'");
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className={styles.utilities}>
        <div className={styles.utilitiesLabel}>Dev Utilities</div>
        <button className={styles.utilityButton} onClick={handleClearUsers} disabled={isLoading}>
          <i className="fa-solid fa-trash"></i>
          <span>Clear Users</span>
        </button>
        <button className={styles.utilityButton} onClick={handleImportUsers} disabled={isLoading}>
          <i className="fa-solid fa-file-import"></i>
          <span>Import Users</span>
        </button>
      </div>
    </aside>
  );
}
