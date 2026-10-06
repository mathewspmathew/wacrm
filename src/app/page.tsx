import { redirect } from 'next/navigation';

export default async function RootPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const code = typeof params.code === 'string' ? params.code : undefined;
  const tokenHash =
    typeof params.token_hash === 'string' ? params.token_hash : undefined;
  const error = typeof params.error === 'string' ? params.error : undefined;
  const errorCode =
    typeof params.error_code === 'string' ? params.error_code : undefined;
  const type = typeof params.type === 'string' ? params.type : undefined;

  // When Supabase's Site URL is http://localhost:3000 (the root path),
  // confirmation and password recovery links land here with credentials or errors.
  // Forward them to /auth/callback so the session is properly exchanged.
  if (code || tokenHash || error || errorCode) {
    const sp = new URLSearchParams();
    for (const [key, val] of Object.entries(params)) {
      if (typeof val === 'string') {
        sp.set(key, val);
      } else if (Array.isArray(val)) {
        for (const v of val) sp.append(key, v);
      }
    }
    if (type === 'recovery' && !sp.has('next')) {
      sp.set('next', '/reset-password');
    }
    redirect(`/auth/callback?${sp.toString()}`);
  }

  redirect('/dashboard');
}

