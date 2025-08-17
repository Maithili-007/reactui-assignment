import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react'
import { InputField, InputFieldProps } from './InputField'

const meta: Meta<InputFieldProps> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    variant: 'outlined',
    size: 'md',
    value: '',
    helperText: 'Helpful hint goes here',
    invalid: false,
    loading: false,
    disabled: false,
  },
  argTypes: { onChange: { action: 'changed' } }
}
export default meta
type Story = StoryObj<InputFieldProps>

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />
  }
}

export const Variants: Story = {
  render: (args) => {
    const [v1, s1] = useState('')
    const [v2, s2] = useState('')
    const [v3, s3] = useState('')
    return (
      <div className="space-y-3 max-w-md">
        <InputField {...args} label="Outlined" variant="outlined" value={v1} onChange={(e)=>s1(e.target.value)} />
        <InputField {...args} label="Filled" variant="filled" value={v2} onChange={(e)=>s2(e.target.value)} />
        <InputField {...args} label="Ghost" variant="ghost" value={v3} onChange={(e)=>s3(e.target.value)} />
      </div>
    )
  }
}

export const Password: Story = {
  args: { type: 'password', passwordToggle: true },
  render: (args) => {
    const [value, setValue] = useState('')
    return <InputField {...args} value={value} onChange={(e)=>setValue(e.target.value)} />
  }
}
