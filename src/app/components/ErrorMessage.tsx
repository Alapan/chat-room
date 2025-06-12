interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      {error && (
        <pre className="w-full max-w-lg mt-4 mx-auto min-w-sm text-red-500 text-center whitespace-pre-wrap">
          {error}
        </pre>
      )}
    </>
  );
};
