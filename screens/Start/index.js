import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import { A } from "@expo/html-elements";
import FModal from "../../components/FModal";
import { useSystemStore } from "../../store/useSystemStore";
export default function Start({ navigation, navigator }) {
  const [isReadPolicy, setReadPolicy] = useSystemStore(s => [s.isReadPolicy, s.setReadPolicy])
  const [modalVisible, setModalVisible] = useState(!isReadPolicy);
  useEffect(() => {
    if(isReadPolicy) {
      navigation.replace("Login");
    }
  }, [])
  return ( 
    <View>
      <Text>License No: XXXXXXX</Text>
      <FModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        header="EagleLoan"
        body={
          <>
            EagleLoan is an online loan that is safe, simple, and fast, and
            offers various types of loan products. you can always find The right
            loan product for you. For more information, see
            <A
              href="https://google.com"
              style={{
                color: "#0969da",
                textDecorationLine: "underline",
              }}
            >
              Privacy Policy
            </A>
            and{" "}
            <A
              href="https://google.com"
              style={{
                color: "#0969da",
                textDecorationLine: "underline",
              }}
            >
              terms&conditions
            </A>
            .
          </>
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
              style={[styles.button, styles.buttonClose, { flex: 1 }]}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonRefuse: {
    backgroundColor: "gray",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
});
