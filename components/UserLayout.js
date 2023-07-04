import { SafeAreaView, Image, Pressable, ImageBackground, StyleSheet, View } from "react-native";
import React from 'react';
import {Colors} from "@const/Colors";
import Avatar from '@components/Avatar';
import { useNavigation } from "@react-navigation/native";
import LanguageSwitcher from '@components/LanguageSwitcher';

const image = {uri: require('@assets/images/bg.png')};

export default function UserLayout({ displayGoBack=false, displayLanguageSwitcher=true, children }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{
        width: '100vw',
        height: '240px',
        backgroundColor: Colors.light.primary
      }}>
      { displayGoBack && 
        <Pressable style={{
            zIndex: '1000',
            height: '30px',
            width: '30px',
            position: 'absolute',
            left: '20px',
            top: '20px',
        }} onPress={()=> navigation.goBack()}>
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
      }
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
            {
                displayLanguageSwitcher && <LanguageSwitcher />
            }
            <Avatar title='Alphacash' style={{
              marginTop: '15px'
            }}/>
          </View>
        </ImageBackground>
      </View>
      {children}
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