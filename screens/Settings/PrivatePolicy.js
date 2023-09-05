import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Pressable, View, BackHandler } from "react-native";
import FModal from "@components/FModal";
import { A } from "@expo/html-elements";
import { useI18n } from "@hooks/useI18n";
import { getWritingDirectionStyle } from '@styles';
import { useNavigation } from "@react-navigation/native";

export function PrivatePolicy() {
  const { i18n } = useI18n();
  const navigation = useNavigation();

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
          {i18n.t('For more information')}{" "}
          <Pressable onPress={() => navigation.push("LoanAgreement")}>
            <Text style={{
              color: "#0825B8",
              textDecorationLine: "none",
              fontWeight: "bold",
            }}>
              {i18n.t('Privacy Policy')}
            </Text>
          </Pressable>
          
          and{" "}

          <Pressable onPress={() => navigation.push("LoanAgreement")}  >
            <Text style={{
              color: "#0825B8",
              textDecorationLine: "none",
              fontWeight: "bold",
            }}>
              {i18n.t('Terms&Conditions')}
            </Text>
          </Pressable>
        .
      </Text>
    </View>
  );
}

export function PrivatePolicyScreen() {
  const { i18n, locale } = useI18n();
  return (
    <View
      style={[{
        padding: 20,
      }, getWritingDirectionStyle(locale)]}
    >
      <PrivatePolicy />
    </View>
  );
}
