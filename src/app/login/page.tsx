'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';

export default function Login() {
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ error, setError ] = useState<string | null>(null);
  const router = useRouter();

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
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
        //router.push('/chatrooms'); /*Uncomment this to proceed to chatrooms list until register page is implemented*/
        return false;
      }
      const data = await response.json();
      setError('');
      console.log('Logged in successfully: ', data.token);
      router.push('/chatrooms');
    } catch (error) {
      setError((error as any).message);
      return false;
    }
  };

  return (
    <form className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full max-w-lg min-w-sm'>
        <InputField
          label='Email'
          onChange={onChangeEmail}
          value={email}
          type='email'
        />
      </div>
      <div className='w-full max-w-lg min-w-sm'>
        <InputField
          label='Password'
          onChange={onChangePassword}
          value={password}
          type='password'
        />
      </div>
      {error && (
        <div className='w-full max-w-lg mt-4 mx-auto min-w-sm text-red-500 text-center'>{error}</div>
      )}
      <div className='m-auto mt-4 p-4 w-full max-w-sm'>
        <Button
          label='View chatrooms'
          onClick={handleLogin}
        />
      </div>
    </form>
  );
};
