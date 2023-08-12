import React, { useState, useEffect } from "react";
import {
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

function BankCard({ card, selected, isSelectAccount }) {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
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
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={require("@assets/images/loan_ic_bank.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 32, height: 32, marginRight: 20 }}
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
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
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
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={
            card.ewalletType == 1
              ? require("@assets/images/loan_ic_easypaisa.png")
              : require("@assets/images/loan_ic_jazzcash.png")
          }
          contentFit="cover"
          transition={200}
          style={{ width: 32, height: 32, marginRight: 20 }}
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
    return `${card.type}_${card.bankAccount}`;
  }
  return `${card.type}_${card.ewalletAccount}`;
}

export default function MyCards({ navigation, route }) {
  const [selectedCardId, setSelectedCardId] = useState();
  const [listData, setListData] = useState();
  const [isSelectAccount, setIsSelectAccount] = useState(false);
  const { mutate: getAccounts, data: cards, isLoading } = useGetAccounts();
  const { mutate: deleteEWallet } = useDeleteEWalletAccount();
  const { mutate: deleteBankAccount } = useDeleteBankAccount();
  const { mutate: updateAccount } = useUpdateAccount();
  const { i18n } = useI18n();
  // TODO: 1. 选择某个 wallet  2. confirm (xxxStore -> useXXXStore)

  const [currentCard, setCurrentCard] = useState({});
  const [isApplySelect, setIsApplySelect] = useState(false);
  const [isUpdateAccount, setIsUpdateAccount] = useState(false);
  const [loanId, setLoanId] = useState("");

  const store = useSystemStore();

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

  // useEffect(() => {

  // }, [selectedCardId]);

  useEffect(() => {
    if (cards && cards.data && Array.isArray(cards.data.data)) {
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
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: { color: "#C0C4D6" },
        },
        {
          text: "Confirm",
          onPress: () => {
            if (
              card.bankAccountId == store.cardInfo.bankAccountId ||
              card.ewalletId == store.cardInfo.ewalletId
            ) {
              store.cleanCardInfo();
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
            getAccounts();
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
    store.setCardInfo(currentCard);
    if (isUpdateAccount) {
      updateAccount({ loanId, ...currentCard });
    }

    if (isApplySelect) {
      doTrack("pk17", 1);
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: "white",
        minHeight: "100%",
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
              marginBottom: 15,
            }}
          >
            <Image
              source={require("@assets/images/loan_ic_add.png")}
              contentFit="cover"
              transition={200}
              style={{ width: 15, height: 15, marginRight: 5 }}
            />
            <Text
              style={{
                color: "#0A233E",
                fontSize: 16,
                fontWeight: "bold",
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
          style={{
            bottom: 136,
            left: 12,
            right: 12,
            position: "absolute",
            backgroundColor: "#0825B8",
            height: 46,
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            borderRadius: 3,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
            {i18n.t("Confirm")}
          </Text>
          <Image
            source={require("@assets/applyLoan/btn_ic_right.png")}
            style={{ width: 12, height: 12, marginLeft: 2 }}
          ></Image>
        </TouchableOpacity>
      )}
    </View>
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
