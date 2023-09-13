import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Text,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { FTextInput, FSelect } from "@components/Inputs";
import { useSystemStore } from "@store/useSystemStore";

import Return from "./Return";
import {
  useGetReferenceContactOptions,
  useGetReferenceContactDetail,
  useUpdateReferenceContact,
} from "@apis/hooks";
import { useEffect, useState } from "react";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle, getRevertImage } from "@styles";
import { getRTLView } from "../../../../styles";

const initialValues = {
  relationship1: "",
  name1: "",
  phoneNumber1: "",
  relationship2: "",
  name2: "",
  phoneNumber2: "",
};

const getEmergencyFormSchema = (phone) => {
  return Yup.object().shape({
    relationship1: Yup.number().required("Required"),
    name1: Yup.string().required("Required"),
    phoneNumber1: Yup.string()
      .matches(/^\d{11}$/, "Please input 11 characters phone number")
      .notOneOf([phone], "should be same as your phone number")
      .required("Required"),
    relationship2: Yup.number().required("Required"),
    name2: Yup.string().required("Required"),
    phoneNumber2: Yup.string()
      .matches(/^\d{11}$/, "Please input 11 characters phone number")
      .notOneOf(
        [Yup.ref("phoneNumber1")],
        "Two phone numbers should be same, please input again"
      )
      .test("phone", "should be same as your phone number", (val, context) => {
        if (val == phone) {
          return false;
        }
        return true;
      })
      .required("Required"),
  });
};

export default function Emergency({ navigation, route }) {
  const {
    mutate: getReferenceContacts,
    data: referenceContactsData,
    isLoading: isGetReferenceContactsLoading,
  } = useGetReferenceContactDetail();
  const { mutate: getOptions, data: options } = useGetReferenceContactOptions();
  const { mutate: updateReferenceContacts, data: updateContactsResponse } =
    useUpdateReferenceContact();
  const [initialReferenceContactInfo, setInitialReferenceContactInfo] =
    useState();
  const [relationShipOptions, setRelationShipOptions] = useState();
  const [relationShipOptions_1, setRelationShipOptions_1] = useState();
  const { i18n, locale } = useI18n();
  const [isUpdate, setIsUpdate] = useState(false);
  const [phone] = useSystemStore((s) => [s.phone]);
  const [fromScreen, setFromScreen] = useState("");

  useEffect(() => {
    getReferenceContacts();
    getOptions();
  }, []);

  useEffect(() => {
    const isUpdate = route.params ? route.params.isUpdate : false;
    const fromScreen = route.params ? route.params.fromScreen : "";
    setFromScreen(fromScreen);
    setIsUpdate(!!isUpdate);
  }, [route]);

  useEffect(() => {
    if (referenceContactsData && referenceContactsData.data) {
      const referenceContactInfo =
        referenceContactsData.data.data?.referenceContactInfo;

      if (referenceContactInfo != null) {
        referenceContactInfo.contacts.forEach((info, index) => {
          initialValues[`relationship${index + 1}`] = info.relationship;
          initialValues[`name${index + 1}`] = info.name;
          initialValues[`phoneNumber${index + 1}`] = info.phoneNumber;
        });
      }

      setInitialReferenceContactInfo({
        ...initialValues,
      });
    }
  }, [referenceContactsData]);

  useEffect(() => {
    if (options && options.data) {
      setRelationShipOptions(options.data.data.relationShipOptions);
      setRelationShipOptions_1(options.data.data.relationShipOptions_1);
    }
  }, [options]);

  useEffect(() => {
    if (updateContactsResponse && updateContactsResponse.data.error_code == 1) {
      doTrack("pk38", 1);
      if (isUpdate) {
        navigation.goBack();
      } else {
        navigation.push("Certificate", { fromScreen });
      }
    }
  }, [updateContactsResponse]);

  return (
    <ScrollView style={getWritingDirectionStyle(locale)}>
      <View style={styles.container}>
        {!isGetReferenceContactsLoading &&
          initialReferenceContactInfo &&
          !!relationShipOptions && (
            <Formik
              initialValues={initialReferenceContactInfo}
              onSubmit={(values) => {
                updateReferenceContacts({
                  creditType: 1,
                  contacts: JSON.stringify([
                    {
                      relationship: values.relationship1,
                      name: values.name1,
                      phoneNumber: values.phoneNumber1,
                    },
                    {
                      relationship: values.relationship2,
                      name: values.name2,
                      phoneNumber: values.phoneNumber2,
                    },
                  ]),
                });
                // navigation.push('Certificate')
              }}
              validateOnChange={true}
              validateOnBlur={true}
              handleChange={(values) => console.log("values", values)}
              validationSchema={getEmergencyFormSchema(phone)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
              }) => (
                <>
                  <View style={styles.module}>
                    <FSelect
                      name="relationship1"
                      label="Reference Relationship"
                      suffix="1"
                      options={relationShipOptions}
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="name1"
                      label="Reference Name"
                      suffix="1"
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="phoneNumber1"
                      label="Reference Number"
                      hintValue="Please enter the number manually"
                      keyboardType="numeric"
                      displayDigit={11}
                      suffix="1"
                    />
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.module}>
                    <FSelect
                      name="relationship2"
                      label="Reference Relationship"
                      options={relationShipOptions_1}
                      suffix="2"
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="name2"
                      label="Reference Name"
                      suffix="2"
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="phoneNumber2"
                      label="Reference Number"
                      suffix="2"
                      hintValue="Please enter the number manually"
                      keyboardType="numeric"
                      displayDigit={11}
                    />
                  </View>

                  <Pressable
                    style={[{
                      marginHorizontal: 15,
                      marginVertical: 20,
                      backgroundColor: "#0825B8",
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }, getRTLView(locale)]}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        borderRadius: 3,
                        height: 48,
                        lineHeight: 48,
                        color: "#FFFFFF",
                        backgroundColor: "#0825B8",
                        fontSize: 15,
                      }}
                    >
                      {i18n.t("Next")}{" "}
                    </Text>
                    <Image
                      source={require("@assets/images/btn_ic_right.png")}
                      style={[
                        { width: 12, height: 12 },
                        getRevertImage(locale),
                      ]}
                    />
                  </Pressable>
                </>
              )}
            </Formik>
          )}
        <View style={{ paddingHorizontal: 15 }}>
          <Return trackName={"pk10"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "white",
  },
  divider: {
    height: 4,
    backgroundColor: "#F4F5F7",
    marginTop: 20,
    marginBottom: 25,
  },
  module: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
});
