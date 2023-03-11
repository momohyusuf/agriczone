import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileName = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const router = useRouter();

  if (!user) {
    router.push('sign-in');
  }
  return <div>profileName</div>;
};

export default ProfileName;
