'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { loginSchema } from '../common/loginSchema';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { ErrorMessage } from '../components/ErrorMessage';

export default function Login() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ error, setError ] = useState<string>('');
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const router = useRouter();

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

      if (!response.ok) {
        setError('Error logging in! Please check your credentials and try again.');
        return false;
      }
      const data = await response.json();
      setError('');
      console.log('Logged in successfully: ', data.token);
      router.push('/chatrooms');
    } catch (error) {
      setError((error as any).message);
      return false;
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
        />
      </div>
      <div className='w-full max-w-lg min-w-md'>
        <InputField
          label='Password'
          onChange={(value: string) => setPassword(value)}
          value={password}
          type='password'
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
