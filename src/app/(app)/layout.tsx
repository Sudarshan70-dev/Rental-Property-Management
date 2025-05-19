// src/app/main-layout/layout.tsx

import TopNavbar from '@/components/TopNavbar';
import Sidebar from '@/components/RightSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100" >
      
      <TopNavbar />
      <div className="flex flex-1">
        <Sidebar/>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
