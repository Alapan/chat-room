import Image from 'next/image';
import { ChatRoom } from '../types';
import styles from './styles/ChatRoomList.module.css';

interface ChatRoomListProps {
  rooms: ChatRoom[]
};

const ChatRoomList = ({ rooms }: ChatRoomListProps) => {
  return (
    <div className={styles.chatRoomList}>
      {rooms.map(({ topic, description, image }) => (
        <div className={styles.chatRoomListItem} key={topic}>
          <div className={styles.iconContainer}>
            <Image
              src={`/${image}.svg`}
              alt=''
              width={40}
              height={40}
            />
          </div>
          <div className={styles.topicContainer}>
            <div className={styles.topic}>{topic}</div>
            <small>{description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
