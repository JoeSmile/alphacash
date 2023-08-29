import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { FTextInput, FSelect } from "@components/Inputs";
import SafeIntro from "../SafeIntro";
import * as Yup from "yup";
import { FDatePicker } from "@components/FDatePicker";
import { genderOptions, marriageOptions, educationOptions } from "@const";
import { useEffect, useState } from "react";
import {
  useGetPersonalDetail,
  useUpdatePersonalInfo,
  useGetPersonalOptions,
  useGetProvinceList,
  useGetCityList,
} from "@apis/hooks";
import { useI18n } from "@hooks/useI18n";
import { useUserQuota } from "@store/useUserQuota";
import { doTrack } from "@utils/dataTrack";
import { useAbleImage } from "@hooks/useAbleImage";
import { getWritingDirectionStyle, getRevertImage } from "@styles";

const emptyInitialValues = {
  name: "",
  birth: "1990-01-01",
  gender: "",
  cnic: "",
  education: "",
  maritalStatus: "",
  provinceId: "",
  provinceName: "",
  cityId: "",
  cityName: "",
  addressDetail: "",
  email: "",
};

const PersonalFormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  birth: Yup.string().required("Required"),
  cnic: Yup.string()
    .required("Required")
    .matches(/^\d{13}$/, "Must be exactly 13 characters number"),
  gender: Yup.number().required("Required"),
  education: Yup.number().required("Required"),
  maritalStatus: Yup.number().required("Required"),
  provinceId: Yup.number().required("Required"),
  cityId: Yup.number().required("Required"),
  addressDetail: Yup.string().required("Required"),
  email: Yup.string()
    .matches(
      // @之前必须有内容且只能是字母（大小写）、数字、下划线(_)、减号（-）、点（.）​​​​@和最后一个点（.）之间必须有内容且只能是字母（大小写）、数字、点（.）、减号（-），且两个点不能挨着​​​​最后一个点（.）之后必须有内容且内容只能是字母（大小写）、数字且长度为大于等于2个字节，小于等于6个字节​​
      "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$",
      "Please input correct email address"
    )
    .required("Required"),
});

export default function Personal({ navigation, route }) {
  const { mutate: getPersonalDetail, data, isLoading } = useGetPersonalDetail();
  const { mutate: updatePersonalInfoMutation, data: personalData,isLoading: isUpdatePersonalInfoLoading} = useUpdatePersonalInfo();
  const {
    mutate: getPersonalOptions,
    data: personFormOptions,
    isLoading: isPersonFormOptionsLoading,
  } = useGetPersonalOptions();
  const { mutate: getProvinceList, data: provinceListData } =
    useGetProvinceList();
  const { mutate: getCityList, data: cityListData } = useGetCityList();
  const [initialValues, setInitialValues] = useState();
  const { i18n, locale } = useI18n();
  const [bill, hasBill] = useUserQuota((s) => [s.bill, s.hasBill]);
  const [isUpdate, setIsUpdate] = useState(false);
  const editAble = useAbleImage();
  const [fromScreen, setFromScreen] = useState("");
  // options
  const [educationOptionsBE, setEducationOptions] = useState(educationOptions);
  const [genderOptionsBE, setGenderOptions] = useState(genderOptions);
  const [maritalStatusOptionsBE, setMaritalStatusOptions] =
    useState(marriageOptions);
  const [provinceOptions, setProvinceOptions] = useState();
  const [cityOptions, setCityOptions] = useState();

  useEffect(() => {
    getPersonalDetail();
    getPersonalOptions();
    getProvinceList();
  }, []);

  useEffect(() => {
    if (provinceListData?.data?.error_code == 1) {
      console.log("provinceListData", provinceListData.data.data);
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
    if (personFormOptions?.data?.error_code == 1) {
      const options = personFormOptions.data.data;
      //educationOptions
      //genderOptions
      //maritalStatusOptions
      setEducationOptions(options.educationOptions);
      setGenderOptions(options.genderOptions);
      setMaritalStatusOptions(options.maritalStatusOptions);
    }
  }, [personFormOptions]);

  useEffect(() => {
    if (data?.data?.error_code === 1) {
      const userInfo = data.data.data.userInfo;
      console.log('Sun >>>> ' + JSON.stringify(userInfo))
      getCityList({
        parentId: userInfo?.provinceId ?? "1",
      });
      setInitialValues({
        ...emptyInitialValues,
        ...userInfo,
      });
    }
  }, [data]);

  useEffect(() => {
    if (personalData?.data?.error_code === 1 ) {
      doTrack("pk46", 1);
      if (isUpdate) {
        navigation.goBack();
      } else {
        navigation.push("Job", { fromScreen });
      }
    }
  }, [personalData]);

  return (
    <SafeAreaView>
      <ScrollView
        style={[{ backgroundColor: "white" }, getWritingDirectionStyle(locale)]}
      >
        <View>
          <SafeIntro safeText={i18n.t("information security")} />
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            {!!initialValues && !isLoading && (
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  const provinceId = values["provinceId"];
                  const cityId = values["cityId"];
                  const parameters = values;
                  parameters["provinceName"] = provinceOptions.filter(
                    (province) => province.code == provinceId
                  )[0].name;
                  parameters["cityName"] = cityOptions.filter(
                    (province) => province.code == cityId
                  )[0].name;
                  console.log("values---", values);
                  updatePersonalInfoMutation(parameters);
                }}
                validateOnChange={true}
                validateOnBlur={true}
                validationSchema={PersonalFormSchema}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <>
                    <View style={styles.module}>
                      <FTextInput
                        name="name"
                        label="Name"
                        type="text"
                        editable={editAble}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 15,
                        marginBottom: 20,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <FDatePicker name="birth" label="Date of Birth" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <FSelect
                          name="gender"
                          label="Gender"
                          options={genderOptionsBE}
                        />
                      </View>
                    </View>

                    <View style={styles.module}>
                      <FTextInput
                        name="cnic"
                        label="CNIC"
                        displayDigit={13}
                        editable={editAble}
                      />
                    </View>

                    <View style={styles.module}>
                      <FSelect
                        name="education"
                        label="Education"
                        options={educationOptionsBE}
                      />
                    </View>

                    <View style={styles.module}>
                      <FSelect
                        name="maritalStatus"
                        label="Marital Status"
                        options={maritalStatusOptionsBE}
                      />
                    </View>

                    <View
                      style={{
                        marginBottom: 15,
                      }}
                    >
                      <Text>{i18n.t("Residential Address")}</Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          gap: 15,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          {provinceOptions && (
                            <FSelect
                              name="provinceId"
                              label="Province"
                              options={provinceOptions}
                              valueKey="code"
                              labelKey="name"
                              afterChange={({ name, value }) => {
                                getCityList({
                                  parentId: value,
                                });
                              }}
                            />
                          )}
                        </View>

                        <View style={{ flex: 1 }}>
                          {cityOptions && (
                            <FSelect
                              name="cityId"
                              label="City"
                              enabledKey="provinceId"
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
                        name="addressDetail"
                        label="Detailed Address"
                      />
                    </View>

                    <View style={styles.module}>
                      <FTextInput name="email" label="Email" />
                    </View>

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
                        {isUpdate ? i18n.t("Submit") : i18n.t("Next")}{" "}
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeTextContainer: {
    borderRadius: 4,
    backgroundColor: "#F6F9FD",
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
  safeText: {
    marginLeft: 10,
    fontSize: 12,
    color: "#4F5E6F",
  },
  textInput: {
    paddingLeft: 15,
    height: 65,
    width: "auto",
    backgroundColor: "#F4F5F7",
    borderColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  module: {
    marginBottom: 20,
  },
});
