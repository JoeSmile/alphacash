import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import FModal from "../../components/FModal";
import { useSystemStore } from "../../store/useSystemStore";
import {PrivatePolicy} from '@screens/Settings/PrivatePolicy';

export default function Start({ navigation }) {
  const [isReadPolicy, setReadPolicy] = useSystemStore(s => [s.isReadPolicy, s.setReadPolicy])
  const [modalVisible, setModalVisible] = useState(!isReadPolicy);
  useEffect(() => {
    if (isReadPolicy) {
      navigation.push("Homepage");
    }
  }, [])
  return (
    <View>
      <Text>License No: XXXXXXX</Text>
      <FModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        header="AlphaCash"
        body={
        <PrivatePolicy />
        }
        footer={
          <>
            <Pressable
              style={[styles.button, styles.buttonRefuse, { flex: 1 }]}
              onPress={() => {
                console.log("exitApp");
                BackHandler.exitApp();
              }}
            >
              <Text style={styles.textStyle}>拒绝</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonAgree, { flex: 1 }]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setReadPolicy();
                navigation.replace("Homepage");
              }}
            >
              <Text style={styles.textStyle}>同意</Text>
            </Pressable>
          </>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    height: 48,
    lineHeight: 48
  },
  buttonRefuse: {
    backgroundColor: "#C0C4D6",
  },
  buttonAgree: {
    backgroundColor: "#0825B8",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    height: '100%',
    lineHeight: 28
  },
  modalHeader: {
    fontSize: 28,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
});
