// src/app/components/ClientAuthProvider.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState, setLoading } from '../state/slices/authSlice';

interface ClientAuthProviderProps {
    token: string | null;
}

export default function ClientAuthProvider({ token }: ClientAuthProviderProps) {
    const dispatch = useDispatch();

    useEffect(() => {
        // FIXME: authState should depend on both token and validity of the token
        dispatch(setAuthState(!!token));
        dispatch(setLoading(false));
    }, [token, dispatch]);

    return null;
}