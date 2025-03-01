import SidebarNav from '../components/sidebar-nav';

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pt-4 bg-black text-white gap-4 items-start">
      <div className="w-1/4 max-w-[480px]">
        <SidebarNav />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
