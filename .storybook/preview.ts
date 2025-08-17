import type { Preview } from '@storybook/react';
import '../src/index.css';
const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    actions: { argTypesRegex: '^on.*' },
  },
};
export default preview;
