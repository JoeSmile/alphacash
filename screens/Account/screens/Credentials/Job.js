import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Formik } from "formik";

import { FTextInput, FSelect } from "@components/Inputs";
import {
  workFieldOptions,
  serviceLengthOptions,
  monthlyIncomeOptions,
  otherLoanOptions,
} from "@const";
import Return from "./Return";
import * as Yup from "yup";
import {
  useWorkInfoOptions,
  useGetWorkInfoDetail,
  useUpdateWorkInfo,
  useGetProvinceList,
  useGetCityList,
} from "@apis";

import { useEffect, useState } from "react";
import { useI18n } from "@hooks/useI18n";
import { doTrack } from "@utils/dataTrack";
import { getWritingDirectionStyle, getRevertImage } from "@styles";

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
  workField: Yup.number().required("Required"),
  // workName: Yup.string().required("Required"),
  companyName: Yup.string().required("Required"),
  companyPhone: Yup.string()
    .required("Required")
    .test("len", "Please input correct phone number", (val, context) => {
      return val.length <= 11 && val.match("^[0-9]*$");
    }),
  serviceLength: Yup.number().required("Required"),
  monthlyIncome: Yup.number().required("Required"),
  companyProviceId: Yup.number().required("Required"),
  companyCityId: Yup.string().required("Required"),
  companyAddressDetail: Yup.string().required("Required"),
  haveOtherLoans: Yup.number(),
  lendingInstitution: Yup.string().test(
    "required",
    "please input the lending institution",
    (val, context) => {
      if (context.parent.haveOtherLoans == 2) {
        return !!val;
      } else {
        return true;
      }
    }
  ),
  loanAmount: Yup.number().typeError("please input number"),
  // companyProviceName: Yup.string().required("Required"),
  // companyCityName: Yup.string().required("Required"),
});

export default function Job({ navigation, route }) {
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
  const { i18n, locale } = useI18n();
  const [isUpdate, setIsUpdate] = useState(false);
  const [fromScreen, setFromScreen] = useState("");
  const { mutate: getProvinceList, data: provinceListData } =
    useGetProvinceList();
  const { mutate: getCityList, data: cityListData } = useGetCityList();
  const [provinceOptions, setProvinceOptions] = useState();
  const [cityOptions, setCityOptions] = useState();

  useEffect(() => {
    getWorkInfo();
    getWorkInfoOptions();
    getProvinceList();
  }, []);

  useEffect(() => {
    if (provinceListData?.data?.error_code == 1) {
      setProvinceOptions(provinceListData.data.data);
    }
  }, [provinceListData]);

  useEffect(() => {
    if (cityListData?.data?.error_code == 1) {
      setCityOptions(cityListData.data.data);
    }
  }, [cityListData]);

  useEffect(() => {
    const isUpdate = route.params ? route.params.isUpdate : false;
    const fromScreen = route.params ? route.params.fromScreen : "";
    setFromScreen(fromScreen);
    setIsUpdate(!!isUpdate);
  }, [route]);

  useEffect(() => {
    if (workOptions && workOptions.data.error_code == 1) {
      setSMonthlyIncomeOptions(workOptions.data.data.monthlyIncomeOptions);
      setOccupationOptions(workOptions.data.data.occupationOptions);
      setServiceTimeOptions(workOptions.data.data.serviceTimeOptions);
    }
  }, [workOptions]);

  useEffect(() => {
    if (workInfo && workInfo.data.error_code == 1) {
      const info = workInfo.data.data.workInfo;

      getCityList({
        parentId: info?.companyProviceId ?? "1",
      });
      setInitialValues({
        ...emptyJobFormValues,
        ...info,
      });
    }
  }, [workInfo]);

  useEffect(() => {
    if (updateWorkInfoResponse && updateWorkInfoResponse.data.error_code == 1) {
      doTrack("pk26", 1);
      if (isUpdate) {
        navigation.goBack();
      } else {
        navigation.push("Emergency", { fromScreen });
      }
    }
  }, [updateWorkInfoResponse]);

  return (
    <ScrollView style={[styles.container, getWritingDirectionStyle(locale)]}>
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

            parameters["companyProviceName"] = provinceOptions.filter(
              (province) => province.code == provinceId
            )[0].name;
            parameters["companyCityName"] = cityOptions.filter(
              (province) => province.code == cityId
            )[0].name;
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
                <Text style={getWritingDirectionStyle(locale)}>
                  {i18n.t("Company Address")}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    {provinceOptions && (
                      <FSelect
                        name="companyProviceId"
                        label="Province"
                        options={provinceOptions}
                        valueKey="code"
                        labelKey="name"
                        afterChange={({ name, value }) => {
                            // 省份修改后，城市自动清空
                           values["companyCityId"]=0,
                          getCityList({
                            parentId: value,
                          });
                        }}
                      />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    {provinceOptions && cityOptions && (
                      <FSelect
                        name="companyCityId"
                        label="City"
                        options={cityOptions}
                        valueKey="code"
                        labelKey="name"
                      />
                    )}
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
                }}
              >
                <Text style={[getWritingDirectionStyle(locale), styles.label]}>
                  {i18n.t("Have Other Loans?")}
                </Text>
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
                              : styles.btnNoSelected,
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
                  marginVertical: 20,
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
                  style={[{ width: 12, height: 12 }, getRevertImage(locale)]}
                />
              </Pressable>
            </>
          )}
        </Formik>
      )}
      <Return trackName={"pk8"} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: 900,
    backgroundColor: "white",
  },
  label: {
    color: "#4F5E6F",
    lineHeight: 20,
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  loanBtn: {
    fontSize: 15,
    lineHeight: 20,
    borderRadius: 8,
    textAlign: "center",
    paddingVertical: 13,
    borderWidth: 1,
    fontWeight: "500",
  },
  btnNoSelected: {
    color: "#8899AC",
    borderColor: "#C0C4D6",
  },
  loanBtnSelected: {
    color: "#032BB1",
    borderColor: "#0825B8",
    backgroundColor: "rgba(8, 37, 184, 0.1)",
  },
  module: {
    marginBottom: 20,
  },
});
