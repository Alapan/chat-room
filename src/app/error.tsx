'use client';

export default function Error({
  error,
  reset,
}: Readonly<{
  error: Error;
  reset: () => void;
}>) {
  return (
    <div className='flex flex-col items-center justify-center h-screen font-bold text-2xl text-red-500'>
      <div className="text-center text-red-500">{error.message}</div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
