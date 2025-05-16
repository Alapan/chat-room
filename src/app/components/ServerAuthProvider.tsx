// src/app/components/ServerAuthProvider.tsx
import { cookies } from 'next/headers';
import ClientAuthProvider from './ClientAuthProvider';

export default async function ServerAuthProvider() {
    // TODO: the cookie expiry time to be checked and passed to the client
    const token = (await cookies()).get('token')?.value || null;

    return <ClientAuthProvider token={token} />;
}