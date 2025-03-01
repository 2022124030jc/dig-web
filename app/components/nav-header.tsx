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
    </header>
  );
};

export default Header;
