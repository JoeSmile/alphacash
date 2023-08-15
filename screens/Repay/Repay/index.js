import { StyleSheet, Text, View, Pressable } from "react-native";
import BillCard from "../BillCard";
import * as Clipboard from "expo-clipboard";
import { useGetRepayCode } from "@apis";
import { useEffect, useState } from "react";
import { useUserQuota } from "@store/useUserQuota";
import { FButton } from "../../../components/FButton";
import { doTrack } from "@utils/dataTrack";

export const CHANNEL = {
  easypaisa: 1,
  jazzcash: 3,
  hbl: 4,
  paypro: 5,
  1: "Easypaisa",
  3: "Jazzcash",
  5: "PayPro",
  4: "Easypaisa Wallet",
};

export default function Repay({ navigation, route }) {
  const [channel, setChannel] = useState();
  const [bill] = useUserQuota((s) => [s.bill]);
  const [paymentData, setPaymentData] = useState();
  const copyToClipboard = async (copyText) => {
    await Clipboard.setStringAsync(copyText);
  };
  const { mutate: getRepayCode, data } = useGetRepayCode();

  useEffect(() => {
    const channel = route.params ? route.params.channel : false;
    setChannel(channel);
  }, [route]);
  useEffect(() => {
    if (data?.data?.error_code == 1) {
      setPaymentData(data?.data?.data.paymentData);
    }
  }, [data]);

  useEffect(() => {
    getRepayCode({
      businessId: bill.loanId,
      amount: bill.applyAmount,
      channel: channel || 1,
    });
  }, [channel]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, height: "100%" }}>
        <BillCard />

        {/* 还款name 和 id */}
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 20,
            backgroundColor: "#FFFFFF",
            marginTop: 20,
            borderRadius: 4,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#4F5E6F", fontSize: 16 }}>
                Account Name:{" "}
              </Text>
              <Text style={{ color: "#0A233E", fontSize: 16 }}>
                {paymentData?.channelText}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                doTrack("pk20", 1);
                copyToClipboard("AlphaCash");
              }}
            >
              <Text
                style={{
                  color: "#0825B8",
                  fontSize: 16,
                  textDecoration: "underline",
                }}
              >
                Copy
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#F4F5F7",
              marginVertical: 20,
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#4F5E6F", fontSize: 16 }}>Consumer:</Text>
              <Text style={{ color: "#0A233E", fontSize: 16 }}>
                {paymentData?.paymentCode}
              </Text>
            </View>

            <Pressable
              onPress={() => {
                doTrack("pk3", 1);
                copyToClipboard("12312312313");
              }}
            >
              <Text
                style={{
                  color: "#0825B8",
                  fontSize: 16,
                  textDecoration: "underline",
                }}
              >
                Copy
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Notice */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "#8899AC", fontSize: 12 }}>提示：</Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Text style={{ color: "#8899AC", fontSize: 12 }}>
              使用 EasyPaisa 进行还款，操作说明{" "}
            </Text>
            <Pressable
              onPress={() => {
                navigation.push("RepayDemo", { type: CHANNEL[channel] });
              }}
            >
              <Text
                style={{ color: "#0825B8", fontSize: 12 }}
              >{`点击查看>>`}</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <FButton
        onPress={() => navigation.goBack()}
        title="Submit"
        style={{ bottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    padding: 15,
    height: "100%",
  },
});
