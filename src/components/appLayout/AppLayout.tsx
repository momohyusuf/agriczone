import { updateAlert } from '@/features/global/globalSlice';
import { RootState } from '@/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../homepage/navbar/Navbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const alert = useSelector((state: RootState) => state.global.alert);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(
        updateAlert({
          message: '',
          status: 'success',
          isShown: false,
        })
      );
    }, 3000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [alert.isShown]);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AppLayout;
