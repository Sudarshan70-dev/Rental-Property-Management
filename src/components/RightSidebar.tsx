// src/components/LeftSidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HouseIcon from '@mui/icons-material/House';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

const links = [
  { href: '/dashboard', label: 'Dashboard', icon: DashboardIcon },
  { href: '/property', label: 'Properties', icon: HouseIcon },
  { href: '/rent-history', label: 'Rent History', icon: WorkHistoryIcon },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#141A39] p-6 text-white shadow-lg">
      <nav className="flex flex-col gap-2">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-[#246BFD] text-white font-semibold'
                  : 'text-white/70 hover:bg-white/10'
              }`}
            >
              <div
                className={`p-2 rounded-md ${
                  isActive ? 'bg-white/20' : 'bg-white/10'
                }`}
              >
                <Icon className="text-white" fontSize="small" />
              </div>
              <span className="text-sm">{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
