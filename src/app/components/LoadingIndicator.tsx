interface LoadingIndicatorProps {
  isLoading: boolean;
  loadingText: string;  
};

export const LoadingIndicator = ({
  isLoading,
  loadingText,
}: LoadingIndicatorProps) => {
  return (
    <>
      {isLoading && (
        <div className='w-full max-w-lg mt-4 mx-auto min-w-sm text-center'>
          {loadingText}
        </div>
      )}
    </>
  )
};
