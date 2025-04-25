import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  topic: string;
  description: string;
};

export const ListItem = ({
  topic,
  description,
}: ListItemProps) => {
  return (
    <div className='relative w-full h-24 bg-lime-300 hover:bg-lime-400 rounded-lg p-4 grid grid-cols-10'>
      <div className='col-span-9'>
        <h2 className='text-xl font-bold text-center'>{topic}</h2>
        <div className='pt-2'>
          <p className='text-sm text-center font-regular px-2'>{description}</p>
        </div>
      </div>

      <div className='col-span-1 absolute top-1/2 right-4 -translate-y-1/2'>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
};
