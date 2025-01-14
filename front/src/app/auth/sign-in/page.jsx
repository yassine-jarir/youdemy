import * as React from 'react';

import { config } from '@/config';
import { Layout } from '@/components/auth/layout';
import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata = { title: `Sign in | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <Layout>
      {/* <GuestGuard> */}
      <SignInForm />
      {/* </GuestGuard> */}
    </Layout>
  );
}
