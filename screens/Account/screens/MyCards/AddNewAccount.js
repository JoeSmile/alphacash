/* tslint:disable:no-console */
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { FTextInput, FSelect } from "@components/Inputs";
import { useAddAccount, useBankList } from "@apis";
import { FButton } from "@components/FButton";
import * as Yup from "yup";
import { useI18n } from "@hooks/useI18n";
import { useSystemStore } from "@store/useSystemStore";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle, getMarginRightOrLeft } from "@styles";

const tabs = [
  {
    title: "Easypaisa",
    source: require("@assets/images/loan_ic_easypaisa.png"),
    name: "EasyPaisa",
    type: 2,
    ewalletType: 1,
    tabId: 1,
  },
  {
    title: "Jazzcash",
    source: require("@assets/images/loan_ic_jazzcash.png"),
    type: 2,
    name: "Jazzcash",
    ewalletType: 2,
    tabId: 2,
  },
  {
    title: "Bank Card",
    source: require("@assets/images/loan_ic_bank.png"),
    type: 1,
    tabId: 3,
  },
];

const style = {
  backgroundColor: "#fff",
  flex: 1,
};

const noticeStyle = {
  color: "#8899AC",
  fontSize: 12,
  lineHeight: 20,
};

const AccountFormSchema = Yup.object().shape({
  account: Yup.string().test(
    "len",
    "Please input correct ewallet account number",
    (val, context) => {
      //ewallet
      if (context.parent.type !== 1) {
        return val?.match("^[0-9]*$");
      } else {
        return true;
      }
    }
  ),
  bankAccount: Yup.string().test(
    "len",
    "Please input correct bank account number",
    (val, context) => {
      //bank
      if (context.parent.type == 1) {
        return val?.match("^[A-Za-z0-9]+$");
      }
      return true;
    }
  ),
});

const defaultEmptyForm = {
  //ewallet account
  account: "",
  //bankAccount
  bankAccount: "",
  // bank
  bankId: "",
  bankAccountName: "",
  // common
  name: "EasyPaisa",
  type: 2,
  ewalletType: 1,
};

function Notice() {
  const { i18n } = useI18n();

  return (
    <View style={{ marginTop: 30 }}>
      <Text style={noticeStyle}>{`${i18n.t("Notice")}:`}</Text>
      <Text style={noticeStyle}>{`${i18n.t("Notice1")}`}</Text>
      <Text style={noticeStyle}>{`${i18n.t("Notice2")}`}</Text>
      <Text style={noticeStyle}>{`${i18n.t("Notice3")}`}</Text>
    </View>
  );
}

export function AddNewAccount({ navigation, route }) {
  const [initialData, setInitialData] = useState();
  const [isLogin, phone] = useSystemStore((s) => [!!s.token, s.phone]);
  const { i18n, locale } = useI18n();
  const [selectedTab, setSelectedTab] = useState({});
  const { mutate: addAccount, data: result } = useAddAccount();
  const { mutate: getBankList, data: rawList, isLoading } = useBankList();
  const [fromScreen, setFromScreen] = useState("");

  useEffect(() => {
    getBankList();
  }, []);

  React.useEffect(() => {
    const card = route.params ? route.params.card : {};
    const fromScreen = route.params ? route.params.fromScreen : "";
    setFromScreen(fromScreen);
    console.log("card---", card);
    setInitialData({
      account: card.ewalletAccount || defaultEmptyForm.account || phone,
      bankAccount: card.bankAccount || defaultEmptyForm.bankAccount,
      // bank
      bankId: card.bankId || defaultEmptyForm.bankId,
      bankAccountName: card.bankAccountName || defaultEmptyForm.bankAccountName,
      // common
      name: card.ewalletName || "EasyPaisa",
      type: card.type || defaultEmptyForm.type,
      ewalletType: card.ewalletId || "EasyPaisa".ewalletType,
      id: card.bankAccountId || card.ewalletId || "",
    });
    setSelectedTab({
      type: card.type || 2,
      ewalletType: card.ewalletType || 1,
      name: card.ewalletName || "EasyPaisa",
      tabId: card.type ? (card.type == 1 ? 3 : card.ewalletType) : 1,
    });
  }, [route]);

  const bankOptions = useMemo(() => {
    if (!isLoading && rawList) {
      return rawList.data.data;
    }
    return [];
  }, [rawList]);

  useEffect(() => {
    if (!result) return;
    if (result.data.error_code == 1) {
      if (fromScreen) {
        navigation.push(fromScreen);
      } else {
        navigation.goBack();
      }
    }
  }, [result]);

  return (
    <ScrollView
      style={[
        { flex: 1, backgroundColor: "white", padding: 15, paddingTop: 24 },
        getWritingDirectionStyle(locale),
      ]}
    >
      <View
        style={{
          minHeight: 570,
        }}
      >
        {!!initialData && (
          <Formik
            initialValues={initialData}
            onSubmit={(values) => {
              let params =
                selectedTab.type == 1
                  ? {
                      // bank
                      type: selectedTab.type,
                      bankAccountName: values.bankAccountName,
                      bankAccount: values.bankAccount,
                      bankId: values.bankId,
                      bankAccountId: values.id,
                      id: values.id,
                    }
                  : {
                      type: selectedTab.type,
                      ewalletType: selectedTab.ewalletType,
                      ewalletAccount: values.account,
                      ewalletId: values.id,
                      ewalletName: selectedTab.name,
                    };
              doTrack("pk31", 1);
              addAccount(params);
            }}
            validateOnChange={true}
            validateOnBlur={true}
            validationSchema={AccountFormSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              context,
              setValues,
            }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 32,
                  }}
                >
                  {tabs.map((tab) => {
                    return (
                      <View key={tab.title} style={{ flex: 1 }}>
                        <Pressable
                          style={{
                            ...styles.tab,
                            borderBottomColor:
                              selectedTab.tabId === tab.tabId
                                ? "#0825B8"
                                : "#E0E3E8",
                          }}
                          onPress={() => {
                            setSelectedTab({
                              tabId: tab.tabId,
                              name: tab.name,
                              type: tab.type,
                              ewalletType: tab.ewalletType,
                            });
                            setValues({
                              ...values,
                              name: tab.name,
                              type: tab.type,
                              ewalletType: tab.ewalletType,
                            });
                          }}
                        >
                          <Image
                            source={tab.source}
                            contentFit="cover"
                            transition={200}
                            style={{ width: 32, height: 32, marginBottom: 8 }}
                          />
                          <Text
                            style={{
                              color:
                                selectedTab.tabId === tab.tabId
                                  ? "#0A233E"
                                  : "#8899AC",
                              ...styles.tabTitle,
                            }}
                          >
                            {tab.title}
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
                {selectedTab.type !== 1 && (
                  <View
                    style={{
                      marginBottom: 25,
                    }}
                  >
                    <FTextInput
                      name="account"
                      label="Mobile Wallect Account"
                      type="text"
                      rightIcon={require("@assets/images/loan_ic_edit.png")}
                    />
                  </View>
                )}

                {/* bank account form */}
                {selectedTab.type == 1 && (
                  <View>
                    <View style={styles.inputContainer}>
                      <FTextInput
                        name="bankAccountName"
                        label="bank account name"
                        type="text"
                      />
                    </View>
                    <View style={styles.inputContainer}>
                      <FTextInput
                        name="bankAccount"
                        label="Bank Account"
                        type="text"
                        rightIcon={require("@assets/images/loan_ic_edit.png")}
                      />
                    </View>
                    {!isLoading && rawList && (
                      <View style={styles.inputContainer}>
                        <FSelect
                          name="bankId"
                          label="Bank name"
                          valueKey="bank_id"
                          labelKey="full_name"
                          options={bankOptions}
                        />
                      </View>
                    )}
                  </View>
                )}
                <FButton onPress={handleSubmit} title="Submit" />
              </>
            )}
          </Formik>
        )}
        <Notice />
        <View style={{height: 24,width:'100%'}}></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "#E0E3E8",
    borderBottomWidth: 2,
  },
  tabTitle: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 15,
  },
});
