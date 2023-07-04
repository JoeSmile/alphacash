import { View, TextInput, StyleSheet, Text, Pressable } from "react-native";
import { CheckBox } from "@react-native-community/checkbox";
import React, { useState } from 'react';
import { Formik } from 'formik';
import Colors from "@const/Colors";
import Button from '@components/Button';
import { getOTP, login, encodeSHA, getNetInfo } from '@apis'
import { useUserInfo } from '@store/useUserInfo';

const mockLoginParameters = {
  phoneNumber: '01238137213',
  otp: '789456',
}

encodeSHA();
getNetInfo();
export default function LoginCard() {
  const [isSelected, setSelection] = useState(false);
  const [isLogin, setLogin] = useUserInfo((s) => [s.isLogin, s.setLogin]);

  return (
    <View >
      <View style={styles.container}>
        <Formik
          initialValues={{ phoneNumber: '', OTP: '' }}
          onSubmit={values => {
            login(mockLoginParameters);
            setLogin(!isLogin);
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
                  keyboardType="phoneNumber"
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
                    keyboardType="phoneNumber"
                  />

                  <Pressable onPress={() => getOTP('03123456789')} style={{
                    position: 'absolute', right: '15px'
                  }}>
                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '5px',
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
              <Button style={styles.loginButton} onPress={handleSubmit} title="Log In" />
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
      <View flexDirection='row'>
        <Text style={{
          transform: 'translateY(-30px)',
          fontSize: 12,
          textAlign: 'center',
          verticalAlign: 'sub'
        }}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={styles.checkbox}
          />
          Agree
          <Pressable style={{ display: 'inline-block', marginRight: '2px', marginLeft: '2px' }}>
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Privacy Agreement
            </Text>
          </Pressable>
          and
          <Pressable style={{ display: 'inline-block', marginRight: '2px', marginLeft: '2px' }}>
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Terms&Service
            </Text>
          </Pressable>
        </Text>
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
})