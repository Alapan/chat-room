import { Story, StoryDefault } from '@ladle/react';
import ChatRoomList from '@/app/components/ChatRoomList';
import { ComponentProps } from 'react';

const meta: StoryDefault<typeof ChatRoomList> = {
  title: 'Components/ChatRoomList'
};

export default meta;

type TProps = ComponentProps<typeof ChatRoomList>;

export const Default: Story<TProps> = (props) => <ChatRoomList {...props}/>;

Default.args = {
  rooms: [
    {
      topic: 'Sports',
      description: 'All about sports',
      image: 'sports',
    },
    {
      topic: 'Movies',
      description: 'Let\'s talk cinema!',
      image: 'movie',
    },
  ]
};
