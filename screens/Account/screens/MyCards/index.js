import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image,
  Pressable,
} from "react-native";
import { Modal } from "@ant-design/react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  useDeleteEWalletAccount,
  useDeleteBankAccount,
  useGetAccounts,
  useUpdateAccount,
} from "@apis";
import { useIsFocused } from "@react-navigation/native";
import { useSystemStore } from "@store/useSystemStore";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle, getMarginRightOrLeft } from "@styles";
import { getRTLView } from "../../../../styles";

function BankCard({ card, selected, isSelectAccount }) {
  const { i18n, locale } = useI18n();

  return (
    <View
      style={[
        styles.cardContainer,
        isSelectAccount && selected ? styles.cardSelected : {},
      ]}
    >
      <View
        style={[{
          width: "100%",
          justifyContent: "space-between",
        }, getRTLView(locale)]}
      >
        <Text style={styles.cardTitle}>{card.bankName}</Text>
        {isSelectAccount && (
          <Image
            source={
              selected
                ? require("@assets/images/bank_card_radio_sel.png")
                : require("@assets/images/unSelected.png")
            }
            contentFit="cover"
            transition={200}
            style={{ width: 20, height: 20 }}
          />
        )}
      </View>
      <View
        style={[{
          alignItems: "center",
          width: '100%',
        }, getRTLView(locale)]}
      >
        <Image
          source={require("@assets/images/loan_ic_bank.png")}
          contentFit="cover"
          transition={200}
          style={[{ width: 32, height: 32 }, getMarginRightOrLeft(locale, 20)]}
        />
        <Text style={styles.cardNumber}>
          {card.bankAccount
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .replace(/\s*$/, "")}
        </Text>
      </View>
    </View>
  );
}

function EWalletCard({ card, selected, isSelectAccount }) {
  const { i18n, locale } = useI18n();
  return (
    <View
      style={[
        styles.cardContainer,
        isSelectAccount && selected ? styles.cardSelected : {},
      ]}
    >
      <View
        style={[{
          width: "100%",
          justifyContent: "space-between",
        }, getRTLView(locale)]}
      >
        <Text style={styles.cardTitle}>{card.ewalletName}</Text>
        {isSelectAccount && (
          <Image
            source={
              selected
                ? require("@assets/images/bank_card_radio_sel.png")
                : require("@assets/images/unSelected.png")
            }
            contentFit="cover"
            transition={200}
            style={{ width: 20, height: 20 }}
          />
        )}
      </View>

      <View
        style={[{
          width: '100%',
          alignItems: "center",
        }, getRTLView(locale)]}
      >
        <Image
          source={
            card.ewalletType == 1
              ? require("@assets/images/loan_ic_easypaisa.png")
              : require("@assets/images/loan_ic_jazzcash.png")
          }
          contentFit="cover"
          transition={200}
          style={[{ width: 32, height: 32 }, getMarginRightOrLeft(locale, 20)]}
        />
        <Text style={styles.cardNumber}>
          {card.ewalletAccount
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .replace(/\s*$/, "")}
        </Text>
      </View>
    </View>
  );
}

function getCardKey(card) {
  if (card.type == 1) {
    console.log('`${card.type}_${card.bankAccountId}`', `${card.type}_${card.bankAccountId}`)
    return `${card.type}_${card.bankAccountId}`;
  }
  console.log('`${card.type}_${card.ewalletId}`', `${card.type}_${card.ewalletId}`)
  return `${card.type}_${card.ewalletId}`;
}

export default function MyCards({ navigation, route }) {
  const [selectedCardId, setSelectedCardId] = useState();
  const [listData, setListData] = useState();
  const [isSelectAccount, setIsSelectAccount] = useState(false);
  const { mutate: getAccounts, data: cards, isLoading } = useGetAccounts();
  const { mutate: deleteEWallet, isLoading: isRemovingEWallet } =
    useDeleteEWalletAccount();
  const { mutate: deleteBankAccount, isLoading: isRemovingBankCard } =
    useDeleteBankAccount();
  const { mutate: updateAccount, data: updateAccountData } = useUpdateAccount();
  const { i18n, locale } = useI18n();
  // TODO: 1. 选择某个 wallet  2. confirm (xxxStore -> useXXXStore)

  const [currentCard, setCurrentCard] = useState({});
  const [isApplySelect, setIsApplySelect] = useState(false);
  const [isUpdateAccount, setIsUpdateAccount] = useState(false);
  const [loanId, setLoanId] = useState("");

  const store = useSystemStore();
  const [currentUserCardInfo, setCardInfo, cleanCardInfo] = useSystemStore(
    (s) => [
      s.usersInfo[s.phone]?.cardInfo ?? {},
      s.setCardInfo,
      s.cleanCardInfo,
    ]
  );
  React.useEffect(() => {
    // const editAccountId = route.params ? route.params.accountId : '';
    // const editAccountType = route.params ? route.params.type : '';
    const isApplySelect = route.params ? route.params.isApplySelect : false;
    const isUpdateWallet = route.params ? route.params.isUpdateWallet : false;
    const loanId = route.params ? route.params.loanId : "";
    // console.log("editAccountId", editAccountId);
    // console.log("editAccountType", editAccountType);
    setIsApplySelect(isApplySelect);
    setIsUpdateAccount(isUpdateWallet);
    setLoanId(loanId);
    if (isApplySelect || isUpdateWallet) {
      setIsSelectAccount(true);
    }
  }, [route]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAccounts();
  }, [isFocused]);

  useEffect(()=> {
    if (updateAccountData?.data?.error_code == 1) {
      navigation.navigate('HomePage');
    }
  }, [updateAccountData]);

  useEffect(() => {
    if (cards && cards.data && Array.isArray(cards.data.data)) {
      console.log("cards.----", cards.data.data);
      setListData(
        cards.data.data.map((item, index) => {
          return {
            ...item,
            key: `${index}_account`,
          };
        })
      );
    } else {
      setListData([]);
    }
  }, [cards]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (card, rowKey) => {
    Modal.alert(
      "",
      `Are you sure you want to turn off ${
        card.ewalletName || card.bankName
      } the repayment tips?`,
      [
        {
          text: i18n.t("Cancel"),
          onPress: () => console.log("cancel"),
          style: { color: "#C0C4D6" },
        },
        {
          text: i18n.t("Confirm"),
          onPress: async () => {
            if (
              card.bankAccountId == currentUserCardInfo.bankAccountId ||
              card.ewalletId == currentUserCardInfo.ewalletId
            ) {
              cleanCardInfo();
            }
            if (card.type == 1) {
              deleteBankAccount({
                bankAccountId: card.bankAccountId,
              });
            } else {
              deleteEWallet({
                ewalletId: card.ewalletId,
              });
            }
            setTimeout(() => {
              getAccounts();
            }, 500);
          },
          style: { color: "#0825B8" },
        },
      ]
    );
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const setSelectedCurrentCard = (card) => {
    setSelectedCardId(getCardKey(card));
    setCurrentCard(card);
  };

  const renderItem = (card) => {
    return (
      <TouchableHighlight
        onPress={() => setSelectedCurrentCard(card.item)}
        style={styles.rowFront}
        underlayColor={"#AAA"}
      >
        {card.item.type == 1 ? (
          <BankCard
            card={card.item}
            selected={getCardKey(card.item) == selectedCardId}
            isSelectAccount={isSelectAccount}
          />
        ) : (
          <EWalletCard
            card={card.item}
            selected={getCardKey(card.item) === selectedCardId}
            isSelectAccount={isSelectAccount}
          />
        )}
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => {
            closeRow(rowMap, data.item.key);
            //TODO: goto edit page
            navigation.navigate({
              name: "AddNewAccount",
              params: { card: data.item },
              merge: true,
            });
          }}
        >
          <Text style={styles.backTextWhite}>{i18n.t("Edit")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => {
            deleteRow(data.item, data.index);
          }}
        >
          <Text style={styles.backTextWhite}>{i18n.t("Confirm Delete")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const confirm = () => {
    setCardInfo(currentCard);

    if (isApplySelect) {
      doTrack("pk17", 1);
      navigation.navigate('Apply');
    }
    if (isUpdateAccount) {
      updateAccount({ loanId, ...currentCard });

    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, getWritingDirectionStyle(locale)]}>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          backgroundColor: "white",
          minHeight: "100%",
          paddingBottom: 40,
        }}
      >
        {!isLoading && !!listData && listData.length < 5 ? (
          <Pressable
            onPress={() => {
              doTrack("pk2", 1);
              navigation.push("AddNewAccount");
            }}
          >
            <View
              style={{
                height: 62,
                padding: 15,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: "#C0C4D6",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@assets/images/loan_ic_add.png")}
                contentFit="cover"
                transition={200}
                style={{ width: 15, height: 15, marginRight: 8 }}
              />
              <Text
                style={{
                  color: "#0A233E",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {i18n.t("Add Collection Account")}
              </Text>
            </View>
          </Pressable>
        ) : (
          <></>
        )}
        {!isLoading && (
          <View style={styles.container}>
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={0}
              rightOpenValue={-150}
              previewRowKey={"0"}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {isSelectAccount && (
          <TouchableOpacity
            onPress={() => confirm()}
            style={[{
              backgroundColor: "#0825B8",
              height: 48,
              zIndex: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 3,
            }, getRTLView(locale)]}
          >
            <Text style={{ color: "#FFFFFF", fontSize: 16 }}>
              {i18n.t("Confirm")}
            </Text>
            <Image
              source={require("@assets/applyLoan/btn_ic_right.png")}
              style={{ width: 12, height: 12, marginLeft: 2 }}
            ></Image>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backTextWhite: {
    color: "#FFF",
    textAlign: "center",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "white",
    borderBottomColor: "black",
    justifyContent: "center",
    marginVertical: 15,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 15,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    height: 99,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    height: 99,
    right: 0,
  },
  cardContainer: {
    height: 99,
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#C0C4D6",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  cardSelected: { borderColor: "#0825B8", borderWidth: 2 },
  cardTitle: {
    color: "#4F5E6F",
    fontSize: 16,
    marginBottom: 10,
  },
  cardNumber: {
    color: "#0A233E",
    fontSize: 20,
    fontWeight: "bold",
  },
});
