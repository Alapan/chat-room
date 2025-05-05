import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/app/components/Button';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Button label'
    },
    onClick: {
      action: 'clicked',
      description: 'Function to call when the button is clicked',
    },
  }
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;
type ButtonProps = ComponentProps<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Label 1',
    onClick: () => console.log('Clicked!')
  } as ButtonProps,
};

export const CustomColor: Story = {
  args: {
    label: 'Label 1',
    onClick: () => console.log('Clicked!'),
    buttonColor: 'bg-blue-500 text-white',
  } as ButtonProps,
};

export const Disabled: Story = {
  args: {
    label: 'Label 1',
    onClick: () => console.log('Clicked!'),
    buttonColor: 'bg-blue-500 text-white',
    isDisabled: true,
  } as ButtonProps
};
