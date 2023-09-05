import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, ImageBackground, View, BackHandler } from "react-native";
import FModal from "../../components/FModal";
import { useSystemStore } from "../../store/useSystemStore";
import { PrivatePolicy } from "@screens/Settings/PrivatePolicy";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle } from "@styles";
import { useIsFocused } from "@react-navigation/native";

export default function Start({ navigation }) {
  const { i18n, locale } = useI18n();

  const [isReadPolicy, setReadPolicy] = useSystemStore((s) => [
    s.isReadPolicy,
    s.setReadPolicy,
  ]);
  const [modalVisible, setModalVisible] = useState(!isReadPolicy);
  
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isReadPolicy) {
      navigation.replace("Homepage");
    }
  }, []);

  return (
    <View style={styles.container}>
    <ImageBackground
      style={{ flex: 1 }}
      source={require("@assets/splash.png")}
    >
      <Text style={[styles.license, getWritingDirectionStyle(locale)]}>License No: {`xxxxxxxxxxxxxx`}</Text>
    </ImageBackground>
    <FModal
      isOpen={modalVisible && isFocused}
      header={<Text style={styles.title}>AlphaCash</Text>}
      body={<PrivatePolicy />}
      footer={
        <>
          <Pressable
            style={[styles.button, styles.buttonRefuse]}
            onPress={() => {
              doTrack("pk25", 1);
              BackHandler.exitApp();
            }}
          >
            <Text style={styles.textStyle}>{i18n.t("Reject")}</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.buttonAgree]}
            onPress={() => {
              setModalVisible(!modalVisible);
              setReadPolicy();
              doTrack("pk9", 1);
              navigation.replace("Homepage");
            }}
          >
            <Text style={styles.textStyle}>{i18n.t("Agree")}</Text>
          </Pressable>
        </>
      }
    />
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0825B8",
    position: "relative",
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    color: "#0A233E",
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    borderRadius: 3,
    padding: 12,
    elevation: 2,
    flex: 1,
  },
  buttonRefuse: {
    backgroundColor: "#C0C4D6",
  },
  buttonAgree: {
    backgroundColor: "#0825B8",
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  license: {
    width: "100%",
    color: "white",
    fontSize: 14,
    lineHeight: 20,
    position: "absolute",
    bottom: 60,
    textAlign: "center",
  },
});
