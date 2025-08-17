import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable, Column } from './DataTable';

type User = { id: number; name: string; email: string; role: string };

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@site.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@site.com', role: 'User' },
  { id: 3, name: 'Cara', email: 'cara@site.com', role: 'User' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role' },
];

const meta: Meta<typeof DataTable<any>> = {
  title: 'Components/DataTable',
  component: DataTable as any,
  tags: ['autodocs'],
  args: { data, columns, selectable: true },
}
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Basic: Story = {};
export const Empty: Story = { args: { data: [] } };
export const Loading: Story = { args: { loading: true } };
