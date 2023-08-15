import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { CheckBox } from "react-native-elements";
import React, { useEffect, useState } from "react";
import { useSystemStore } from "../../store/useSystemStore";
import { Formik } from "formik";
import { Colors } from "@const/Colors";
import { encodeSHA, getNetInfo, useGetUserFormStatus } from "@apis";
import { useLogin, useGetOTP } from "@apis/hooks";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import * as Yup from "yup";
import { useRoute } from "@react-navigation/native";
import { doTrack } from "@utils/dataTrack";
import { Toast } from "@ant-design/react-native";

// encodeSHA();
// getNetInfo();

const LoginFormSchema = Yup.object().shape({
  OTP: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(/^03\d{9}/, "Please input 11 characters phone number")
    .required("Required"),
});

export default function LoginCard() {
  const [isSelected, setSelection] = useState(true);
  const navigation = useNavigation();
  const setUserInfo = useSystemStore((s) => s.setUserInfo);
  const { i18n } = useI18n();
  const route = useRoute();

  const { mutate: login, data, isLoading } = useLogin();
  const { mutate: getOTP } = useGetOTP();
  const [text, setText] = useState("Get OTP");
  const [targetScreen, setTargetScreen] = useState("");
  const [needFormCompleted, setNeedFormCompleted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isClickable, setIsClickable] = useState(true);
  const {
    mutate: getUserFormStatus,
    data: formStatus,
    isLoading: formStatusLoading,
  } = useGetUserFormStatus();

  let timer = null;

  const [phoneNumber, setphoneNumber] = useState(null);

  useEffect(() => {
    clearInterval(timer);
  }, []);

  useEffect(() => {
    if (data?.data?.error_code == 1) {
      console.log("userinfo: ", JSON.stringify(data.data));
      doTrack("pk21", 1);
      if (data.data.data.isNewAccount) {
        doTrack("pk28", 1);
      } else {
        doTrack("pk35", 1);
      }
      setUserInfo({
        phone: phoneNumber,
        token: data.data.data.token,
      });
      if (targetScreen && needFormCompleted) {
        getUserFormStatus();
      }
      if (targetScreen) {
        navigation.replace(targetScreen);
      } else {
        navigation.replace("Homepage");
      }
    }
  }, [data]);

  useEffect(() => {
    if (formStatus?.data?.error_code == 1) {
      const status = data?.data?.data || {};
      const isCompleted =
        status.isCompletedPersonal &&
        status.isCompletedWork &&
        status.isCompletedContact &&
        status.isCompletedIdentity;
      if (isCompleted && targetScreen) {
        // go to apply screen
        navigation.replace(targetScreen);
      } else {
        navigation.replace("Homepage");
      }
    }
  }, [formStatus]);

  const handleTextClick = () => {
    if (isClickable && countdown === 0) {
      setText("60s");
      setIsClickable(false);
      let count = 60;
      timer = setInterval(() => {
        count--;
        if (count >= 0) {
          setText(`${count}s`);
        } else {
          clearInterval(timer);
          setIsClickable(true);
          setText("Get OTP");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    const targetScreen = route.params ? route.params.targetScreen : "";
    const needFormCompleted = route.params
      ? route.params.needFormCompleted
      : "";

    setNeedFormCompleted(needFormCompleted);
    setTargetScreen(targetScreen);
  }, [route]);

  return (
    <View>
      <Spinner
        visible={isLoading}
        textContent={i18n.t("Loading")}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{ phoneNumber: "", OTP: "" }}
          onSubmit={(values) => {
            setphoneNumber(values.phoneNumber);
            login({
              phoneNumber: values.phoneNumber,
              otp: values.OTP,
            });
          }}
          validationSchema={LoginFormSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>{i18n.t("Phone Number")}</Text>
                <TextInput
                  name="phoneNumber"
                  placeholder="03x xxxx xxxx"
                  style={styles.textInput}
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={() => {
                    doTrack("pk44", 1);
                    handleBlur("phoneNumber");
                  }}
                  value={values.phoneNumber}
                  maxLength={11}
                  keyboardType="numeric"
                />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <Text
                    style={{
                      color: "#E53F31",
                    }}
                  >
                    {errors.phoneNumber}
                  </Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>OTP</Text>
                <View style={{ position: "relative" }}>
                  <TextInput
                    name="OTP"
                    style={styles.textInput}
                    onChangeText={handleChange("OTP")}
                    onBlur={() => {
                      doTrack("pk12", 1);
                      handleBlur("OTP");
                    }}
                    value={values.OTP}
                    maxLength={6}
                  />

                  <Pressable
                    onPress={() => {
                      doTrack("pk42", 1);
                      console.log("values.phoneNumber", values.phoneNumber);
                      if (/^03\d{9}/.test(values.phoneNumber)) {
                        getOTP({
                          phoneNumber: values.phoneNumber,
                        });
                        handleTextClick();
                      } else {
                        Toast.info({
                          content:
                            "Please input 11 characters phone number, start with 03",
                          duration: 3,
                        });
                      }
                    }}
                    style={{
                      position: "absolute",
                      right: 15,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          borderRightWidth: 1,
                          borderRightColor: "#E1E3E8",
                          height: 20,
                        }}
                      />
                      <Text style={styles.otpText}>{text}</Text>
                    </View>
                  </Pressable>
                </View>
                {errors.OTP && touched.OTP ? (
                  <Text
                    style={{
                      color: "#E53F31",
                    }}
                  >
                    {errors.OTP}
                  </Text>
                ) : null}
              </View>
              <Pressable
                style={{
                  backgroundColor: "#0825B8",
                  borderRadius: 3,
                  marginHorizontal: 8,
                }}
                onPress={handleSubmit}
                disabled={!isSelected}
              >
                <Text
                  style={{
                    textAlign: "center",
                    borderRadius: 3,
                    height: 46,
                    lineHeight: 46,
                    color: "#FFFFFF",
                    backgroundColor: isSelected
                      ? Colors.light.primary
                      : "#C0C4D6",
                    fontSize: 15,
                  }}
                >
                  {"Log In"}
                </Text>
              </Pressable>
              {/* <Button color={Colors.light.primary} disabled={!isSelected} style={styles.loginButton} onPress={handleSubmit} title="Log In" /> */}
            </>
          )}
        </Formik>
        <Text
          style={{
            color: "#8899AC",
            fontSize: 12,
            marginTop: 10,
            width: "95%",
            alignSelf: "center",
            lineHeight: 20,
          }}
        >
          {i18n.t(
            "If the unregistered mobile phone number is verified, an account will be automatically created!"
          )}
        </Text>
      </View>
      <View>
        <View
          style={{
            fontSize: 12,
            flexDirection: "row",
            alignItems: "center",
            marginTop: -36,
            gap: 2,
          }}
        >
          <CheckBox
            checked={isSelected}
            onPress={() => {
              setSelection(!isSelected);
            }}
            checkedColor="#0825B8"
            checkedIcon={
              <Image
                source={require("@assets/images/check_box_sel.png")}
                style={{ width: 17, height: 17 }}
              />
            }
            uncheckedIcon={
              <Image
                source={require("@assets/images/check_box_default.png")}
                style={{ width: 17, height: 17 }}
              />
            }
          />
          <Text style={{ marginLeft: -16 }}>{i18n.t("Agree")}</Text>
          <Pressable style={{ marginRight: 2, marginLeft: 2 }}>
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Privacy Agreement
            </Text>
          </Pressable>
          <Text>and</Text>
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
    backgroundColor: "white",
    transform: [{ translateY: -50 }],
    elevation: 3,
    shadowColor: "#000",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
    padding: 10,
    elevation: 10,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  otpText: {
    width: 64,
    color: Colors.light.primary,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    height: 52,
    lineHeight: 52,
  },
  label: {
    color: "#595959",
    marginBottom: 10,
  },
  textInput: {
    paddingLeft: 15,
    height: 50,
    width: "auto",
    backgroundColor: "#F4F5F7",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    //outlineColor: "#0825B8",
  },
  loginButton: {
    height: 46,
    width: "95%",
    backgroundColor: Colors.light.primary,
    alignSelf: "center",
  },
  checkbox: {
    marginRight: 5,
    textAlignVertical: "sub",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
