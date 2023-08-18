import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import FList from "@components/FList";
import { useGetUserFormStatus } from "@apis";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@hooks/useI18n";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { cloneDeep } from 'lodash';
import { getWritingDirectionStyle, getMarginRightOrLeft } from '@styles';

const Item = (item) => {
  const { i18n, locale} = useI18n();
  return (
    <View style={styles.item}>
      <Image
        source={item.leftIcon}
        contentFit="cover"
        transition={1000}
        style={[{
          width: 32,
          height: 32,
          
        }, getMarginRightOrLeft(locale, 16)]}
      />
      <Text>{i18n.t(item.title)}</Text>
    </View>
  );
};

const DefaultListItems = [
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
  const [displayItems, setDisplayItems] = useState(DefaultListItems);
  const { i18n, locale } = useI18n();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserFormStatus();
  }, [isFocused]);

  useEffect(() => {
    const listItems = cloneDeep(DefaultListItems);

    if (data?.data?.error_code == 1) {
      const status = data?.data?.data || {};

      listItems[0].rightIcon = status.isCompletedPersonal
        ? require("@assets/images/checked.png")
        : "";
      listItems[0].parameters = {
        isUpdate: status.isCompletedPersonal,
      };

      listItems[1].rightIcon = status.isCompletedWork
        ? require("@assets/images/checked.png")
        : "";
      listItems[1].parameters = {
        isUpdate: status.isCompletedWork,
      };

      listItems[2].rightIcon = status.isCompletedContact
        ? require("@assets/images/checked.png")
        : "";
      listItems[2].parameters = {
        isUpdate: status.isCompletedContact,
      };

      listItems[3].rightIcon = status.isCompletedIdentity
        ? require("@assets/images/checked.png")
        : "";
      listItems[3].parameters = {
        isUpdate: status.isCompletedIdentity,
      };

      setDisplayItems([...listItems]);
    }
  }, [data]);

  const checkFormStates = ({ parameters = {}, screen }) => {
    if (parameters.isUpdate) {
      navigation.push(screen, { isUpdate: true });
    } else if (!displayItems[0]?.parameters?.isUpdate) {
      navigation.push("Personal");
    } else if (!displayItems[1]?.parameters?.isUpdate) {
      navigation.push("Job");
    } else if (!displayItems[2]?.parameters?.isUpdate) {
      navigation.push("Emergency");
    } else if (!displayItems[3]?.parameters?.isUpdate) {
      navigation.push("Certificate");
    }
  };

  return (
    <SafeAreaView style={[styles.itemsContainer, getWritingDirectionStyle(locale)]}>
      <Spinner
        visible={isLoading}
        textContent={i18n.t("Loading")}
        textStyle={{ color: "#FFF" }}
      />
      <FList
        data={displayItems}
        itemStyle={styles.FList}
        clickItem={(item) => checkFormStates(item)}
      />
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
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
  },
});
