import { Meta, StoryObj } from '@storybook/react';
import { InputField } from '@/app/components/InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the input field',
    },
    onChange: {
      action: 'changed',
      description: 'Function to call when the input value changes',
    },
    value: {
      control: 'text',
      description: 'Value of the input field',
    }
  }
} as Meta<typeof InputField>;

type Story = StoryObj<typeof InputField>;
type InputFieldProps = React.ComponentProps<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Input Field',
    value: '',
    onChange: (value: string) => console.log('Input changed:', value),
  } as InputFieldProps,
} as Story;
