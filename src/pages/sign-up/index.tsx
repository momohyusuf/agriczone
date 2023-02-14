import Image from 'next/image';
import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';

const Index = () => {
  return (
    <section className="grid place-items-center h-screen">
      <div className="flex gap-10 flex-col lg:flex-row capitalize">
        <div className="shadow-md tracking-wide p-10 text-center rounded-md space-y-6 text-2xl">
          <p>Register as an Agro expert</p>
          <div className="flex justify-between items-center ">
            <Image
              src="/agro-expert.png"
              alt="a angro expert icon"
              height={100}
              width={100}
            />
            <Link
              href="/sign-up/agro-expert"
              className="text-pigment-green rounded-sm bg-white p-2 shadow hover:bg-pigment-green transition-all duration-500 hover:text-white"
            >
              <ArrowForwardIosIcon />
            </Link>
          </div>
        </div>
        <div className="shadow-md tracking-wide text-2xl p-10 rounded-md space-y-6">
          <p>Register as a trader</p>
          <div className="flex justify-between items-center ">
            <Image
              src="/trader-market.png"
              alt="trader market icon"
              height={100}
              width={100}
            />
            <Link
              href="/sign-up/trader"
              className="text-pigment-green rounded-sm bg-white p-2 shadow hover:bg-pigment-green transition-all duration-500 hover:text-white"
            >
              <ArrowForwardIosIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Index;
