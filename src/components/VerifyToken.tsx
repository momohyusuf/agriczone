import React from 'react';
import { url } from '@/utils/url';
import axios from 'axios';
import Link from 'next/link';
import Button from '@mui/material/Button';
type VerifyTokenProps = {
  token: string | string[] | undefined;
  email: string | string[] | undefined;
};

const VerifyToken = (props: VerifyTokenProps) => {
  const [verificationResponse, setVerificationResponse] =
    React.useState<string>('');
  const verify = async () => {
    try {
      const { data } = await axios.post(`${url}/auth/verify-email`, {
        verificationToken: props.token,
        email: props.email,
      });
      console.log(data?.response);
      setVerificationResponse(data?.message);
    } catch (error) {
      setVerificationResponse(error?.response.data.message);
    }
  };

  React.useEffect(() => {
    verify();
  }, []);
  return (
    <section className="grid place-items-center h-screen">
      <div className="bg-green-50 p-10 space-y-5 shadow-md">
        <h1 className="text-3xl text-pigment-green">
          {verificationResponse || 'Verifying.....'}.
        </h1>
        <div>
          <Link href="/sign-in">
            <Button
              variant="contained"
              color="success"
              className="bg-pigment-green"
            >
              Proceed to login
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VerifyToken;
