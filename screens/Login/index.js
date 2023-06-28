import { SafeAreaView, Text, Pressable, ImageBackground, StyleSheet } from "react-native";
import React from 'react';
import LoginCard from './loginCard';
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import Switcher from './Switcher';
import Avatar from '@components/Avatar';

const image = {uri: require('@assets/images/bg.png')};

export default function Login({ navigation: { goBack } }) {
  return (
    <SafeAreaView>
      <View style={{
        width: '100vw',
        height: '240px',
        backgroundColor: Colors.light.primary
      }}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
            {/* <Pressable onPress={() => goBack()}>
              <Text style={styles.text}>back</Text>
            </Pressable>
            <Text style={styles.text}>Login</Text> */}
            <Switcher />
            <Avatar title='Alphacash' style={{
              marginTop: '15px'
            }}/>
          </View>
        </ImageBackground>
      </View>
     
      <LoginCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  container: {
    color: 'white',
    paddingVertical:'30px',
    paddingHorizontal:'20px',
    backgroundColor: 'transparent'
  },
  text: {
    color: 'white'
  }
});