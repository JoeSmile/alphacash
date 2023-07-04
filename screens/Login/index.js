import { StyleSheet } from "react-native";
import React from 'react';
import LoginCard from './loginCard';
import UserLayout from '@components/UserLayout';

export default function Login() {
  return (
    <UserLayout displayGoBack>
      <LoginCard />
    </UserLayout>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  text: {
    color: 'white'
  }
});