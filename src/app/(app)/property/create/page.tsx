// app/(app)/properties/create/page.tsx

// import AddEditProperty from '@/components/AddEditProperty';
"use client"
import dynamic from 'next/dynamic';
import LoginPageSkeleton from '@/components/LoginPageSkelaton';

const AddEditProperty = dynamic(() => import('@/components/AddEditProperty'), {
  ssr:false,
  loading: () => <LoginPageSkeleton />,
});
export default function CreatePropertyPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Property</h2>

      <AddEditProperty/>
    </div>
  );
}
