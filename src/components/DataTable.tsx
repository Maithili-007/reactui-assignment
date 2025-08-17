import React from 'react'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
}

type SortOrder = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyText = 'No data',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(null)
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortOrder) return data
    const arr = [...data]
    arr.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av == null && bv == null) return 0
      if (av == null) return sortOrder === 'asc' ? -1 : 1
      if (bv == null) return sortOrder === 'asc' ? 1 : -1
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortOrder === 'asc' ? av - bv : bv - av
      }
      const as = String(av).toLowerCase()
      const bs = String(bv).toLowerCase()
      return sortOrder === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
    return arr
  }, [data, sortKey, sortOrder])

  function toggleSort(key: keyof T) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortOrder('asc')
    } else {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'))
      if (sortOrder === null) setSortKey(null)
    }
  }

  function toggleRow(idx: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      onRowSelect?.(Array.from(next).map((i) => sorted[i]))
      return next
    })
  }

  function toggleAll() {
    if (selected.size === sorted.length) {
      setSelected(new Set())
      onRowSelect?.([])
    } else {
      const all = new Set(sorted.map((_, i) => i))
      setSelected(all)
      onRowSelect?.(sorted)
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
      <table className="min-w-full text-left">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th className="px-3 py-2">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size > 0 && selected.size === sorted.length}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isSorted = sortKey === col.dataIndex && sortOrder
              return (
                <th key={col.key} className="px-3 py-2 text-sm font-semibold">
                  {col.sortable ? (
                    <button
                      className="inline-flex items-center gap-1 hover:underline"
                      onClick={() => toggleSort(col.dataIndex)}
                      aria-label={`Sort by ${col.title}`}
                    >
                      <span>{col.title}</span>
                      <span aria-hidden="true">{isSorted === 'asc' ? '▲' : isSorted === 'desc' ? '▼' : ''}</span>
                    </button>
                  ) : (
                    col.title
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="px-3 py-4 text-sm text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                Loading...
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td className="px-3 py-8 text-center text-sm text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800">
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${idx + 1}`}
                      checked={selected.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-3 py-2 text-sm">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
