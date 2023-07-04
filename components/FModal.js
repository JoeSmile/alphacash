import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function FModal({
  displayClose,
  header,
  body,
  footer,
  isOpen,
  toggle,
  ...restProps
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      {...restProps}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {displayClose && (
            <Ionicons
              name="close-outline"
              size={24}
              display="inline-block"
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
              color="black"
              onPress={() => toggle(false)}
            />
          )}
          <Text style={styles.modalHeader}>{header}</Text>
          <Text style={styles.modalText}>{body}</Text>
          {footer && <View style={styles.modalFooter}>{footer}</View>}
        </View>
      </View>
    </Modal>
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalHeader: {
    fontSize: 28,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
  },
  modalFooter: {
    flexDirection: "row",
    padding: 20,
    gap: 20,
    width: "100%",
  },
});
