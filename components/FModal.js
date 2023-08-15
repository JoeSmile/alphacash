import React, { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function FModal({
  displayClose,
  header,
  body,
  footer,
  isOpen,
  onCloseClick,
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
              style={{
                position: "absolute",
                right: 16,
                top: 16,
              }}
              color="grey"
              onPress={onCloseClick}
            />
          )}
          <View style={styles.modalHeader}>{header}</View>
          <View style={styles.modalText}>{body}</View>
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
    //alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 8,
    paddingTop: 24,
    paddingBottom: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    elevation: 5,
  },
  modalHeader: {
    fontSize: 16,
    lineHeight: 24,
    color: "#0A233E",
    fontWeight: "bold",
    marginBottom: 12,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "left",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 15,
    width: "100%",
  },
});
