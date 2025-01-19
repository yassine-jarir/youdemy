import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const authRoutes = ['/auth/sign-in', '/auth/sign-up'];
  const adminRoutes = ['/dashboard', '/dashboard/usersManange', '/dashboard/teacherManage', '/dashboard/ContenusManage'];
   const studentRoutes = ['/client/student'];
  const teacherRoutes = ['/client/teacher'];
  const client = ['/client'];

  try {
    const userCookie = req.cookies.get('user');

     if (!userCookie && [...adminRoutes, ...studentRoutes, ...teacherRoutes,...client].some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    if (userCookie) {
      const userData = JSON.parse(userCookie.value);

 
      if (authRoutes.includes(pathname)) {
        let redirectUrl = '/';  
        if (userData.role === 'admin') {
          redirectUrl = '/dashboard'; 
        } else if (userData.role === 'teacher') {
          redirectUrl = '/client/teacher';
        } else if (userData.role === 'student') {
          redirectUrl = '/client/student';
        }
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }
      if (client.includes(pathname)) {
        let redirectUrl = '/client';  
        if (userData.role === 'student') {
          redirectUrl = '/client/student'; 
        } else if (userData.role === 'teacher') {
          redirectUrl = '/client/teacher';
        }  
        return NextResponse.redirect(new URL(redirectUrl, req.url));
      }

 
      if (userData.role === 'admin' && (teacherRoutes.some(route => pathname.startsWith(route)) || studentRoutes.some(route => pathname.startsWith(route)))) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
      if (userData.role === 'admin' && (teacherRoutes.some(route => pathname.startsWith(route)) || studentRoutes.some(route => pathname.startsWith(route)))) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      if (userData.role === 'teacher' && (adminRoutes.some(route => pathname.startsWith(route)) || studentRoutes.some(route => pathname.startsWith(route)))) {
        return NextResponse.redirect(new URL('/client/teacher', req.url));
      }

      if (userData.role === 'student' && (adminRoutes.some(route => pathname.startsWith(route)) || teacherRoutes.some(route => pathname.startsWith(route)))) {
        return NextResponse.redirect(new URL('/client/student', req.url));
      }
    }

     return NextResponse.next();
  } catch (error) {
    console.error('Middleware Error:', error);
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth/sign-in',
    '/auth/sign-up',
    '/client/:path*',
    '/client/teacher',
    '/client/student'
  ],
};