import { Image, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { Process } from "./Process";
import { FButton } from "@components/FButton";
import { useUserQuota } from "@store";
import { useEffect, useState } from "react";

function BillBrief({ bill }) {
  const { i18n } = useI18n();

  if (!bill) return <></>;
  return (
    <View style={{ 
      paddingLeft: 15,
      paddingRight: 15
    }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#4F5E6F",
            fontSize: 15,
          }}
        >
        {i18n.t('LoanTerm')}
        </Text>
        <Text
          style={{
            color: "#0A233E",
            fontSize: 15,
          }}
        >{`${bill.loanCycle} days`}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "#4F5E6F",
            fontSize: 15,
          }}
        >
          {i18n.t('Apply Date')}
        </Text>
        <Text
          style={{
            color: "#0A233E",
            fontSize: 15,
          }}
        >
          {bill.applyTime}
        </Text>
      </View>
    </View>
  );
}

export function QuotaButtons() {
  const { i18n } = useI18n();
  const navigation = useNavigation();
  const [cashLoan, bill, hasBill] = useUserQuota((s) => [
    s.cashLoan,
    s.bill,
    s.hasBill,
  ]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(cashLoan.isModifyInfo || cashLoan.isModifyFaceImage);
  }, [cashLoan]);

  if (hasBill) {
    return (
      <View style={{
        paddingLeft: 15,
        paddingRight: 15
      }}>
        {/* bill brief */}
        <BillBrief bill={bill} />

        {/* need modify some info */}
        {hasError && (
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 15,
                marginBottom: 15,
              }}
            >
              <Text
                style={{
                  color: "#EF3C34",
                  lineHeight: 20,
                }}
              >
                <Image
                  source={require("@assets/images/home_ic_warn.png")}
                  style={{
                    width: 20,
                    height: 20,
                    //transform: "translateY(4px)",
                    transform: [{ translateY: 4 }],
                    marginRight: 5,
                  }}
                />
                The payment cannot be made successfully because your account
                number is wrong,please modify the account number
              </Text>
            </View>

            <FButton
              title="Edit Now"
              onPress={() => {
                if (cashLoan.isModifyInfo) {
                  navigation.push("Apply", { isUpdateWallet: true });
                } else if (cashLoan.isModifyFaceImage) {
                  navigation.push("MyCards");
                }
              }}
            />
          </View>
        )}
        {!hasError && hasBill && (
          <View style={{
            marginTop: 20
          }}>
            <FButton
              title="RepayNow"
              onPress={() => navigation.push('Apply')}
              style={{
                marginBottom: 10
              }}
            />
            <FButton
              title="ViewDetails"
              onPress={() => console.log("go to bill detail")}
            />
          </View>
        )}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FButton
        style={{
          marginRight: 15,
          marginLeft: 15,
        }}
        onPress={() => navigation.push("Apply")}
        title={i18n.t('GetLoan')}
        disabled={cashLoan.isEligible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingBottom: 15,
    borderRadius: 4,
  },
});




