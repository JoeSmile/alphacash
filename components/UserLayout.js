import {
  SafeAreaView,
  Pressable,
  ImageBackground,
  StyleSheet,
  View,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "@const/Colors";
import Avatar from "@components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { LanguageSwitcher } from "@components/LanguageSwitcher";
//import { Image } from 'expo-image';
import { Asset } from "expo-asset";

export default function UserLayout({ displayGoBack = false, children }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: 240,
          backgroundColor: Colors.light.primary,
        }}
      >
        {displayGoBack && (
          <Pressable
            style={{
              zIndex: 1000,
              height: 30,
              width: 30,
              position: "absolute",
              left: 20,
              top: 20,
            }}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require("@assets/images/arrow_left.svg")}
              contentFit="cover"
              transition={1000}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </Pressable>
        )}
        <View
          style={{
            flex: 1,
          }}
        >
          <ImageBackground
            source={{
              uri: Asset.fromModule(require("@assets/images/bg.png")).uri,
            }}
            style={styles.image}
          >
            <View style={styles.container}>
              <LanguageSwitcher />
              <Avatar
                title="Alphacash"
                style={{
                  marginTop: 15,
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  text: {
    color: "white",
  },
});
