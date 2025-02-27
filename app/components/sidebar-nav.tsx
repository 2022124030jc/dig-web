'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 导航链接组件
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`block py-2 px-4 mb-2 transition-colors ${
        isActive
          ? 'text-white font-medium border-l-2 border-white pl-3'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

// 侧边栏导航组件
export default function SidebarNav() {
  return (
    <nav className="py-8">
      <h2 className="text-xl font-bold text-white mb-6">导航</h2>
      <div className="flex flex-col">
        <NavLink href="/creation">创作</NavLink>
        <NavLink href="/social-media">社交媒体</NavLink>
        <NavLink href="/visual-design">视觉设计</NavLink>
        <NavLink href="/photography">摄影</NavLink>
      </div>
    </nav>
  );
}
