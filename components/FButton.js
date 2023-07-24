import React from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';

export function FButton(props) {
  const { onPress, title = 'Save', style = {}, ...restProps } = props;
  return (
    <Pressable style={[styles.button, style]} onPress={onPress} {...restProps}>
      <Text style={styles.text}>{title}</Text>
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
    elevation: 3,
    boxShadow: 'none',
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
