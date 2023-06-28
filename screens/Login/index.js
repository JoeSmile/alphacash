import { SafeAreaView, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import LoginCard from './loginCard';
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Switcher from './Switcher';
import Avatar from '@components/Avatar';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

export default function Login({ navigation: { goBack } }) {
  return (
    <SafeAreaView style={{
      backgroundColor: Colors.primary
    }}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
          {/* <Pressable onPress={() => goBack()}>
            <Text style={styles.text}>back</Text>
          </Pressable>
          <Text style={styles.text}>Login</Text> */}
          <Switcher />
          <Avatar title='Alphacash' />
          <LoginCard />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: '260px',
  },
  container: {
    backgroundColor: '#0825B8',
    color: 'white',
    padding: '15px'
  },
  text: {
    color: 'white'
  }
});