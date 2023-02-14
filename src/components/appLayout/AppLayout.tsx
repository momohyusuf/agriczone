import React from 'react';
import Navbar from '../homepage/navbar/Navbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

export default AppLayout;
