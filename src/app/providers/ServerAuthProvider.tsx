import { cookies } from 'next/headers';
import ClientAuthProvider from './ClientAuthProvider';

export default async function ServerAuthProvider() {
  const tokenCookie = (await cookies()).get('token')?.value || null;

  if (!tokenCookie) {
    return <ClientAuthProvider token={null} />;
  }

  const { token, expiry } = JSON.parse(tokenCookie);
  const isExpired = Date.now() > expiry;

  return <ClientAuthProvider token={isExpired ? null : token} />;
}
