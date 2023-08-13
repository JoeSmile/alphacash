import { useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useI18n } from "@hooks/useI18n";
import { formatNumberToFinancial as fn2f } from "@utils";
import { doTrack } from "@utils/dataTrack";

export default function ApplyLoanCard({
  optWithDaysConfig,
  daysOption,
  setDaysOption,
  amountIndex,
  setAmountIndex,
}) {
  const { i18n } = useI18n();
  const opt = optWithDaysConfig[daysOption].opt;
  const applyAmount = opt[amountIndex].applyAmount;
  const stepsLen = opt.length;

  const handleItemPress = useCallback((item, index) => {
    if (item.isApply) {
      // 处理点击事件的逻辑
      doTrack("pk45", item.days);
      setDaysOption(index);
    }
  }, []);

  const Item = useCallback(
    ({ title, index, isApply }) => {
      const isActive = index === daysOption;
      return (
        <View
          style={[
            styles.loanTermUnCheckedStyle,
            isActive && styles.loanTermCheckedStyle,
          ]}
        >
          <Text
            style={{
              color: isActive ? "#262626" : "#8899AC",
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {title + " " + i18n.t("Days")}
          </Text>
          {!isApply && (
            <Image
              source={require("@assets/applyLoan/loan_ic_lock.png")}
              style={{ width: 14, height: 14, marginHorizontal: 2 }}
            />
          )}
        </View>
      );
    },
    [daysOption]
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          marginTop: 24,
          fontSize: 15,
          color: "#0A233E",
          fontWeight: 500,
        }}
      >
        {i18n.t("LoanAmount")}
      </Text>

      <View style={styles.loanAmountStyle}>
        <TouchableOpacity
          onPress={() => {
            amountIndex && setAmountIndex(amountIndex - 1);
          }}
        >
          <Image
            source={require("@assets/applyLoan/loan_btn_minus_disabled.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
        <Text style={{ color: "#0A233E", fontSize: 29, fontWeight: "bold" }}>
          {fn2f(applyAmount)}
        </Text>
        <TouchableOpacity
          onPress={() => {
            amountIndex < stepsLen - 1 && setAmountIndex(amountIndex + 1);
          }}
        >
          <Image
            source={require("@assets/applyLoan/loan_btn_plus_disabled.png")}
            style={styles.imageStyle}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#E0E3E8",
          marginTop: 8,
          width: "88%",
        }}
      />

      <Text
        style={{
          color: "#0A233E",
          fontSize: 15,
          marginTop: 24,
          fontWeight: 500,
        }}
      >
        {i18n.t("LoanTerm")}
      </Text>

      <View style={styles.loanTermBgStyle}>
        {optWithDaysConfig.map((item, index) => (
          <TouchableOpacity
            key={item.days}
            onPress={() => handleItemPress(item, index)}
          >
            <Item title={item.days} index={index} isApply={item.isApply}></Item>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    zIndex: 10,
    width: "100%",
    alignItems: "center",
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },

  imageStyle: {
    width: 27,
    height: 27,
  },

  loanAmountStyle: {
    width: "100%",
    flexDirection: "row",
    marginTop: 18,
    justifyContent: "space-around",
    paddingHorizontal: 12,
    alignItems: "center",
  },

  loanTermBgStyle: {
    marginVertical: 18,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-around",
    flexWrap: "wrap",
  },

  loanTermCheckedStyle: {
    width: 135,
    height: 42,
    borderColor: "#00B295",
    borderWidth: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },

  loanTermUnCheckedStyle: {
    width: 135,
    height: 42,
    borderColor: "#E0E3E8",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
  },
});
