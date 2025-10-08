"use client";
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Profile',
};

const Profile = () => {
  redirect('/');
  return null;
};

export default Profile;
