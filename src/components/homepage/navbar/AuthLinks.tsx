import React from 'react';

import { Button } from '@mui/material';
import Link from 'next/link';
const AuthLinks = () => {
  return (
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
  );
};

export default AuthLinks;
