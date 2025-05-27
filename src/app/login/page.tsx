'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { loginSchema } from '../common/loginSchema';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';
import { hasFieldError } from '../utils/helpers';
import { useAppDispatch } from '../state/hooks';
import { setAuthState } from '../state/slices/authSlice';

export default function Login() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ error, setError ] = useState<string>('');
  const [ errorFields, setErrorFields ] = useState<string[]>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      const errors = result.error.errors.map(
        (error, i) => `${i + 1}. ${error.message}`
      ).join('\n');

      setError(errors);
      setErrorFields(Object.keys(result.error.formErrors.fieldErrors));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Error logging in! Please check your credentials and try again.');
        setErrorFields([]);
        return false;
      }

      setEmail('');
      setPassword('');
      setError('');
      setErrorFields([]);
      dispatch(setAuthState(true));
      router.push('/chatrooms');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className='flex flex-col items-center justify-center h-screen mt-10'>
      <div className='flex flex-row justify-center text-2xl mt-2'>
        <span className='font-bold'>Login</span>
      </div>
      <div className='w-full max-w-lg min-w-md'>
        <InputField
          label='Email'
          onChange={(value: string) => setEmail(value)}
          value={email}
          type='email'
          hasError={hasFieldError('email', errorFields)}
        />
      </div>
      <div className='w-full max-w-lg min-w-md'>
        <InputField
          label='Password'
          onChange={(value: string) => setPassword(value)}
          value={password}
          type='password'
          hasError={hasFieldError('password', errorFields)}
        />
      </div>
      <LoadingIndicator isLoading={isLoading} loadingText='Logging you in ...' />
      <ErrorMessage error={error} />
      <div className='m-auto mt-4 p-4 w-full max-w-sm'>
        <Button
          label='View chatrooms'
          onClick={handleLogin}
        />
      </div>
    </form>
  );
};
