import { SafeAreaView, Image, Pressable, ImageBackground, StyleSheet } from "react-native";
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
      <Pressable style={{
        zIndex: '1000',
        height: '30px',
        width: '30px',
        position: 'absolute',
        left: '20px',
        top: '20px',
      }} onPress={()=> goBack()}>
        <Image
            source={require('@assets/images/arrow_left.svg')}
            contentFit="cover"
            transition={1000}
            style={{
              width: "20px",
              height: '20px',
            }}
          />
      </Pressable>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
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