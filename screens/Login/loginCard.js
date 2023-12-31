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
import { useI18n } from "@hooks/useI18n";
import * as Yup from "yup";
import { useRoute } from "@react-navigation/native";
import { doTrack } from "@utils/dataTrack";
import { Toast } from "@ant-design/react-native";
import { getWritingDirectionStyle, getMarginRightOrLeft, getRTLView, getTextAlign } from '@styles';
import { useUserQuota } from "@store";
import { useGetUserQuota } from "@apis/hooks";

// encodeSHA();
// getNetInfo();

const LoginFormSchema = Yup.object().shape({
  OTP: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .matches(
      /^03\d{9}/,
      "Please input 11 characters phone number,start with 03"
    )
    .required("Required"),
});

export default function LoginCard() {
  const [isSelected, setSelection] = useState(true);
  const navigation = useNavigation();
  const setUserInfo = useSystemStore((s) => s.setUserInfo);
  const { i18n, locale } = useI18n();
  const route = useRoute();

  const { mutate: getUserQuota, data: userQuotaData } = useGetUserQuota();
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
  const [cashLoan, setCashLoan, loanIds, setLoanIdInTips] = useUserQuota(
    (s) => [s.cashLoan, s.setCashLoan, s.loanIdInTips, s.setLoanIdInTips]
  );

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
      getUserQuota();
    }
  }, [data]);

  useEffect(() => {
    if (userQuotaData?.data?.error_code == 1) {
      const cashLoan = userQuotaData?.data?.data?.cashLoan;
      if (cashLoan && JSON.stringify(cashLoan) !== JSON.stringify(cashLoan)) {
        setCashLoan(cashLoan);
      }
      if (targetScreen && needFormCompleted) {
        getUserFormStatus();
      }
      else {
        navigation.replace("Homepage");
      }
    }
  }, [userQuotaData]);

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
            if(!isSelected) {
              Toast.info({
                content:
                  "Please tick the privacy Agreement and Terms&Service",
                duration: 3,
              });
              return
            }

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
                  placeholderTextColor={"#8899AC"}
                  style={[styles.textInput, getTextAlign(locale)]}
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
              <View style={[styles.inputContainer]}>
                <Text style={[styles.label, locale == 'en' ? {textAlign: 'left'} : {textAlign: 'right'}]}>OTP</Text>
                <View style={[{ position: "relative" }]}>
                  <TextInput
                    keyboardType="numeric"
                    name="OTP"
                    style={[styles.textInput, getTextAlign(locale)]}
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
                    style={[{
                      position: "absolute",
                      
                      marginTop: 2
                    }, locale == 'en' ? {right: 15}: {left: 15}]}
                  >
                    <View
                      style={[{
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                      }, getRTLView(locale)]}
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
                // disabled={!isSelected}
              >
                <Text
                  style={{
                    textAlign: "center",
                    borderRadius: 3,
                    height: 46,
                    lineHeight: 46,
                    color: "#FFFFFF",
                    backgroundColor: Colors.light.primary,
                    fontSize: 15,
                  }}
                >
                  {"Log In"}
                </Text>
              </Pressable>
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
          style={[{
            fontSize: 12,
            alignItems: "center",
            marginTop: -36,
            gap: 2,
          }, getRTLView(locale)]}
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
          <Text style={{ marginLeft: 0 }}>{i18n.t("Agree")}</Text>
          <Pressable style={{ marginRight: 2, marginLeft: 2 }}
            onPress={() => navigation.push("LoanAgreement", {uri: 'https://www.baidu.com'} )}
          >
            <Text style={{ fontWeight: 600, color: Colors.light.primary }}>
              Privacy Agreement
            </Text>
          </Pressable>
          <Text>and</Text>
          <Pressable style={{ marginRight: 2, marginLeft: 2 }}
            onPress={() => navigation.push("LoanAgreement", {uri: 'https://www.baidu.com'} )}
          >
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  otpText: {
    color: Colors.light.primary,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 48,
  },
  label: {
    color: "#595959",
    marginBottom: 10,
  },
  textInput: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    width: "auto",
    backgroundColor: "#F4F5F7",
    borderRadius: 8,
    fontSize: 16,
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});
