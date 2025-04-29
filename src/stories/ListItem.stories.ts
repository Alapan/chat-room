import { Meta, StoryObj } from '@storybook/react';

import { ListItem } from '@/app/components/ListItem';

export default {
  title: 'Components/ListItem',
  component: ListItem,
  tags: ['autodocs'],
  argTypes: {
    topic: {
      control: 'text',
      description: 'The topic of the list item',
      defaultValue: 'Sample topic',
    },
    description: {
      control: 'text',
      description: 'The description of the list item',
      defaultValue: 'Sample description',
    },
  } as Meta
};

type Story = StoryObj<typeof ListItem>;
type ListItemProps = React.ComponentProps<typeof ListItem>;

export const Default: Story = {
  args: {
    topic: 'Sample topic',
    description: 'Sample description',
  } as ListItemProps,
};

export const LongTopic: Story = {
  args: {
    topic: 'This is a very long topic that should be truncated',
    description: 'Sample description',
  } as ListItemProps,
};

export const LongDescription: Story = {
  args: {
    topic: 'Sample topic',
    description:
      'This is a very long description that should be truncated when it exceeds the maximum width of the container. This is a very long description that should be truncated when it exceeds the maximum width of the container.',
  } as ListItemProps,
};
