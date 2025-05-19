"use client"
// import RegisterPage from '@/components/RegisterPage';
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const RegisterPage = dynamic(() => import('@/components/RegisterPage'), {
  ssr:false,
  loading: () => <LoginPageSkeleton />,
});
export default function CreatePropertyPage() {
  return (
    <div className="p-6">

      <RegisterPage/>
    </div>
  );
}
