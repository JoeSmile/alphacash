import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import FModal from "@components/FModal";
import { A } from "@expo/html-elements";
import { useI18n } from "@hooks/useI18n";

export function PrivatePolicy() {
  const { i18n } = useI18n();

  return (
    <View>
      <Text
        style={{
          color: "#4F5E6F",
          lineHeight: 20,
          fontSize: 14,
        }}
      >
      {i18n.t('AlphaCashBrief')}
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
