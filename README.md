# React Component Development Assignment – Solution

This repository implements two polished UI components using **React + TypeScript + TailwindCSS + Storybook** with a minimal Vite setup and unit tests via **Vitest + Testing Library**.

## Components

### 1) `InputField`
- Label, placeholder, helper text and error message
- States: `disabled`, `invalid`, `loading`
- Variants: `filled`, `outlined`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Optional: `clearable` button, `passwordToggle` for password visibility
- Light/Dark support (`dark` class)

### 2) `DataTable<T>`
- Display of tabular data
- Column sorting (asc/desc/none)
- Row selection (with Select All)
- Loading and empty states
- ARIA-friendly headers & checkboxes

## Quickstart
```bash
npm i
npm run dev       # Vite demo
npm run storybook # Storybook
npm test          # Unit tests
```

Dark mode: add `class="dark"` to `html` or `body`.

## Structure
```
src/
  components/
    InputField.tsx
    DataTable.tsx
    __tests__/
      InputField.test.tsx
      DataTable.test.tsx
  components/*.stories.tsx
  App.tsx
  index.css
  main.tsx
.storybook/
  main.ts
  preview.ts
```
