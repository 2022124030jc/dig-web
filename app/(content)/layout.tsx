import PageTransition from '../components/page-transition';
import SidebarNav from '../components/sidebar-nav';
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full pt-4 bg-black text-white gap-4 items-start h-full overflow-hidden  ">
      <div className=" min-w-[300px] max-w-[500px] h-[calc(100vh-100px)] w-1/3">
        <SidebarNav />
      </div>
      <PageTransition>
        <div className="flex-1 overflow-y-auto h-[calc(100vh-100px)] pb-8 no-scrollbar max-w-[1200px] mx-auto ">
          {children}
        </div>
      </PageTransition>
    </div>
  );
}
