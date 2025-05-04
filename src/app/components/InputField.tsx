interface InputFieldProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
}

export const InputField = ({
  label,
  onChange,
  value,
  type = 'text',
}: InputFieldProps) => {

  return (
    <div className='flex flex-col items-center justify-center w-3/4 mx-auto mt-4'>
      <input
        type={type}
        placeholder={label}
        value={value}
        className='w-full p-2 border border-green rounded-md focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent'
        aria-label={`${label} input field`}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )  
};
