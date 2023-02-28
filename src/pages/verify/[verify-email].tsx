import VerifyToken from '@/components/VerifyToken';
import { useRouter } from 'next/router';
import React from 'react';

const VerifyEmail = () => {
  const [count, setCount] = React.useState(0);
  const router = useRouter();
  const { token, email } = router.query;

  if (!email && !token) {
    return (
      <div className="grid place-items-center h-screen">
        Verifying Account.....
      </div>
    );
  }
  return (
    <>
      <VerifyToken token={token} email={email} />
    </>
  );
};

export default VerifyEmail;
