
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const LoginPage = dynamic(() => import('@/components/LoginPage'), {
  loading: () => <LoginPageSkeleton />,
});
export default function Login() {
  return (
    <div className="p-6">

      <LoginPage/>
    </div>
  );
}

