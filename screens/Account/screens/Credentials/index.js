import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import FList from "@components/FList";
import { useGetUserFormStatus } from "@apis";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";

const Item = (item) => {
  const { i18n } = useI18n();
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={{
          width: 32,
          height: 32,
          marginRight: 12,
        }}
      />
      <Text>{i18n.t(item.title)}</Text>
    </View>
  );
};

const listItems = [
  {
    title: "Personal Info",
    screen: "Personal",
    leftIcon: require("@assets/images/mine_ic_personal_info.png"),
    leftItem: Item,
  },
  {
    title: "Work Info",
    screen: "Job",
    leftIcon: require("@assets/images/mine_ic_wok_info.png"),
    leftItem: Item,
  },
  {
    title: "Reference Contact",
    screen: "Emergency",
    leftIcon: require("@assets/images/mine_ic_reference_contact.png"),
    leftItem: Item,
  },
  {
    title: "Identity Info",
    screen: "Certificate",
    leftIcon: require("@assets/images/mine_ic_identity_info.png"),
    leftItem: Item,
  },
];

export default function Credentials() {
  const { mutate: getUserFormStatus, data, isLoading } = useGetUserFormStatus();
  const [displayItems, setDisplayItems] = useState(listItems);
  const { i18n } = useI18n();
  const navigation = useNavigation();

  useEffect(() => {
    getUserFormStatus();
  }, []);

  useEffect(() => {
    if (data?.data?.error_code == 1) {
      const status = data?.data?.data || {};

      if (status.isCompletedPersonal) {
        listItems[0].rightIcon = require("@assets/images/checked.png");
        listItems[0].parameters = {
          isUpdate: status.isCompletedPersonal
        };
      }
      if (status.isCompletedWork) {
        listItems[1].rightIcon = require("@assets/images/checked.png");
        listItems[1].parameters = {
          isUpdate: status.isCompletedWork
        };
      }
      if (status.isCompletedContact) {
        listItems[2].rightIcon = require("@assets/images/checked.png");
        listItems[2].parameters = {
          isUpdate: status.isCompletedContact
        };
      }
      if (status.isCompletedIdentity) {
        listItems[3].rightIcon = require("@assets/images/checked.png");
        listItems[3].parameters = {
          isUpdate: status.isCompletedIdentity
        };
      }
      setDisplayItems([...listItems]);
    }
  }, [data]);

  const checkFormStates = ({parameters = {}, screen}) => {
    if (parameters.isUpdate) {
      navigation.push(screen);
    } else if(!displayItems[0]?.parameters?.isUpdate) {
      navigation.push('Personal');
    } else if(!displayItems[1]?.parameters?.isUpdate) {
      navigation.push('Job');
    } else if(!displayItems[2]?.parameters?.isUpdate) {
      navigation.push('Emergency');
    } else if(!displayItems[3]?.parameters?.isUpdate) {
      navigation.push('Certificate');
    }
  };

  return (
    <SafeAreaView style={styles.itemsContainer}>
      <Spinner
        visible={isLoading}
        textContent={i18n.t('Loading')}
        textStyle={{ color: "#FFF" }}
      />
      <FList data={displayItems} itemStyle={styles.FList} clickItem = {(item) => checkFormStates(item)}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    margin: 15,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FList: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    paddingVertical: 30,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
  },
});
