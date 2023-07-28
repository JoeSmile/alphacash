import { Image, View, Text, Pressable, StyleSheet } from "react-native";
import SafeIntro from "./SafeIntro";
import { useEffect, useState } from "react";
import { EXAMPLE_TYPES, ExampleModal } from "./ExampleModal";
import Return from './Return';
import { useGetIdentityInfoDetail, useUpdateIdentityInfo } from '@apis'
import { useI18n } from "@hooks/useI18n";

const emptyIdentityFormValues = {
  "cnicFront": "", 
  "cnicBack": "", 
  "cnicInHand": "", 
  "employmentProof": "", 
}

const image = require("@assets/images/info_pic_cnic_card_positive.png")

export default function Certificate() {
  const [showModalType, setShowModalType] = useState("");
  const {mutate: getIdentityInfo, data: identityInfo, isLoading: isIdentityInfoLoading} = useGetIdentityInfoDetail();
  const {mutate: updateIdentityInfo, data: updateIdentityInfoResponse} = useUpdateIdentityInfo();
  const { i18n } = useI18n();

  // useEffect(() => {
  //   getIdentityInfo();
  // }, []);

  useEffect(() => {
    if(identityInfo && identityInfo.data.error_code == 1 ) {
      setInitialValues({
        ...emptyIdentityFormValues,
        ...identityInfo.data.data.identityInfo
      });
    }
  }, [identityInfo]);

  useEffect(() => {
    if (updateIdentityInfoResponse && updateIdentityInfoResponse.data.error_code == 1) {
      console.log('Sun >>>>>>>>>> ')
      // navigation.push('');
    }
  }, [updateIdentityInfoResponse])


  return (
    <View style={styles.container}>
      <SafeIntro safeText={i18n.t("Upload credential information, only for user identity verification, we will encrypt and store it, and it will never be used for other purposes!")}
      />

      {/* CNIC card */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={styles.boldTextStyle}>{i18n.t('CNIC Card')}</Text>

          <Pressable onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_CARD)}>
            <Text style={styles.underlineText}>{i18n.t('Example')}</Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
          }}
        >
          <Pressable
            style={{
              flex: 1,
            }}
          >
            <View  style={{
                  width: 150,
                }}>
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={require("@assets/images/info_pic_cnic_card_positive.png")}
                contentFit="cover"
              />
              <Text style={{fontSize: 12, color: '#8899AC', alignSelf: 'center', marginTop:6}}>CNIC Card Front</Text>
            </View>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
            }}
          >
            <View  style={{
                  width: 150,
                }}>
              <Image
                style={{
                  height: 96,
                  width: 150,
                }}
                source={require("@assets/images/info_pic_cnic_card_negative.png")}
                contentFit="cover"
              />
              <Text  style={{fontSize: 12, color: '#8899AC', alignSelf: 'center', marginTop:6}}>CNIC Card Back</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.shadowContent}></View>

      {/* in hand */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
            marginBottom: 15,
          }}
        >
          <Text style={styles.boldTextStyle}>{i18n.t('Take photo with CNIC card in hand')}</Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.CNIC_IN_HAND)}
          >
            <Text style={styles.underlineText}>{i18n.t('Example')}</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={require("@assets/images/info_pic_holding_id_card.png")}
            contentFit="cover"
          />
        </View>
      </View>

      <View style={styles.shadowContent}></View>

      {/* proof employment */}
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 18,
            marginBottom: 15,
          }}
        >
          <Text style={styles.boldTextStyle}>{i18n.t('Proof Employment')}</Text>
          <Pressable
            onPress={() => setShowModalType(EXAMPLE_TYPES.PROOF_EMPLOYMENT)}
          >
            <Text style={styles.underlineText}>{i18n.t('Example')}</Text>
          </Pressable>
        </View>
        <View>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={require("@assets/images/info_pic_work_permit.png")}
            contentFit="cover"
          />
        </View>
      </View>

      <Pressable
        style={{
          height: 46,
          marginTop: 24,
          marginBottom: 15,
          marginHorizontal: 16,
          backgroundColor: "#0825B8",
          borderRadius: 3,
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={{}}
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
          }}> {i18n.t('Next')} </Text>
          <Image source={require('@assets/images/btn_ic_right.png')} style={{width: 12, height: 12}}/>
          
          </Pressable>
    
      <ExampleModal
        isVisible={!!showModalType}
        onClose={() => setShowModalType("")}
        type={showModalType}
      />
      <Return />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    height: '100%'
  },
  submitBtn: {
    height: 50,
    borderRadius: 3,
    color: "white",
  },

  boldTextStyle: {
   fontSize: 15,
   fontWeight: "bold", 
   color:'#0A233E',
  },

  shadowContent: {
    height: 4,
    backgroundColor: "#F4F5F7",
    opacity: 1,
    marginTop: 18,
  },

  underlineText: {
   fontSize: 15,
   fontWeight: 'bold',
   color: '#0825B8',
   textDecorationLine: 'underline',
  },

});
