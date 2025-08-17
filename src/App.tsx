import React, { useState } from 'react'
import { InputField } from './components/InputField'
import { DataTable, Column } from './components/DataTable'

type User = { id: number; name: string; email: string; role: string }

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
]

const initial: User[] = [
  { id: 1, name: 'Aidan', email: 'aidan@example.com', role: 'Admin' },
  { id: 2, name: 'Bea', email: 'bea@example.com', role: 'User' },
  { id: 3, name: 'Chin', email: 'chin@example.com', role: 'User' },
]

export default function App() {
  const [value, setValue] = useState('')
  const [data] = useState<User[]>(initial)

  return (
    <div className="min-h-screen p-6 space-y-8">
      <header><h1 className="text-2xl font-bold">UI Components Demo</h1></header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">InputField</h2>
        <div className="max-w-md space-y-3">
          <InputField
            label="Name"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder="Enter your name"
            helperText="This is a helper text"
            variant="outlined"
            size="md"
            clearable
          />
          <InputField
            label="Password"
            type="password"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder="••••••••"
            variant="filled"
            size="md"
            passwordToggle
          />
          <InputField
            label="Loading example"
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            placeholder="Loading..."
            loading
            variant="ghost"
            size="sm"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">DataTable</h2>
        <DataTable data={data} columns={columns} selectable onRowSelect={(rows)=>console.log(rows)} />
      </section>
    </div>
  )
}
