import { Image, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import SafeIntro from "./SafeIntro";
import { useEffect, useState } from "react";
import { EXAMPLE_TYPES, ExampleModal } from "./ExampleModal";
import Return from './Return';
import { useGetIdentityInfoDetail, useUpdateIdentityInfo } from '@apis'
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-asset";
import { useI18n } from "@hooks/useI18n";
import mime from "mime";


const imageUri = Asset.fromModule(require("@assets/images/info_pic_cnic_card_positive.png")).uri
const imageUri1 = Asset.fromModule(require("@assets/images/info_pic_cnic_card_negative.png")).uri
const imageUri2 = Asset.fromModule(require("@assets/images/info_pic_holding_id_card.png")).uri
const imageUri3 = Asset.fromModule(require("@assets/images/info_pic_work_permit.png")).uri

export default function Certificate() {
  const [showModalType, setShowModalType] = useState("");
  const {mutate: getIdentityInfo, data: identityInfo, isLoading: isIdentityInfoLoading} = useGetIdentityInfoDetail();
  const {mutate: updateIdentityInfo, data: updateIdentityInfoResponse} = useUpdateIdentityInfo();
  const { i18n } = useI18n();
  const [imageList, setImage] = useState([]);
  const [cnicFrontImage,setCnicFront] = useState({})
  const [cnicBackImage,setCnicBack] = useState({})
  const [cnicInHandImage,setCnicInHand] = useState({})
  const [employmentProofImage,setEmploymentProof] = useState({})


  useEffect(() => {
    getIdentityInfo();
  }, []);

  useEffect(() => {
    if(identityInfo?.data?.error_code == 1 ) {
      console.log('Sun >>>>>>>>>> identityInfo')
      const imageData = identityInfo.data.data.identityInfo
      // if(imageData.cnicFront !== null){
        const list = [
          imageData.cnicFront,
          imageData.cnicBack,
          imageData.cnicInHand,
          imageData.employmentProof,
        ];
        setImage(list)     
      // }
    }
  }, [identityInfo]);

  useEffect(() => {
    if (updateIdentityInfoResponse?.data?.error_code == 1) {
      console.log('Sun >>>>>>>>>> updateIdentityInfoResponse')
      // navigation.push('');
    }
  }, [updateIdentityInfoResponse])

  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,//是否允许裁剪
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

      // let updatedImages = [...imageList];
      // updatedImages[index] = result.assets[0].uri;
      const imgUri = result.assets[0].uri;
      img = {
        uri: imgUri,
        type: mime.getType(imgUri),
        name: imgUri.split("/").pop(),
      };

      if(index == 0){
        setCnicFront(img)
      } else if (index == 1){
         setCnicBack(img)
      } else if (index == 2){
         setCnicInHand(img)
      } else if (index == 3){
         setEmploymentProof(img)
      }
      console.log('Sun >>> uri === ' + imgUri + 'mime.getType(result.assets[0].uri) ==' + mime.getType(imgUri) + 'result.assets[0].uri.split("/").pop() ===' + imgUri.split("/").pop())
      // setImage(updatedImages);

  };

  const onClickUpdateIdentityInfo = () => {
    console.log('Sun >>>>>>>>>> onClickUpdateIdentityInfo' + cnicFrontImage.uri)

    // const cnicFrontImage = {
    //   uri: imageList[0],
    //   type: mime.getType(imageList[0]),
    //   name: imageList[0].split("/").pop(),
    //  };
    // const cnicBackImage = {
    //   uri: imageList[1],
    //   type: mime.getType(imageList[1]),
    //   name: imageList[1].split("/").pop(),
    // }

    // const cnicInHandImage = {
    //   uri: imageList[2],
    //   type: mime.getType(imageList[2]),
    //   name: imageList[2].split("/").pop(),
    // }

    // const employmentProofImage = {
    //   uri: imageList[3],
    //   type: mime.getType(imageList[3]),
    //   name: imageList[3].split("/").pop(),
    // }
    const params = { 
      cnicFront : cnicFrontImage,
      cnicBack: cnicBackImage,
      cnicInHand: cnicInHandImage,
      employmentProof: employmentProofImage
     };
    updateIdentityInfo(params)

  }


  return (
    <ScrollView style={styles.container}>
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
            onPress={() => pickImage(0)}
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
                source={{ uri:  imageList[0] ?? imageUri }}
                contentFit="cover"
              />
              <Text style={{fontSize: 12, color: '#8899AC', alignSelf: 'center', marginTop:6}}>CNIC Card Front</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => pickImage(1)}
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
                source={{ uri:  imageList[1] ?? imageUri1 }}
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
       
        <Pressable 
         style={{
          height: 96,
          width: 150,
        }}
        onPress={() => pickImage(2)}>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={{ uri: imageList[2] ?? imageUri2 }}
            contentFit="cover"
          />
           </Pressable>
      
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
        <Pressable 
          style={{
            height: 96,
            width: 150,
          }}
          onPress={() => pickImage(3)}>
          <Image
            style={{
              height: 96,
              width: 150,
            }}
            source={{ uri: imageList[3] ?? imageUri3 }}
            contentFit="cover"
          />
        </Pressable>

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
        onPress={() => onClickUpdateIdentityInfo()}
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
    </ScrollView>
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
