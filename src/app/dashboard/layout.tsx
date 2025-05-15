// src/app/main-layout/layout.tsx

import TopNavbar from '@/components/TopNavbar';
import RightSidebar from '@/components/RightSidebar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      
      <TopNavbar />
      <div >
        <main >{children}</main>
        <RightSidebar />
      </div>
    </div>
  );
}
