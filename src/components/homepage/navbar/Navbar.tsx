import { Button } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="p-2 bg-white z-10 fixed w-full shadow-md">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/agric_zone_logo.png"
            width={70}
            height={70}
            alt="agric zone logo"
          />
        </Link>
        <Link href="/sign-in">
          <Button color="success" variant="outlined">
            Sign in
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
