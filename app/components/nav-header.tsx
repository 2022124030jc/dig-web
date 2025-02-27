import Logo from './brand';

const NavItem = ({ text }: { text: string }) => (
  <div className="opacity-80 flex-col justify-start items-center">
    <div className="text-white text-base md:text-lg font-semibold font-['Inter'] hover:opacity-100 hover:underline cursor-pointer transition-opacity">
      {text}
    </div>
  </div>
);

const Header = () => {
  return (
    <header className="w-full py-4 md:py-8 flex flex-wrap justify-between items-center shrink-0">
      <Logo />

      <nav className="mt-0">
        <div className="flex flex-wrap items-center gap-6 md:gap-[50px]">
          <NavItem text="Pro" />
          <NavItem text="DIGIN" />
          <NavItem text="DINGSTOCK" />
          <NavItem text="CONTACT" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
