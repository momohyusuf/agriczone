import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="p-2 bg-white z-10 fixed w-full shadow-sm">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/agric_zone_logo.png"
            width={70}
            height={70}
            alt="agric zone logo"
          />
        </Link>
        <div className="space-x-2">
          <Link href="/sign-up" className="font-medium">
            <Button
              color="success"
              className="text-slate-800 font-medium py-3 transition-all duration-500 rounded-3xl px-6 capitalize tracking-wider"
              variant="text"
            >
              Join now
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              color="success"
              className=" font-medium py-3 transition-all duration-500 rounded-3xl tracking-wider px-6 capitalize"
              variant="outlined"
            >
              Sign in
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
