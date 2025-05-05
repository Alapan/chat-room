interface InputFieldProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
  hasError?: boolean;
}

export const InputField = ({
  label,
  onChange,
  value,
  type = 'text',
  hasError = false
}: InputFieldProps) => {
  const baseClasses = 'w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent';
  const conditionalClasses = hasError ? 'border-red-500 focus:ring-red-500' : 'border-green focus:ring-green';
  return (
    <div className='flex flex-col items-center justify-center w-3/4 mx-auto mt-4'>
      <input
        type={type}
        placeholder={label}
        value={value}
        className={`${baseClasses} ${conditionalClasses}`}
        aria-label={`${label} input field`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )  
};
