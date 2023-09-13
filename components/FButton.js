import React from "react";
import { Text, StyleSheet, Pressable, Image } from "react-native";
import { useI18n } from "@hooks/useI18n";
import { getRevertImage } from "@styles";
import { getRTLView } from '@styles';

export function FButton(props) {
  const { onPress, title = "Save", style = {}, textStyle, ...restProps } = props;
  const { i18n, locale } = useI18n();

  return (
    <Pressable style={[styles.button, style, getRTLView(locale)]} onPress={onPress} {...restProps}>
      <Text style={[styles.text, textStyle]}>{i18n.t(title)}</Text>
      <Image
        source={require("@assets/images/btn_ic_right.png")}
        style={[{ width: 12, height: 12 }, getRevertImage(locale)]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 3,
    flexDirection: "row",
    borderWidth: 0,
    backgroundColor: "#0825B8",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: "white",
  },
});
