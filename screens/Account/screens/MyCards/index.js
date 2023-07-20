import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  Pressable
} from "react-native";
import { Modal } from '@ant-design/react-native'
import { SwipeListView } from "react-native-swipe-list-view";
import { useDeleteEWalletAccount, useDeleteBankAccount, useGetAccounts } from '@apis';
import { useIsFocused } from '@react-navigation/native';

function BankCard ({card, selected, isSelectAccount}) {
  return (
    <View style={styles.cardContainer}>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.cardTitle}>{card.bankName}</Text>
        {
          isSelectAccount && <Image source={selected ? require("@assets/images/bank_card_radio_sel.png") :  require("@assets/images/unSelected.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 20, height: 20}} 
        />
        }
        
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

function EWalletCard({card, selected, isSelectAccount}) {
  return (
    <View style={styles.cardContainer}>
      <View style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Text style={styles.cardTitle}>{card.ewalletName}</Text>
        {
          isSelectAccount && <Image source={selected ? require("@assets/images/bank_card_radio_sel.png") :  require("@assets/images/unSelected.png")}
            contentFit="cover"
            transition={200}
            style={{ width: 20, height: 20}} 
          />
        }
      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image source={
          card.ewalletType == 1 ? require("@assets/images/loan_ic_easypaisa.png") : require("@assets/images/loan_ic_jazzcash.png")}
          contentFit="cover"
          transition={200}
          style={{ width: 32, height: 32, marginRight: 20 }} 
        />
        <Text style={styles.cardNumber}>{card.ewalletAccount.replace(/\s/g, '').replace(/(\d{4})/g, "$1 ").replace(/\s*$/,'')}</Text>
      </View>
    </View>
  )
}

function getCardKey (card) {
  if (card.type == 1) {
    return `${card.type}_${card.bankAccount}`
  }
  return  `${card.type}_${card.ewalletAccount}`
}

export default function MyCards({navigation, route}) {
  const [selectedCardId, setSelectedCardId] = useState();
  const [listData, setListData] = useState();
  const [isSelectAccount, setIsSelectAccount] = useState(false);
  const {mutate: getAccounts, data: cards, isLoading} = useGetAccounts();
  const {mutate: deleteEWallet} = useDeleteEWalletAccount();
  const {mutate: deleteBankAccount} = useDeleteBankAccount();
  // TODO: 1. 选择某个 wallet  2. confirm (xxxStore -> useXXXStore)

  React.useEffect(() => {
    // const editAccountId = route.params ? route.params.accountId : '';
    // const editAccountType = route.params ? route.params.type : '';
    const isApplySelect = route.params ? route.params.isApplySelect : true;
    const isUpdateWallet = route.params ? route.params.isUpdateWallet : true;
    // console.log("editAccountId", editAccountId);
    // console.log("editAccountType", editAccountType);
    if (isApplySelect) {
      setIsSelectAccount(true);
    }
  }, [route]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAccounts();
  }, [isFocused]);

  useEffect(() => {
    if (cards && cards.data && Array.isArray(cards.data.data)) {
      setListData(cards.data.data.map((item, index) => {
        return {
          ...item,
          key: `${index}_account`
        }
      }))
    } else {
      setListData([])
    }
  }, [cards]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (card, rowKey) => {
    Modal.alert('', `Are you sure you want to turn off ${card.ewalletName || card.bankName} the repayment tips?`, [
      { text: 'Cancel', onPress: () => console.log('cancel'), style: {color: '#C0C4D6'} },
      { text: 'Confirm', onPress: () => {
        if (card.type == 1) {
          deleteBankAccount({
            bankAccountId: card.bankAccountId
          });
         
        } else {
          deleteEWallet({
            ewalletId: card.ewalletId
          })
        };
        getAccounts();
      }, style: {color: '#0825B8'} },
    ])
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (card) => {
    return (
      <TouchableHighlight
        onPress={() => setSelectedCardId(getCardKey(card.item))}
        style={styles.rowFront}
        underlayColor={"#AAA"}
      >
        {
          card.item.type == 1 ? 
          <BankCard card={card.item} selected={getCardKey(card.item) == selectedCardId} isSelectAccount={isSelectAccount}/> : 
          <EWalletCard card={card.item} selected={getCardKey(card.item) === selectedCardId} isSelectAccount={isSelectAccount}/>
        }
      </TouchableHighlight>
    )
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
            name: 'AddNewAccount',
            params: { card: data.item },
            merge: true,
          });
        }}
      >
        <Text style={styles.backTextWhite}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {
          deleteRow(data.item, data.index);
        }}
      >
        <Text style={styles.backTextWhite}>Delete</Text>
      </TouchableOpacity>
    </View>
    )
  };

  return (
    <View style={{
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: 'white',
      minHeight: '100%'
    }}> 
    {
      (!isLoading && !!listData && listData.length < 5)
     ? 
      <Pressable onPress={() => navigation.push('AddNewAccount')}> 
        <View style={{
          height: 62,
          padding: 15,
          borderWidth: 1,
          borderRadius: 4,
          borderColor: '#C0C4D6',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 15
        }}>
          <Image source={require("@assets/images/loan_ic_add.png")}
            contentFit="cover"
            transition={200}
            style={{ width: 15, height: 15, marginRight: 5 }}/>
            <Text style={{
              color: '#0A233E',
              fontSize: 16,
              fontWeight: 'bold'
            }}>Add Collection Account</Text>
        </View>
      </Pressable>
      : <></>
    }
    {
      !isLoading && <View style={styles.container}>
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
    }
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
