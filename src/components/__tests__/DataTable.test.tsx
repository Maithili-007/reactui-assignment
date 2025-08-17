import { render, screen, fireEvent, within } from '@testing-library/react'
import React from 'react'
import { DataTable, Column } from '../DataTable'
//import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'


type User = { id: number; name: string; email: string }
const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
]

const data: User[] = [
  { id: 1, name: 'Charlie', email: 'c@c.com' },
  { id: 2, name: 'Alice', email: 'a@a.com' },
]

test('sort toggles asc/desc', () => {
  render(<DataTable data={data} columns={columns} />)
  const header = screen.getByRole('button', { name: /sort by name/i })
  fireEvent.click(header) // asc
  let rows = screen.getAllByRole('row')
  let firstDataCell = within(rows[1]).getAllByRole('cell')[0]
  expect(firstDataCell.textContent).toBe('Alice')
  fireEvent.click(header) // desc
  rows = screen.getAllByRole('row')
  firstDataCell = within(rows[1]).getAllByRole('cell')[0]
  expect(firstDataCell.textContent).toBe('Charlie')
})

test('selectable rows', () => {
  const onSelect = vi.fn()
  render(<DataTable data={data} columns={columns} selectable onRowSelect={onSelect} />)
  const checkbox = screen.getAllByRole('checkbox')[1]
  fireEvent.click(checkbox)
  expect(onSelect).toHaveBeenCalled()
})
