"use client"
// import Dashboard from '@/components/Dashboard';
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const Dashboard = dynamic(() => import('@/components/Dashboard'), {
  ssr:false,
  loading: () => <LoginPageSkeleton />,
});
export default function DashboardPage() {
  return (
    <div className="p-6">

      <Dashboard/>
    </div>
  );
}
