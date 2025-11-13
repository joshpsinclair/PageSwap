import { useMemo, useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import type { IUser } from '../types/IUser.ts'
import { UserAvatar } from './UserAvatar'
import { Button } from './Button'
import styles from './UserTable.module.css'

interface UserTableProps {
  users: IUser[]
  onEditUser?: (user: IUser) => void
  onDeleteUser?: (userId: string) => void
}

const columnHelper = createColumnHelper<IUser>()

/**
 * UserTable - Data table for displaying and managing users
 *
 * Built with TanStack Table for sorting, filtering, and pagination support.
 * Integrates with UserAvatar for image loading with simulated network delay.
 *
 * Features:
 * - Column sorting
 * - Handles missing data (firstName, lastName, age)
 * - Avatar loading states
 * - Action handlers for edit/delete
 *
 * TODO for candidates:
 * - Add proper styling to match design.png
 * - Implement search/filter UI
 * - Add pagination if needed
 * - Style the table headers and rows
 * - Add hover states and interactions
 */
export function UserTable({ users, onEditUser, onDeleteUser }: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns = useMemo(
    () => [
      columnHelper.accessor((row, index) => index, {
        id: 'index',
        header: (context) => {
          const sortState = context.column.getIsSorted()
          let iconClass = 'fa-solid fa-sort'
          if (sortState === 'asc') iconClass = `fa-solid fa-sort-up ${styles.active}`
          if (sortState === 'desc') iconClass = `fa-solid fa-sort-down ${styles.active}`

          return (
            <div className={styles.indexHeader}>
              <span>#</span>
              <i className={iconClass}></i>
            </div>
          )
        },
        cell: (info) => (
          <div className={styles.indexCell}>{info.row.index + 1}</div>
        ),
        sortingFn: 'basic',
      }),
      columnHelper.accessor(
        (row) => `${row.firstName || ''} ${row.lastName || ''}`.trim() || '(No name)',
        {
          id: 'fullName',
          header: (context) => {
            const sortState = context.column.getIsSorted()
            let iconClass = 'fa-solid fa-sort'
            if (sortState === 'asc') iconClass = `fa-solid fa-sort-up ${styles.active}`
            if (sortState === 'desc') iconClass = `fa-solid fa-sort-down ${styles.active}`

            return (
              <div className={styles.nameHeader}>
                <span>Name</span>
                <i className={iconClass}></i>
              </div>
            )
          },
          cell: (info) => {
            const user = info.row.original
            const firstName = user.firstName || ''
            const lastName = user.lastName || ''
            const fullName = `${firstName} ${lastName}`.trim()

            return (
                <div className={styles.nameColumn}>
                  <UserAvatar
                      avatarId={user.profileImageUrl}
                      firstName={firstName}
                      lastName={lastName}
                      size={28}
                  />
                  <span className={styles.fullName}>{fullName ? fullName : '-'}</span>
                </div>
            )
          },
          sortingFn: 'text',
        }
      ),
      columnHelper.accessor('age', {
        id: 'age',
        header: (context) => {
          const sortState = context.column.getIsSorted()
          let iconClass = 'fa-solid fa-sort'
          if (sortState === 'asc') iconClass = `fa-solid fa-sort-up ${styles.active}`
          if (sortState === 'desc') iconClass = `fa-solid fa-sort-down ${styles.active}`

          return (
            <div className={styles.ageHeader}>
              <span>Age</span>
              <i className={iconClass}></i>
            </div>
          )
        },
        cell: (info) => {
          const age = info.getValue()
          return age !== undefined ? (
            <span className={styles.ageCell}>{age}</span>
          ) : (
            <span>-</span>
          )
        },
        sortingFn: 'basic',
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Row Control',
        cell: (info) => (
          <div className={styles.actions}>
            {onDeleteUser && (
              <Button
                variant="danger"
                onClick={() => onDeleteUser(info.row.original.id)}
                icon={<i className="fa-solid fa-trash"></i>}
              >
                Remove
              </Button>
            )}
          </div>
        ),
      }),
    ],
    [onEditUser, onDeleteUser]
  )

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })
    
    const headerCellStyleForId = (id: string) => {
      if (id === "index") return styles.indexColumn;
      if (id === "fullName") return styles.nameColumn;
      if (id === "age") return styles.ageColumn;
      if (id === "actions") return styles.actionsColumn;
      return ''
    }

  const cellStyleForId = (id: string) => {
    if (id === "index") return styles.indexColumn;
    if (id === "age") return styles.ageColumn;
    if (id === "actions") return styles.actionsColumn;
    return ''
  }
    
    return (
    <div className={styles.tableContainer}>
      {/* TODO: Add search/filter UI here */}
    
      <table className={styles.table}>
        <thead className={styles.thead}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`${styles.th} ${header.column.getCanSort() ? styles.sortable : ''} ${headerCellStyleForId(header.column.id)}`}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.tr}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`${styles.td} ${cellStyleForId(cell.column.id)}`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
    </div>
    )
}
