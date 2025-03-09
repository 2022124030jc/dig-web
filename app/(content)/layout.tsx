import PageTransition from '../components/page-transition';
import SidebarNav from '../components/sidebar-nav';
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex pt-4 bg-black text-white gap-4 items-start h-full ">
      <div className="w-1/4 max-w-[480px] h-[calc(100vh-100px)]">
        <SidebarNav />
      </div>
      <PageTransition>
        <div className="flex-1 overflow-y-auto h-[calc(100vh-100px)] pb-30 no-scrollbar ">
          {children}
        </div>
      </PageTransition>
    </div>
  );
}
