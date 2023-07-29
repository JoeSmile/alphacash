import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Pressable,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOAN_STATUS, statusToImg } from "@const";
import { formatNumberToFinancial as fn2f } from "@utils";
import { useI18n, LocaleTypes } from "@hooks/useI18n";

const Item = ({ item }) => {
  const { i18n } = useI18n();
  const navigation = useNavigation();
  const hasDueDateBillStatus = [LOAN_STATUS.using, LOAN_STATUS.overdue];
  return (
    <Pressable
      onPress={() => [
        navigation.push("BillDetail", {
          loanId: item.loanId,
        }),
      ]}
    >
      <View style={styles.item}>
        <Image
          source={statusToImg[item.appStatus]}
          contentFit="cover"
          transition={1000}
          style={styles.imgTag}
        />
        <View>
          <Text style={styles.title}>{`${i18n.t('Loan Amount')}: `} </Text>
          <Text style={styles.amount}>{fn2f(item.applyAmount)}</Text>
        </View>
        <View style={styles.line}></View>
        <View>
          <View style={{ ...styles.info, marginBottom: 12 }}>
            <Text style={styles.title}>{`${i18n.t('LoanTerm')}: `} </Text>
            <Text style={styles.titleValue}>{item.loanTerm}{i18n.t('Days')}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{`${i18n.t('Apply Date')}: `} </Text>
            <Text style={styles.titleValue}>{item.applyDate}</Text>
          </View>
          {!!item.repaymentDate && (
            <View style={{ ...styles.info, marginTop: 12 }}>
              <Text style={styles.title}>{`${i18n.t('Repayment Date')}: `} </Text>
              <Text style={styles.titleValue}>{item.repaymentDate}</Text>
            </View>
          )}
          {hasDueDateBillStatus.includes(item.appStatus) && !!item.dueDate && (
            <View style={{ ...styles.info, marginTop: 12 }}>
              <Text style={styles.title}>{`${i18n.t('Due Date')}: `} </Text>
              <Text style={styles.titleValue}>{item.dueDate}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default function BillList({ bills }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={bills}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.loanId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#ffffff",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 15,
    marginTop: 12,
    borderRadius: 4,
  },
  title: { color: "#4F5E6F", fontSize: 14, lineHeight: 20 },
  imgTag: {
    width: 102,
    height: 73,
    position: "absolute",
    right: 0,
    top: 0,
  },
  amount: {
    color: "#0A233E",
    fontSize: 28,
    marginTop: 8,
    lineHeight: 40,
  },
  line: {
    backgroundColor: "#F4F5F7",
    height: 0.5,
    marginVertical: 16,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleValue: {
    color: "#0A233E",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 20,
  },
});
