"use client"
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const LoginPage = dynamic(() => import('@/components/LoginPage'), {
  ssr:false,
  loading: () => <LoginPageSkeleton />,
});
export default function Login() {
  return (
    <div className="hw100">

      <LoginPage/>
    </div>
  );
}

