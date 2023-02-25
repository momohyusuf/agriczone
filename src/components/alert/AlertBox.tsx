import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const AlertBox = () => {
  const alert = useSelector((state: RootState) => state.global.alert);
  return (
    <div className="fixed z-20 top-20 w-full slideInDown max-w-xl">
      {
        // @ts-ignore
      }

      <Alert severity={alert.status}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.message}
      </Alert>
    </div>
  );
};

export default AlertBox;
