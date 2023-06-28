import { SafeAreaView, Text, Pressable } from "react-native";
import React from 'react';
import LoginCard from './loginCard';

export default function Login({ navigation: { goBack } }) {
  return (
    <SafeAreaView>
      <Pressable onPress={() => goBack()}>
        <Text>back</Text>
      </Pressable>
      <Text>Login</Text>
     <LoginCard />
    </SafeAreaView>
  );
}
