import React, { useCallback, useEffect } from "react";
import { View, PermissionsAndroid } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
//import * as SmsAndroid from "react-native-get-sms-android";
import BillList from "./BillList";
import { LOAN_STATUS } from "@const";
import { useBillList } from "@apis/hooks";

//const SmsAndroid = NativeModules.Sms;

const curBillStatus = [
  LOAN_STATUS.checking,
  LOAN_STATUS.transferring,
  LOAN_STATUS.failed,
  LOAN_STATUS.using,
  LOAN_STATUS.overdue,
];

export default function Processing() {
  const { mutate: getBills, data: axiosRes, isLoading } = useBillList();
  const bills = axiosRes?.data?.data;

  const filter = {
    box: "inbox",
  };

  const checkPermissions = async () => {
    console.log("checking SMS permissions");
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
      //if (!hasPermissions) return false;
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS
      );
      //if (!hasPermissions) return false;
    } catch (e) {
      console.error(e);
    }

    console.log("hasPermissions: ", hasPermissions);
    return hasPermissions;
  };

  const requestPermissions = async () => {
    let granted = {};
    try {
      console.log("requesting SMS permissions");
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS,
        ],
        {
          title: "Example App SMS Features",
          message: "Example SMS App needs access to demonstrate SMS features",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use SMS features");
      } else {
        console.log("SMS permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const readsmsList = useCallback(async () => {
    console.log("SmsAndroid: ", NativeModules);
    // SmsAndroid?.list(
    //   JSON.stringify(filter),
    //   (fail) => {
    //     console.log("Failed with this error: " + fail);
    //   },
    //   (count, smsList) => {
    //     console.log("Count: ", count);
    //     console.log("List: ", smsList);
    //     var arr = JSON.parse(smsList);

    //     arr.forEach(function (object) {
    //       // 'Object: ' +
    //       console.log(object);
    //       // console.log('-->' + object.date);
    //       // console.log('-->' + object.body);
    //     });
    //   }
    // );
  }, []);

  useEffect(() => {
    getBills({
      tab: 1,
      token: "hICJ9Z153FmphdZ190aacRayObLG9qhW1690181051237866",
    });
    //readsmsList();
    //requestPermissions();
    //checkPermissions();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={isLoading}
        textContent={"Loading..."}
        textStyle={{ color: "#FFF" }}
      />
      {Array.isArray(bills?.orderList) && (
        <View style={{ flex: 1 }}>
          <BillList
            bills={bills.orderList.filter((it) =>
              curBillStatus.includes(it.appStatus)
            )}
          />
        </View>
      )}
    </View>
  );
}
