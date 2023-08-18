import { useEffect, useState, useCallback } from "react";
import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Linking,
} from "react-native";

import {
  useGetCashLoanProductConfig,
  useApplyCreateBill,
  useGetApplyCheckParams,
} from "@apis";

import ApplyLoanCard from "@components/ApplyLoanCard";
import LoanDetails from "@components/LoanDetails";
import CollectionAccount from "@components/CollectionAccount";
import FaceRecognition from "@components/FaceRecognition";
import VoiceModal from "./VoiceModal";

import { useSystemStore } from "@store/useSystemStore";
import { useNavigation } from "@react-navigation/native";
import { useUserQuota } from "@store/useUserQuota";
import { useI18n } from "@hooks/useI18n";
import Spinner from "react-native-loading-spinner-overlay";
import { Asset } from "expo-asset";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle } from '@styles';

function buildGetRequest(url, params) {
  if (params) {
    const queryString = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
    return url + "?" + queryString;
  }
  return url;
}

const baseURL = "https://alphacashapi.tangbull.com/api/app/laon/voice";

export default function Apply() {
  const currentUserCardInfo = useSystemStore(s => [s.usersInfo[s.phone]?.cardInfo ?? {}, s.setCardInfo, s.cleanCardInfo]);

  const userStore = useUserQuota();
  const navigation = useNavigation();
  const { i18n, locale } = useI18n();

  const {
    mutate: getCashLoanProductConfig,
    data: loanProductConfigData,
    isLoading: isGetCashLoanProductConfigLoading,
  } = useGetCashLoanProductConfig();

  const { mutate: checkApplyParams, data: checkApplyParamsResp } =
    useGetApplyCheckParams();

  const {
    mutate: applyCreateBill,
    data: billData,
    isLoading: isApplyCreateBillLoading,
  } = useApplyCreateBill();

  const [optWithDaysConfig, setOptWithDaysConfig] = useState([]);
  //审核账号
  const [isSpecialAccount, setIsSpecialAccount] = useState(false);

  const [daysOption, setDaysOption] = useState(0);
  const [amountIndex, setAmountIndex] = useState(0);
  const [isChecked, setChecked] = useState(true);
  const [toVoice, setToVoice] = useState(false);
  const [audioFileUri, setAudioFileUri] = useState("'");

  useEffect(() => {
    getCashLoanProductConfig();
  }, []);

  useEffect(() => {
    if (loanProductConfigData?.data?.error_code == 1) {
      const loanConfigInfo = loanProductConfigData.data.data.cashLoan;
      //产品配置信息
      setOptWithDaysConfig(loanConfigInfo.optWithDaysConfig);
      //是否审核账号
      setIsSpecialAccount(loanConfigInfo.isSpecialAccount);
      //默认金额下标
      setAmountIndex(loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex);
      //默认天数下标
      // setDaysOption(loanConfigInfo.defaultDayOption)
    }
  }, [loanProductConfigData]);

  const checkApply = useCallback(() => {
    doTrack("pk19", 1);
    //参数检查
    const daysConfig = optWithDaysConfig[daysOption];
    const amountConfig = daysConfig.opt[amountIndex];
    const data = {
      applyAmount: amountConfig.applyAmount,
      manageFee: amountConfig.manageFee,
      dailyRate: amountConfig.dailyRate / 100,
      dayNum: daysConfig.days,
      minLoanMoney: daysConfig.minLoanMoney,
      maxLoanMoney: daysConfig.maxLoanMoney,
    };
    checkApplyParams(data);
  }, [optWithDaysConfig, daysOption, amountIndex]);

  useEffect(() => {
    console.log("Sun >>> checkApplyParamsResp: ", checkApplyParamsResp);
    if (checkApplyParamsResp?.data?.error_code == 1) {
      //拼接参数
      const daysConfig = optWithDaysConfig[daysOption];
      const amountConfig = daysConfig.opt[amountIndex];
      const params = {
        applyAmount: amountConfig.applyAmount,
        manageFee: amountConfig.manageFee,
        dailyRate: amountConfig.dailyRate / 100,
        dayNum: daysConfig.days,
        minLoanMoney: daysConfig.minLoanMoney,
        maxLoanMoney: daysConfig.maxLoanMoney,
        selfieImage: userStore.faceData,
      };
      let cardParams = {};
      if (currentUserCardInfo.bankAccount) {
        cardParams = {
          paymentType: "1",
          bankAccountName: currentUserCardInfo.bankAccountName,
          bankAccount: currentUserCardInfo.bankAccount,
          bankId: currentUserCardInfo.bankId,
        };
      } else if (currentUserCardInfo.ewalletAccount) {
        cardParams = {
          paymentType: "2",
          ewalletType: currentUserCardInfo.ewalletType,
          ewalletAccount: currentUserCardInfo.ewalletAccount,
        };
      }
      const allParams = { ...params, ...cardParams };
      console.log("apply create bill req: ", JSON.stringify(allParams));

      applyCreateBill(allParams);
    }
  }, [checkApplyParamsResp]);

  useEffect(() => {
    console.log("apply create bill res: ", billData?.data);
    if (billData?.data?.error_code == 1) {
      userStore.setFaceData({ uri: "", type: "", name: "" }); // 清除人脸识别数据
      navigation.replace("Homepage", { showModal: true });
    }
  }, [billData]);

  const clickLoanAgreement = useCallback(() => {
    const url = "https://www.baidu.com";
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URL: " + url);
        }
      })
      .catch((error) => console.error("An error occurred: ", error));
  }, []);

  const getLoan = () => {
    if (!isChecked || userStore.faceData.name === "") {
      return;
    }

    doTrack("pk37", 1);
    setToVoice(true);

    //拼接参数
    const daysConfig = optWithDaysConfig[daysOption];
    const amountConfig = daysConfig.opt[amountIndex];
    const params = {
      app: store.app,
      sign: store.sign,
      token: store.token,
      language: store.locale,
      applyAmount: amountConfig.applyAmount,
      dayNum: daysConfig.days,
      disburseMoney: amountConfig.disburseMoney,
      dailyRate: amountConfig.dailyRate,
      fineStrategyText: amountConfig.fineStrategyText ?? "",
    };
    const audioFUri = buildGetRequest(baseURL, params);
    setAudioFileUri(audioFUri);
    console.log("Sun >>> ====" + audioFUri);
  };

  const clickCollectionAccount = useCallback(() => {
    // 参数通过第二个参数传递给目标页面
    navigation.navigate("MyCards", { isApplySelect: true });
  }, []);

  const clickFaceRecognition = useCallback(() => {
    if (isSpecialAccount) {
      //审核账号
      doTrack("pk29", 1);
      const whitePicture = Asset.fromModule(
        require("@assets/images/white_picture.jpg")
      );
      console.log("Sun >>> white uri ==== " + whitePicture.uri);
      const img = {
        uri: whitePicture.uri,
        type: "image/jpg",
        name: whitePicture.name,
      };
      userStore.setFaceData(img);
    } else {
      navigation.push("FaceDetectionScreen");
    }
  }, []);

  const goBack = useCallback(() => {
    setToVoice(false);
  }, []);

  return (
    <SafeAreaView style={getWritingDirectionStyle(locale)}>
      <Spinner
        visible={isGetCashLoanProductConfigLoading || isApplyCreateBillLoading}
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.bgBanner} />

        {!!optWithDaysConfig[daysOption] &&
          !isGetCashLoanProductConfigLoading && (
            <View style={{ padding: 12 }}>
              <ApplyLoanCard
                optWithDaysConfig={optWithDaysConfig}
                setOptWithDaysConfig={setOptWithDaysConfig}
                daysOption={daysOption}
                setDaysOption={setDaysOption}
                amountIndex={amountIndex}
                setAmountIndex={setAmountIndex}
              />

              <LoanDetails
                optWithDaysConfig={optWithDaysConfig}
                daysOption={daysOption}
                amountIndex={amountIndex}
              />

              <Pressable onPress={clickCollectionAccount}>
                <CollectionAccount />
              </Pressable>

              <Pressable onPress={clickFaceRecognition}>
                <FaceRecognition />
              </Pressable>

              <View style={styles.loanAgreementStyle}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setChecked}
                  color={isChecked ? "#0825B8" : undefined}
                />
                <Text
                  style={{
                    marginHorizontal: 6,
                    fontSize: 12,
                    color: "#4F5E6F",
                  }}
                >
                  {i18n.t("Agree")}
                </Text>
                <Pressable onPress={() => clickLoanAgreement()}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#0825B8",
                      fontWeight: "bold",
                    }}
                  >
                    {i18n.t("Agree Loan Agreement")}
                  </Text>
                </Pressable>
              </View>

              <Text style={{ fontSize: 12, color: "#4F5E6F" }}>
                {`${i18n.t("Kind Tips")}`}
                {":\n"}
                {`${i18n.t("KindTips1")}`}
                {"\n\n"}
                {`${i18n.t("KindTips2")}`}
                {"\n\n"}
                {`${i18n.t("Key Executive For Loan Handling officer Name")}`}
                {"\n"}
                {`${i18n.t("Contact Email")}:xxxxt@xx.com`}
                {"\n"}
                {`${i18n.t("Address")}:XXXXXXXX`}
                {"\n"}
              </Text>
              <View style={{ height: 80 }}></View>
            </View>
          )}
      </ScrollView>

      <TouchableOpacity
        onPress={getLoan}
        style={{
          bottom: 36,
          left: 36,
          right: 36,
          position: "absolute",
          backgroundColor: isChecked ? "#0825B8" : "#C0C4D6",
          height: 46,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          borderRadius: 3,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
          {i18n.t("GetLoan")}
        </Text>
        <Image
          source={require("@assets/applyLoan/btn_ic_right.png")}
          style={{ width: 12, height: 12, marginLeft: 2 }}
        />
      </TouchableOpacity>

      {/* 语音 */}

      {optWithDaysConfig[daysOption] && (
        <VoiceModal
          visible={toVoice}
          optWithDaysConfig={optWithDaysConfig}
          daysOption={daysOption}
          amountIndex={amountIndex}
          audioFileUri={audioFileUri}
          checkApply={checkApply}
          goBack={goBack}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F4F5F7",
  },
  bgBanner: {
    top: 0,
    position: "absolute",
    backgroundColor: "#0825B8",
    width: "100%",
    height: 150,
    zIndex: 0,
  },
  loanAgreementStyle: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  checkbox: {
    width: 17,
    height: 17,
    borderRadius: 4,
  },
});
