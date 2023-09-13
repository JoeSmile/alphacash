import { View, Text, StyleSheet, Image } from "react-native";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";
import { formatAccountToFinancial as fa2f } from "@utils";
import { getRTLView, getRevertImage, getMarginRightOrLeft } from "../styles";

export default function CollectionAccount() {
  const currentUserCardInfo = useSystemStore(s => s.usersInfo[s.phone]?.cardInfo ?? {});
  const { i18n, locale } = useI18n();
  const account = currentUserCardInfo.bankAccount || currentUserCardInfo.ewalletAccount;

  return (
    <View style={[styles.container, getRTLView(locale)]}>
      <Image
        source={require("@assets/applyLoan/loan_ic_collection_account.png")}
        style={{ width: 35, height: 35 }}
      />
      <View style={[styles.contentStyle, getMarginRightOrLeft(locale, 0, 12)]}>
        <Text style={{ fontSize: 15, color: "#4F5E6F", fontWeight: 500 }}>
          {i18n.t("Collection Account")}
        </Text>
        <Text style={styles.accountStyle}>
          {account ? fa2f(account): i18n.t("Please Select")}
        </Text>
      </View>
      <Image
        source={require("@assets/applyLoan/com_ic_right.png")}
        style={[{ width: 15, height: 15 }, getRevertImage(locale)]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 12,
    marginTop: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },

  contentStyle: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },

  accountStyle: {
    color: "#0A233E",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 8,
  },
});
