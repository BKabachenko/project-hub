import { Menu } from 'lucide-react';

const MobileNav = async () => {
  return (
    <nav className={'flex cursor-pointer justify-center md:hidden'}>
      <div className='flex flex-row items-center'>
        <Menu size={18} />
        Menu
      </div>
    </nav>
  );
};

export default MobileNav;
