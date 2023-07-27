import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import FModal from "@components/FModal";
import { A } from "@expo/html-elements";

export function PrivatePolicy() {
  return (
    <View>
      <Text
        style={{
          color: "#4F5E6F",
          lineHeight: 20,
          fontSize: 14,
        }}
      >
        AlphaCash is an online loan that is safe, simple, and fast, and offers
        various types of loan products. you can always find The right loan
        product for you.
      </Text>

      <Text
        style={{
          color: "#4F5E6F",
          lineHeight: 20,
          fontSize: 14,
        }}
      >
        For more information, see{" "}
        <A
          href="https://google.com"
          style={{
            color: "#0825B8",
            textDecorationLine: "none",
            fontWeight: "bold",
          }}
        >
          Privacy Policy
        </A>{" "}
        and{" "}
        <A
          href="https://google.com"
          style={{
            color: "#0825B8",
            textDecorationLine: "none",
            fontWeight: "bold",
          }}
        >
          terms&conditions
        </A>
        .
      </Text>
    </View>
  );
}

export function PrivatePolicyScreen() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <PrivatePolicy />
    </View>
  );
}
