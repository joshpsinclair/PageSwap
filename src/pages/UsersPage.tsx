import { useState, useEffect, useCallback } from 'react'
import { UserRepository } from '../data/UserRepository'
import type { IUser } from '../types/IUser.ts'
import { UserTable } from '../components/UserTable'
import { Button } from '../components/Button'
import styles from './UsersPage.module.css'

export function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = useCallback(async () => {
    try {
      const allUsers = await UserRepository.getAll()
      setUsers(allUsers)
    } catch (err) {
      console.error('Failed to load users:', err)
    }
  }, [])

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize the database
        await UserRepository.initialize()

        // Load seed data from JSON file
        const response = await fetch('/users.json')
        const data = await response.json()
        await UserRepository.seed(data.users)

        // Load all users
        await loadUsers()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize app')
        console.error('Failed to initialize app:', err)
      } finally {
        setLoading(false)
      }
    }

    initializeApp()
  }, [loadUsers])

  const handleEditUser = useCallback((user: IUser) => {
    alert(`TODO: Implement edit modal for ${user.firstName} ${user.lastName}`)
  }, [])

  const handleDeleteUser = useCallback(async (userId: string) => {
    // TODO: Show confirmation dialog, then delete
    const confirmed = window.confirm('Are you sure you want to delete this user?')
    if (confirmed) {
      try {
        await UserRepository.delete(userId)
        await loadUsers()
      } catch (err) {
        console.error('Failed to delete user:', err)
        alert('Failed to delete user')
      }
    }
  }, [loadUsers])

  const handleAddUser = useCallback(() => {
    // TODO: Open add user modal
    alert('TODO: Implement add user modal')
  }, [])

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <h1 className={styles.loadingTitle}>User Management</h1>
        <p className={styles.loadingText}>Loading users...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>User Management</h1>
        <p className={styles.errorText}>Error: {error}</p>
      </div>
    )
  }

  return (
    <div className={styles.page}>
        <div className={styles.header}>
          <i className={`fa-regular fa-circle-user ${styles.userIcon}`}></i>
          <div className={styles.title}>User Management System</div>
          <div className={styles.addUser}>
            <button>
              + Add User
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <UserTable
              users={users}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
          />
        </div>
    </div>
  )
}
