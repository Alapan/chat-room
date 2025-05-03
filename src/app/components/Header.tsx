import Image from 'next/image';

export const Header = () => {
  return (
    <header>
      <div className='flex flex-row justify-center text-6xl'>
        <span className='font-bold text-green'>Chat</span>
        <span className='font-light text-green pr-4'>Hub</span>
        <Image
          src='speech-bubble.svg'
          width={50}
          height={50}
          alt='Chat Hub Logo'
        />
      </div>
      <div className='flex flex-row justify-center text-2xl'>
        <span className='font-cursive text-green'>Chat anytime, for free.</span>
      </div>
    </header>
  )
};
