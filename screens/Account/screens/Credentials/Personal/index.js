import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Pressable,
} from "react-native";
import { Formik } from "formik";
import { FTextInput, FSelect } from "@components/Inputs";
import Return from "../Return";
import SafeIntro from "../SafeIntro";
import * as Yup from "yup";
import { FDatePicker } from "@components/FDatePicker";
import {
  provincesOptions,
  citiesOptions,
  genderOptions,
  marriageOptions,
  educationOptions,
} from "@const";
import { useEffect, useState } from "react";
import {
  useGetPersonalDetail,
  useUpdatePersonalInfo,
  useGetPersonalOptions,
} from "@apis/hooks";
import dayjs from "dayjs";
import { Toast } from "@ant-design/react-native";
import { useI18n, LocaleTypes } from "@hooks/useI18n";
import { useUserQuota } from "@store/useUserQuota";

const emptyInitialValues = {
  name: "",
  birth: "1999-01-01",
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
    .test("len", "Must be exactly 13 characters", (val) => val.length === 13),
  gender: Yup.number().required("Required"),
  education: Yup.number().required("Required"),
  maritalStatus: Yup.number().required("Required"),
  provinceId: Yup.number().required("Required"),
  cityId: Yup.number().required("Required"),
  addressDetail: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Personal({ navigation }) {
  const { mutate: getPersonalDetail, data } = useGetPersonalDetail();
  const updatePersonalInfoMutation = useUpdatePersonalInfo();
  // const getPersonalOptionsMutation = useGetPersonalOptions();
  const [initialValues, setInitialValues] = useState();
  const { i18n } = useI18n();
  const [bill] = useUserQuota((s) => [s.bill]);

  useEffect(() => {
    getPersonalDetail();
    // getPersonalOptionsMutation.mutate()
  }, []);

  useEffect(() => {
    if (data && data.data && data.data.error_code === 1) {
      const userInfo = data.data.data.userInfo;
      setInitialValues({
        ...emptyInitialValues,
        ...userInfo,
      });
    }
  }, [data]);

  useEffect(() => {
    if (
      updatePersonalInfoMutation.data &&
      updatePersonalInfoMutation.data.data.error_code === 1
    ) {
      navigation.push("Job");
    }
  }, [updatePersonalInfoMutation]);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
        <View>
          <SafeIntro safeText={i18n.t("information security")} />
          <View
            style={{
              marginBottom: 15,
              height: 950,
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 15,
            }}
          >
            {!!initialValues && (
              <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                  const provinceId = values["provinceId"];
                  const cityId = values["cityId"];
                  const parameters = values;
                  parameters["provinceName"] = provincesOptions.filter(
                    (province) => province.province_id == provinceId
                  )[0].province_name;
                  parameters["cityName"] = citiesOptions.filter(
                    (province) => province.city_id == cityId
                  )[0].city_name;
                  updatePersonalInfoMutation.mutate({ ...parameters });
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
                        editable={
                          (bill.appStatus == 101 ||
                            bill.appStatus == 201 ||
                            bill.appStatus == 301 ||
                            bill.appStatus == 303) &&
                          false
                        }
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                        height: 90,
                        marginBottom: 15,
                      }}
                    >
                      <View style={{ height: 65, marginBottom: 15, flex: 1 }}>
                        <FDatePicker name="birth" label="Date of Birth" />
                      </View>
                      <View style={{ height: 65, marginBottom: 15, flex: 1 }}>
                        <FSelect
                          name="gender"
                          label="Gender"
                          options={genderOptions}
                        />
                      </View>
                    </View>

                    <View style={styles.module}>
                      <FTextInput
                        name="cnic"
                        label="CNIC"
                        editable={
                          (bill.appStatus == 101 ||
                            bill.appStatus == 201 ||
                            bill.appStatus == 301 ||
                            bill.appStatus == 303) &&
                          false
                        }
                      />
                    </View>

                    <View style={styles.module}>
                      <FSelect
                        name="education"
                        label="Education"
                        options={educationOptions}
                      />
                    </View>

                    <View style={styles.module}>
                      <FSelect
                        name="maritalStatus"
                        label="Marital Status"
                        options={marriageOptions}
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
                          gap: 10,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <FSelect
                            name="provinceId"
                            label="Province"
                            options={provincesOptions}
                            valueKey="province_id"
                            labelKey="province_name"
                          />
                        </View>
                        <View style={{ height: 65, marginBottom: 15, flex: 1 }}>
                          <FSelect
                            name="gender"
                            label="Gender"
                            options={genderOptions}
                          />
                        </View>
                      </View>

                      <View style={styles.module}>
                        <FTextInput name="cnic" label="CNIC" />
                      </View>

                      <View style={styles.module}>
                        <FSelect
                          name="education"
                          label="Education"
                          options={educationOptions}
                        />
                      </View>

                      <View style={styles.module}>
                        <FSelect
                          name="maritalStatus"
                          label="Marital Status"
                          options={marriageOptions}
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
                            gap: 10,
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <FSelect
                              name="provinceId"
                              label="Province"
                              options={provincesOptions}
                              valueKey="province_id"
                              labelKey="province_name"
                            />
                          </View>

                          <View style={{ flex: 1 }}>
                            <FSelect
                              name="cityId"
                              label="City"
                              options={citiesOptions.filter((city) =>
                                values["provinceId"]
                                  ? city.province_id == values["provinceId"]
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
                          name="addressDetail"
                          label="Detailed Address"
                        />
                      </View>

                      <View style={styles.module}>
                        <FTextInput name="email" label="Email" />
                      </View>

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
                          {i18n.t("Next")}{" "}
                        </Text>
                        <Image
                          source={require("@assets/images/btn_ic_right.png")}
                          style={{ width: 12, height: 12 }}
                        />
                      </Pressable>
                    </View>
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
  picker: {
    width: "100%",
    height: 44,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  pickerItem: {
    height: 44,
  },
  submitBtn: {
    height: 65,
    borderRadius: 3,
    color: "white",
  },
  module: {
    height: 90,
    marginBottom: 15,
  },
});
