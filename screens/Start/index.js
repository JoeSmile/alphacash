import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import FModal from "../../components/FModal";
import { useSystemStore } from "../../store/useSystemStore";
import { PrivatePolicy } from "@screens/Settings/PrivatePolicy";

export default function Start({ navigation }) {
  const [isReadPolicy, setReadPolicy] = useSystemStore((s) => [
    s.isReadPolicy,
    s.setReadPolicy,
  ]);
  const [modalVisible, setModalVisible] = useState(!isReadPolicy);
  useEffect(() => {
    if (isReadPolicy) {
      navigation.push("Homepage");
    }
  }, []);
  return (
    <View>
      <FModal
        isOpen={modalVisible}
        header={<Text style={styles.title}>AlphaCash</Text>}
        body={<PrivatePolicy />}
        footer={
          <>
            <Pressable
              style={[styles.button, styles.buttonRefuse]}
              onPress={() => {
                console.log("exitApp");
                BackHandler.exitApp();
              }}
            >
              <Text style={styles.textStyle}>Reject</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonAgree]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setReadPolicy();
                navigation.replace("Homepage");
              }}
            >
              <Text style={styles.textStyle}>Agree</Text>
            </Pressable>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
