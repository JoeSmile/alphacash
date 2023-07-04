import { SafeAreaView, Pressable, ImageBackground, StyleSheet, View } from "react-native";
import React from 'react';
import {Colors} from "@const/Colors";
import Avatar from '@components/Avatar';
import { useNavigation } from "@react-navigation/native";
import LanguageSwitcher from '@components/LanguageSwitcher';
import { Image } from 'expo-image';

const image = { uri: require('@assets/images/bg.png') };

export default function UserLayout({ displayGoBack = false, displayLanguageSwitcher = true, children }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{
        width: '100%',
        height: 240,
        backgroundColor: Colors.light.primary
      }}>
        {displayGoBack &&
          <Pressable style={{
            zIndex: 1000,
            height: 30,
            width: 30,
            position: 'absolute',
            left: 20,
            top: 20,
          }} onPress={() => navigation.goBack()}>
            <Image
              source={require('@assets/images/arrow_left.svg')}
              contentFit="cover"
              transition={1000}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Pressable>
        }
        {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.container}>
            {
              displayLanguageSwitcher && <LanguageSwitcher />
            }
            <Avatar title='Alphacash' style={{
              marginTop: 15
            }} />
          </View>
        </ImageBackground> */}
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
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'transparent'
  },
  text: {
    color: 'white'
  }
});