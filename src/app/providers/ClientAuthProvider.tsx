'use client';

import { useEffect } from 'react';
import { setAuthState, setLoading } from '../state/slices/authSlice';
import { useAppDispatch } from '../state/hooks';

interface ClientAuthProviderProps {
  token: string | null;
}

export default function ClientAuthProvider({ token }: ClientAuthProviderProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAuthState(!!token));
    dispatch(setLoading(false));
  }, [token, dispatch]);

  return null;
}
