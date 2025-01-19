export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    // account: '/dashboard/account',
    teacherManage: '/dashboard/teacherManage',
    ContenusManage: '/dashboard/ContenusManage',
    usersManage: '/dashboard/usersManage',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
