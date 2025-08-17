import React from 'react'
import { twMerge } from 'tailwind-merge'
import clsx from 'clsx'

export type InputVariant = 'filled' | 'outlined' | 'ghost'
export type InputSize = 'sm' | 'md' | 'lg'

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'value'> {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: InputVariant
  size?: InputSize
  loading?: boolean
  clearable?: boolean
  passwordToggle?: boolean
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = 'outlined',
    size = 'md',
    loading = false,
    clearable = false,
    passwordToggle = false,
    type = 'text',
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || React.useId()
  const describedByIds: string[] = []
  if (helperText) describedByIds.push(`${inputId}-help`)
  if (invalid && errorMessage) describedByIds.push(`${inputId}-error`)

  const sizeClasses = {
    sm: 'text-sm px-2 py-1 rounded-md',
    md: 'text-base px-3 py-2 rounded-lg',
    lg: 'text-lg px-4 py-3 rounded-xl',
  }[size]

  const baseInput =
    'w-full outline-none bg-transparent placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-60'

  const variantClasses = {
    filled: 'bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900',
    outlined: 'border border-gray-300 dark:border-gray-700 focus:border-blue-500',
    ghost: 'border border-transparent focus:border-blue-500',
  }[variant]

  const wrapper = 'relative flex items-center gap-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
  const invalidRing = invalid ? 'ring-2 ring-red-500' : ''

  const isPassword = (type ?? 'text') === 'password'
  const [reveal, setReveal] = React.useState(false)
  const effectiveType = passwordToggle && isPassword ? (reveal ? 'text' : 'password') : type

  return (
    <div className={clsx('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium">{label}</label>
      )}
      <div className={twMerge(wrapper, sizeClasses, variantClasses, invalidRing)}>
        {loading && <span className="spinner" aria-hidden="true" />}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={invalid || undefined}
          aria-describedby={describedByIds.join(' ') || undefined}
          className={twMerge(baseInput, 'flex-1')}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          type={effectiveType}
          {...rest}
        />
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            onClick={() => onChange({ target: { value: '' } } as any)}
            aria-label="Clear input"
            className="px-2 text-sm hover:underline"
          >
            Clear
          </button>
        )}
        {passwordToggle && isPassword && (
          <button
            type="button"
            aria-label={reveal ? 'Hide password' : 'Show password'}
            onClick={() => setReveal((p) => !p)}
            className="px-2 text-sm hover:underline"
          >
            {reveal ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {helperText && (
        <p id={`${inputId}-help`} className="mt-1 text-xs text-gray-600 dark:text-gray-400">{helperText}</p>
      )}
      {invalid && errorMessage && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  )
})
