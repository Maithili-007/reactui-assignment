import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { InputField } from '../InputField'
//import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'


test('shows error message when invalid', () => {
  const onChange = vi.fn()
  render(<InputField value="abc" onChange={onChange} label="Email" errorMessage="Invalid" invalid />)
  expect(screen.getByText('Invalid')).toBeInTheDocument()
  const input = screen.getByLabelText('Email') as HTMLInputElement
  expect(input.getAttribute('aria-invalid')).toBe('true')
})

test('clear button empties value', () => {
  function Wrapper() {
    const [val, setVal] = React.useState('hello')
    return <InputField value={val} onChange={(e)=>setVal(e.target.value)} clearable aria-label="input" />
  }
  render(<Wrapper />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  expect(input.value).toBe('hello')
  const btn = screen.getByRole('button', { name: /clear input/i })
  fireEvent.click(btn)
  expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('')
})

test('password toggle works', () => {
  function Wrapper() {
    const [val, setVal] = React.useState('secret')
    return <InputField value={val} onChange={(e)=>setVal(e.target.value)} type="password" passwordToggle />
  }
  render(<Wrapper />)
  const toggle = screen.getByRole('button', { name: /show password/i })
  fireEvent.click(toggle)
  const input = screen.getByRole('textbox') as HTMLInputElement
  expect(input.type).toBe('text')
})
