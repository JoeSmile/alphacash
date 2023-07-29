import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useI18n, LocaleTypes } from "@hooks/useI18n";

export function FButton(props) {
  const { onPress, title = 'Save', style = {}, ...restProps } = props;
  const {i18n} = useI18n();

  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...restProps}>
      <Text style={styles.text}>{i18n.t(title)}</Text>
      <Image source={require('@assets/images/btn_ic_right.png')} style={{width: 12, height: 12}}/>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    flexDirection: 'row',
    borderWidth: 0, 
    backgroundColor: '#0825B8',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});
