import SidebarNav from '@/app/components/sidebar-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between w-full bg-black">
      <main className="h-screen w-full max-w-7xl flex overflow-hidden">
        {/* 左侧导航区域 - 占1/3宽度 */}
        <div className="w-1/3 max-w-xs border-r border-gray-800 overflow-y-auto">
          <SidebarNav />
        </div>

        {/* 右侧内容区域 - 占2/3宽度 */}
        <div className="flex-1 overflow-y-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
