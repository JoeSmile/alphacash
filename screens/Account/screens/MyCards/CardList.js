import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Image
} from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import { useCardsInfo } from "./useCardsInfo";

function BankCard ({card, selected}) {
  return (
    <View style={styles.cardContainer}>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.cardTitle}>{card.bankName}</Text>
        <Image source={selected ? require("@assets/images/bank_card_radio_sel.png") :  require("@assets/images/unSelected.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 20, height: 20}} 
        />
      </View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image source={require("@assets/images/loan_ic_bank.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 32, height: 32, marginRight: 20 }} 
        />
        <Text style={styles.cardNumber}>{card.bankAccount.replace(/\s/g, '').replace(/(\d{4})/g, "$1 ").replace(/\s*$/,'')}</Text>
      </View>
    </View>
  )
}

function EWalletCard({card, selected}) {
  return (
    <View style={styles.cardContainer}>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.cardTitle}>{card.ewalletId == 1 ? 'EasyPaisa' : 'Jazzcash'}</Text>
        <Image source={selected ? require("@assets/images/bank_card_radio_sel.png") :  require("@assets/images/unSelected.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 20, height: 20}} 
        />
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image source={
          card.ewalletId == 1 ? require("@assets/images/loan_ic_easypaisa.png") : require("@assets/images/loan_ic_jazzcash.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 32, height: 32, marginRight: 20 }} 
        />
        <Text style={styles.cardNumber}>{card.ewalletAccount.replace(/\s/g, '').replace(/(\d{4})/g, "$1 ").replace(/\s*$/,'')}</Text>
      </View>
    </View>
  )
}


export default function CardList() {
  const cards = useCardsInfo((s) => s.cards);
  const [selectedCardId, setSelectedCardId] = useState();
  const [listData, setListData] = useState(
    cards.map((card, i) => ({
      key: `${i}`,
      text: `card: #`,
    }))
  );

  const closeRow = (rowMap, rowKey) => {
    // if (rowMap[rowKey]) {
    //   rowMap[rowKey].closeRow();
    // }
  };

  const deleteRow = (rowMap, rowKey) => {
    // closeRow(rowMap, rowKey);
    // const newData = [...listData];
    // const prevIndex = listData.findIndex((item) => item.key === rowKey);
    // newData.splice(prevIndex, 1);
    // setListData(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (card) => {
    return (
      <TouchableHighlight
        onPress={() => setSelectedCardId(card.item.type==1 ? card.item.bankAccount : card.item.ewalletAccount )}
        style={styles.rowFront}
        underlayColor={"#AAA"}
      >
        {
          card.item.type == 1 ? 
          <BankCard card={card.item} selected={card.item.bankAccount == selectedCardId}/> : 
          <EWalletCard card={card.item} selected={card.item.ewalletAccount === selectedCardId}/>
        }
      </TouchableHighlight>
    )
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => {
          //TODO: goto edit page
        }}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          //TODO: call delete function
          deleteRow(rowMap, data.item.key)
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={cards}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  backTextWhite: {
    color: "#FFF",
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
    borderColor: '#C0C4D6',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  cardTitle: {
    color: '#4F5E6F',
    fontSize: 16,
    marginBottom: 10
  },
  cardNumber: {
    color: '#0A233E',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
