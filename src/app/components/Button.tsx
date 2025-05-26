import { ReactNode } from 'react';

interface ButtonProps {
  buttonColor?: string;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  buttonColor = '--color-green',
  children,
  className = '',
  isDisabled = false,
  onClick,
}: ButtonProps) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick(e);
  }

  return (
    <button
      className={`flex flex-col justify-center m-auto p-4 w-full h-10 border font-bold rounded-md border border-none ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      style={{ backgroundColor: `var(${buttonColor})` }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
