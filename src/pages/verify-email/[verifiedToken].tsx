import { useRouter } from 'next/router';
import React from 'react';

const verifiedToken = () => {
  const router = useRouter().query;
  console.log(router);
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-3xl">Account successfully verified. </h1>
        <p>Proceed to login </p>
      </div>
    </div>
  );
};

export default verifiedToken;
