import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import UserAccountMenu from './UserAccountMenu';
import AuthLinks from './AuthLinks';

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.user);
  return (
    <nav className="p-3 bg-white z-10 fixed w-full shadow-sm">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/agric_zone_logo.png"
            width={70}
            height={70}
            alt="agric zone logo"
          />
        </Link>
        {user ? <UserAccountMenu /> : <AuthLinks />}
      </div>
    </nav>
  );
};

export default Navbar;
