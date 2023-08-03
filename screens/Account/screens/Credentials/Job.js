import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { Formik } from "formik";

import { FTextInput, FSelect } from "@components/Inputs";
import {
  workFieldOptions,
  serviceLengthOptions,
  monthlyIncomeOptions,
  citiesOptions,
  provincesOptions,
  otherLoanOptions,
} from "@const";
import Return from "./Return";
import * as Yup from "yup";
import {
  useWorkInfoOptions,
  useGetWorkInfoDetail,
  useUpdateWorkInfo,
} from "@apis";
import { useEffect, useState } from "react";
import { useI18n } from "@hooks/useI18n";

const emptyJobFormValues = {
  workField: "",
  workName: "",
  companyName: "",
  companyPhone: "",
  serviceLength: "",
  monthlyIncome: "",
  companyProviceId: "",
  companyCityId: "",
  companyAddressDetail: "",
  haveOtherLoans: "",
  lendingInstitution: "",
  loanAmount: "",
  companyProviceName: "",
  companyCityName: "",
};

const JobFormSchema = Yup.object().shape({
  workField: Yup.string().required("Required"),
  workName: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  companyPhone: Yup.string()
    .matches(/^\d{11}$/, "Please input correct phone number")
    .required("Required"),
  serviceLength: Yup.string().required("Required"),
  monthlyIncome: Yup.string().required("Required"),
  companyProviceId: Yup.string().required("Required"),
  companyCityId: Yup.string().required("Required"),
  companyAddressDetail: Yup.string().required("Required"),
  haveOtherLoans: Yup.string(),
  lendingInstitution: Yup.string(),
  loanAmount: Yup.string(),
  companyProviceName: Yup.string().required("Required"),
  companyCityName: Yup.string().required("Required"),
});

export default function Job({ navigation }) {
  const {
    mutate: getWorkInfoOptions,
    data: workOptions,
    isLoading: isOptionsDataLoading,
  } = useWorkInfoOptions();
  const {
    mutate: getWorkInfo,
    data: workInfo,
    isLoading: isWorkInfoLoading,
  } = useGetWorkInfoDetail();
  const { mutate: updateWorkInfo, data: updateWorkInfoResponse } =
    useUpdateWorkInfo();

  const [initialValues, setInitialValues] = useState();
  const [sMonthlyIncomeOptions, setSMonthlyIncomeOptions] =
    useState(monthlyIncomeOptions);
  const [occupationOptions, setOccupationOptions] = useState(workFieldOptions);
  const [serviceTimeOptions, setServiceTimeOptions] =
    useState(serviceLengthOptions);
  const { i18n } = useI18n();

  useEffect(() => {
    getWorkInfo();
    getWorkInfoOptions();
  }, []);
  useEffect(() => {
    if (workOptions && workOptions.data.error_code == 1) {
      setSMonthlyIncomeOptions(workOptions.data.data.monthlyIncomeOptions);
      setOccupationOptions(workOptions.data.data.occupationOptions);
      setServiceTimeOptions(workOptions.data.data.serviceTimeOptions);
    }
  }, [workOptions]);

  useEffect(() => {
    if (workInfo && workInfo.data.error_code == 1) {
      setInitialValues({
        ...emptyJobFormValues,
        ...workInfo.data.data.workInfo,
      });
    }
  }, [workInfo]);

  useEffect(() => {
    if (updateWorkInfoResponse && updateWorkInfoResponse.data.error_code == 1) {
      navigation.push("Emergency");
    }
  }, [updateWorkInfoResponse]);

  return (
    <ScrollView style={styles.container}>
      {!isWorkInfoLoading && !isOptionsDataLoading && !!initialValues && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            const provinceId = values["companyProviceId"];
            const cityId = values["companyCityId"];
            const workId = values["workField"];
            const parameters = values;
            parameters["workName"] = workFieldOptions.filter(
              (work) => work.value == workId
            )[0].label;
            parameters["companyProviceName"] = provincesOptions.filter(
              (province) => province.province_id == provinceId
            )[0].province_name;
            parameters["companyCityName"] = citiesOptions.filter(
              (province) => province.city_id == cityId
            )[0].city_name;
            updateWorkInfo(parameters);
          }}
          validateOnChange={true}
          validateOnBlur={true}
          validationSchema={JobFormSchema}
        >
          {({ handleSubmit, values, setFieldValue }) => (
            <>
              <View style={styles.module}>
                <FSelect
                  name="workField"
                  label="Working Field"
                  options={workFieldOptions}
                />
              </View>

              <View style={styles.module}>
                <FTextInput name="companyName" label="Company Name" />
              </View>
              <View style={styles.module}>
                <FTextInput name="companyPhone" label="Company Phone" />
              </View>
              <View style={styles.module}>
                <FSelect
                  name="serviceLength"
                  label="Length Service"
                  options={serviceTimeOptions}
                />
              </View>
              <View style={styles.module}>
                <FSelect
                  name="monthlyIncome"
                  label="Monthly Income"
                  options={sMonthlyIncomeOptions}
                />
              </View>

              <View
                style={{
                  marginBottom: 15,
                }}
              >
                <Text>{i18n.t("Company Address")}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <FSelect
                      name="companyProviceId"
                      label="Province"
                      options={provincesOptions}
                      valueKey="province_id"
                      labelKey="province_name"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <FSelect
                      name="companyCityId"
                      label="City"
                      options={citiesOptions.filter((city) =>
                        values["companyProviceId"]
                          ? city.province_id == values["companyProviceId"]
                          : true
                      )}
                      valueKey="city_id"
                      labelKey="city_name"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.module}>
                <FTextInput
                  name="companyAddressDetail"
                  label="Detailed Address"
                />
              </View>

              <View
                style={{
                  height: 80,
                  marginBottom: 15,
                  gap: 5,
                }}
              >
                <Text>{i18n.t("Have Other Loans?")}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {otherLoanOptions.map((item) => (
                    <View
                      key={item.label}
                      style={{
                        flex: 1,
                      }}
                    >
                      <Pressable
                        onPress={() =>
                          setFieldValue("haveOtherLoans", item.value)
                        }
                      >
                        <Text
                          style={[
                            styles.loanBtn,
                            item.value == values["haveOtherLoans"]
                              ? styles.loanBtnSelected
                              : {},
                          ]}
                        >
                          {item.label}
                        </Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>

              {values["haveOtherLoans"] == 2 && (
                <View style={{ height: 180, marginBottom: 20 }}>
                  <View style={{ height: 80, marginBottom: 15 }}>
                    <FTextInput
                      name="lendingInstitution"
                      label="Lending Institution"
                    />
                  </View>
                  <View style={{ height: 80 }}>
                    <FTextInput name="loanAmount" label="Loan Amount" />
                  </View>
                </View>
              )}

              <Pressable
                style={{
                  height: 46,
                  marginBottom: 15,
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
                  {i18n.t("Next")}{" "}
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 900,
    backgroundColor: "white",
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },
  loanBtn: {
    borderRadius: 10,
    textAlign: "center",
    paddingVertical: 10,
    color: "#99A5B4",
  },
  loanBtnSelected: {
    color: "#032BB1",
    backgroundColor: "#E6E8F7",
  },
  module: {
    height: 90,
    marginBottom: 15,
  },
});
