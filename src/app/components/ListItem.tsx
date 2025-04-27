interface ListItemProps {
  topic: string;
  description: string;
};

export const ListItem = ({
  topic,
  description,
}: ListItemProps) => {
  return (
    <div className='relative w-full min-h-24 bg-lime-200 hover:bg-green rounded-lg p-4 cursor-pointer'>
      <h2 className='text-xl font-bold text-center'>{topic}</h2>
      <div className='pt-2'>
        <p className='text-sm text-center font-normal px-2'>{description}</p>
      </div>
    </div>
  );
};
