import { View, StyleSheet, Text, Pressable, TextInput, Button } from "react-native";
import { CheckBox } from 'react-native-elements';
import React, { useState } from 'react';

import { Formik } from 'formik';
import { Colors } from "@const/Colors";
import { getOTP, encodeSHA, getNetInfo } from '@apis'
import { useLogin } from '@apis/hooks';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";

encodeSHA();
getNetInfo();

export default function LoginCard() {
  const [isSelected, setSelection] = useState(false);
  const navigation = useNavigation()
  const mutation = useLogin({onSuccess: () => {
    navigation.replace('Homepage')
  }})

  return (
    <View >
        <Spinner
          visible={mutation.isLoading}
          textContent={'login...'}
          textStyle={styles.spinnerTextStyle}
        />
      <View style={styles.container}>
        <Formik
          initialValues={{ phoneNumber: '', OTP: '' }}
          onSubmit={values => {
            mutation.mutate()
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  name="phoneNumber"
                  placeholder="03x xxxx xxxx"
                  style={styles.textInput}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                  value={values.phoneNumber}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>OTP</Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    name="OTP"
                    style={styles.textInput}
                    onChangeText={handleChange('OTP')}
                    onBlur={handleBlur('OTP')}
                    value={values.OTP}
                  />

                  <Pressable onPress={() => getOTP('03123456789')} style={{
                    position: 'absolute', right: 15
                  }}>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center'
                    }} >
                      <Text style={{
                        borderRightWidth: 1,
                        borderRightColor: '#E1E3E8',
                        height: 20
                      }} />
                      <Text style={styles.otpText}>Get OTP</Text>
                    </View>

                  </Pressable>
                </View>

              </View>
              <Button disabled={!isSelected} style={styles.loginButton} onPress={handleSubmit} title="Log In" />
            </>
          )}
        </Formik>
        <Text style={{
          color: '#8899AC',
          fontSize: 12,
          marginTop: 10,
          width: "95%",
          alignSelf: 'center',
          lineHeight: 20
        }}>
          If the unregistered mobile phone number is verified, an account will be automatically created!
        </Text>
      </View>
      <View >
        <View style={{
          fontSize: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <CheckBox
            checked={isSelected}
            onPress={() => { setSelection(!isSelected) }}
          />
          <Text>
            Agree
          </Text>
          <Pressable style={{ marginRight: 2, marginLeft: 2 }}>
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Privacy Agreement
            </Text>
          </Pressable>
          <Text>
            and
          </Text>
          <Pressable style={{ marginRight: 2, marginLeft: 2 }}>
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Terms&Service
            </Text>
          </Pressable>
        </View>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    paddingTop: 56,
    paddingBottom: 30,
    paddingHorizontal: 15,
    margin: 15,
    backgroundColor: 'white',
    transform: 'translateY(-50px)',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1),0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    padding: 10,
    elevation: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20
  },
  otpText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: 600,
    height: 50,
    lineHeight: 50
  },
  label: {
    marginBottom: 10
  },
  textInput: {
    paddingLeft: 15,
    height: 50,
    width: 'auto',
    backgroundColor: '#F4F5F7',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  loginButton: {
    height: 50,
    width: '95%',
    backgroundColor: Colors.light.primary,
    alignSelf: 'center'
  },
  checkbox: {
    marginRight: 5,
    textAlignVertical: 'sub'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})