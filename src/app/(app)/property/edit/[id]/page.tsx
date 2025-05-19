
// import EditPropertyPage from '@/components/EditProperty';
"use client"
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const EditPropertyPage = dynamic(() => import('@/components/EditProperty'), {
  ssr:false,
  loading: () => <LoginPageSkeleton />,
});
export default function EditProperty() {
  return (
    <div className="p-6">

      <EditPropertyPage/>
    </div>
  );
}
