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

import Return from "./Return";
import {
  useGetReferenceContactOptions,
  useGetReferenceContactDetail,
  useUpdateReferenceContact,
} from "@apis/hooks";
import { useEffect, useState } from "react";

const initialValues = {
  relationship1: "",
  name1: "",
  phoneNumber1: "",
  relationship2: "",
  name2: "",
  phoneNumber2: "",
};

const EmergencyFormSchema = Yup.object().shape({
  relationship1: Yup.number().required("Required"),
  name1: Yup.string().required("Required"),
  phoneNumber1: Yup.string()
    .matches(/^\d{11}$/, "请输入正确手机号")
    .required("Required"),
  relationship2: Yup.number().required("Required"),
  name2: Yup.string().required("Required"),
  phoneNumber2: Yup.string()
    .matches(/^\d{11}$/, "请输入正确手机号")
    .notOneOf([Yup.ref("phoneNumber1")], "两个联系人号码需不一致，请重新填写")
    .required("Required"),
});

export default function Emergency({ navigation }) {
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

  useEffect(() => {
    getReferenceContacts();
    getOptions();
  }, []);

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
      navigation.push("Certificate");
    }
  }, [updateContactsResponse]);

  return (
    <ScrollView>
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
              validationSchema={EmergencyFormSchema}
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
                      label="Reference Relationship 1"
                      options={relationShipOptions}
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput name="name1" label="Reference Name 1" />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="phoneNumber1"
                      label="Reference Number 1"
                      hintValue="Please enter the number manually"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.module}>
                    <FSelect
                      name="relationship2"
                      label="Reference Relationship 2"
                      options={relationShipOptions_1}
                    />
                  </View>

                  <View style={styles.module}>
                    <FTextInput name="name2" label="Reference Name 2" />
                  </View>

                  <View style={styles.module}>
                    <FTextInput
                      name="phoneNumber2"
                      label="Reference Number 2"
                      hintValue="Please enter the number manually"
                      keyboardType="numeric"
                    />
                  </View>

                  <Pressable
                    style={{
                      height: 46,
                      marginBottom: 15,
                      marginHorizontal: 16,
                      backgroundColor: "#0825B8",
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                      flexDirection: "row",
                    }}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        borderRadius: 3,
                        height: 46,
                        lineHeight: 46,
                        color: "#FFFFFF",
                        backgroundColor: "#0825B8",
                        fontSize: 15,
                      }}
                    >
                      {" "}
                      Next{" "}
                    </Text>
                    <Image
                      source={require("@assets/images/btn_ic_right.png")}
                      style={{ width: 12, height: 12 }}
                    />
                  </Pressable>
                </>
              )}
            </Formik>
          )}
        <Return />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },
  module: {
    height: 90,
    marginBottom: 15,
  },
});
