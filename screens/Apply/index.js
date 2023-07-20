import { View, Text, ScrollView, StyleSheet,Image,TouchableOpacity,Pressable,SafeAreaView,Linking ,Dimensions,Animated } from "react-native";
import ApplyLoanCard from "@components/ApplyLoanCard";
import LoanDetails from "@components/LoanDetails";
import { useGetCashLoanProductConfig,useApplyCreateBill,useGetApplyCheckParams } from '@apis';
import { useEffect,useState,useRef  } from "react";
import CollectionAccount from "@components/CollectionAccount";
import FaceRecognition from "@components/FaceRecognition";
import Checkbox from 'expo-checkbox';
import { Audio } from 'expo-av';
import MSlider from '@react-native-community/slider';
import { Asset } from "expo-asset";
import { useSystemStore } from '@store/useSystemStore'
import FaceDetectionScreen from "@components/FaceDetectionScreen";



function buildGetRequest(url, params) {
  if (params) {
    const queryString = Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
    return url + '?' + queryString;
  }
  return url;
}

const windowHeight = Dimensions.get('window').height;
const playImage = require('@assets/applyLoan/dialogs_ic_play.png')
const stopImage = require('@assets/applyLoan/dialogs_ic_pause.png')
const baseURL = 'https://alphacashapi.tangbull.com/api/app/laon/voice'

export default function Apply () {
  const store = useSystemStore()

  const { mutate: getCashLoanProductConfig, data: loanProductConfigData, 
    isLoading: isGetCashLoanProductConfigLoading} = useGetCashLoanProductConfig()

  const { mutate: getGetApplyCheckParams, data: applyCheckParamsData, 
    isLoading: isGetApplyCheckParamsLoading} = useGetApplyCheckParams()

  const { mutate: applyCreateBill, data: billData, 
    isLoading: isApplyCreateBillLoading} = useApplyCreateBill()

    const [optWithDaysConfig, setOptWithDaysConfig] = useState([]);
    const [isSpecialAccount, setIsSpecialAccount] = useState(true);
    
    const [daysOption,setDaysOption] = useState(0)
    const [amountIndex,setAmountIndex] = useState(0)
    const [isChecked, setChecked] = useState(false);
    const [toVoice,setToVoice] = useState(false)

    //人脸数据
    const [faceImage, setFaceImage] = useState(null);
    const [faceDetected, setFaceDetected] = useState(false);


    //音频
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isClickable, setIsClickable] = useState(true);

    useEffect(() => {
      getCashLoanProductConfig()
    },[])

    useEffect(() => {
      if(applyCheckParamsData && applyCheckParamsData.data.error_code == 1){
        console.log('check params successful')
      }
    },[applyCheckParamsData])

    const clickLoanAgreement = (() => {
      console.log('Sun >>> clickLoanAgreement')
      const url = 'https://www.baidu.com'
      Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URL: " + url);
        }
      })
      .catch((error) => console.error('An error occurred: ', error));

    }) 

    const getLoan = (() => {
      if(isChecked){
        console.log('Sun >>> getLoan' +  store.locale)
        startAnimation()
        setToVoice(true)
        if(optWithDaysConfig[daysOption].days === 30){
          setIsClickable(false)
        }
        //拼接参数
        const params = {
          "app": store.app,
          "sign": store.sign,
          "token":  store.token,
          "language": "en",
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "dayNum": optWithDaysConfig[daysOption].days,
          "disburseMoney":  optWithDaysConfig[daysOption].opt[amountIndex].disburseMoney,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate,
          "fineStrategyText": optWithDaysConfig[daysOption].opt[amountIndex].fineStrategyText ?? ""
        } 
        const audioFileUri = buildGetRequest(baseURL,params)
        console.log('Sun >>> ====' + audioFileUri)
        loadAudio(audioFileUri)
        
      } else {
        return
      }
    })

    const clickCollectionAccount = (() => {
      console.log('Sun >>> clickCollectionAccount')
    })

    const goBack = (() => {
      console.log('Sun >>> goback')
      unloadAudio()
      setToVoice(false)

    })

    const getApplyLoan = (() => {
      if(isClickable){
        console.log('Sun >>> getApplyLoan')
        //参数检查
        const data = { 
          "applyAmount": optWithDaysConfig[daysOption].opt[amountIndex].applyAmount,
          "manageFee": optWithDaysConfig[daysOption].opt[amountIndex].manageFee,
          "dailyRate": optWithDaysConfig[daysOption].opt[amountIndex].dailyRate,
          "dayNum": optWithDaysConfig[daysOption].days,
          "minLoanMoney": optWithDaysConfig[daysOption].minLoanMoney,
          "maxLoanMoney": optWithDaysConfig[daysOption].maxLoanMoney
        }
        getGetApplyCheckParams(data)
        //申请贷款
      }else {
        return
      }
    })

    const playVoice = (() => {
      console.log('Sun >>> playVoice')
      setIsPlaying(!isPlaying)
      playSound()
    })

    const onPlaybackStatusUpdate = (status) => {
      if (status.isLoaded && !status.isBuffering) {
        setCurrentTime(status.positionMillis);
      }

       //报错 status.durationMillis = infinity 以及调用了后会引起音频卡顿
      //  console.log('status.durationMillis' + status.durationMillis)
        // setDuration(status.durationMillis)
    

       // 判断是否音频播放结束
       if (status.didJustFinish && !status.isLooping) {
        // 重置所有状态
        setIsClickable(true)
        setIsPlaying(!isPlaying);
        setCurrentTime(0);
        if (sound) {
          sound.setPositionAsync(0);
        }
      }
    };

    const loadAudio = async (audioFileUri) => {
      try {
        const { sound } = await Audio.Sound.createAsync({ 
          uri: audioFileUri,
          initialStatus: {
            shouldPlay: true
          }

        });
        setSound(sound);
        sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await sound.playAsync();
      } catch (error) {
        console.log('Error loading audio:', error);
      }
    };

    const handleSliderChange = (value) => {
      if (sound) {
        sound.setPositionAsync(value);
      }
    };

    const formatTime = (timeInMillis) => {
      if(timeInMillis !== Infinity && timeInMillis !== NaN){
      const minutes = Math.floor(timeInMillis / 60000);
      const seconds = ((timeInMillis % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    };

    const playSound = async () => {
      if (sound) {
        try {
          if (isPlaying) {
            await sound.pauseAsync();
          } else {
            await sound.playAsync();
          }
          setIsPlaying(!isPlaying);
        } catch (error) {
          console.log('Error playing/pausing audio:', error);
        }
      }
    };
  
    const unloadAudio = async () => {
      try {
        if (sound) {
          await sound.unloadAsync();
        }
      } catch (error) {
        console.log('Error unloading audio:', error);
      }
    };

    //动画
    const slideAnimation = useRef(new Animated.Value(0)).current;
    const startAnimation = (() => {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 800, // 动画时长，单位是毫秒
        useNativeDriver: false, // 如果使用了'flex'属性，则必须设置为false
      }).start(); // 开始动画
    })

    useEffect(() => {
      if(toVoice){
        startAnimation()
      } else {
        // 如果View不可见，则停止动画
      slideAnimation.setValue(0);
      }
    },[toVoice])

    useEffect(() => {
      return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    useEffect(() => {
      if(loanProductConfigData && loanProductConfigData.data.error_code == 1){
        const loanConfigInfo = loanProductConfigData.data.data.cashLoan
        //产品配置信息
        setOptWithDaysConfig(loanConfigInfo.optWithDaysConfig)
        //是否审核账号
        setIsSpecialAccount(loanConfigInfo.isSpecialAccount)
        //默认金额下标
        setAmountIndex(loanConfigInfo.optWithDaysConfig[0].defaultAmountIndex)
        //默认天数下标
        // setDaysOption(loanConfigInfo.defaultDayOption)

      }
    },[loanProductConfigData])


    const [isModalVisible, setModalVisible] = useState(false);
    const [detectedFace, setDetectedFace] = useState(null);

    
  const clickFaceRecognition = (() => {
    console.log('Sun >>> clickFaceRecognition')
    setFaceDetected(true)
 
  })
  
    const handleFaceDetected = (face) => {
      if(face){
        setFaceImage(face.uri);
        setModalVisible(false);
      }
    };
  
    const handleShowModal = () => {
      setFaceImage(null); // Reset detected face on showModal
      setModalVisible(true);
    };


  return (
    <SafeAreaView >
      <View style={[styles.container,toVoice === true && faceDetected === false && styles.noneContainer]}>
       <ScrollView>
        <View
        style={{
          top: 0,
          position: "absolute",
          backgroundColor: "#0825B8",
          width: "100%",
          height: 150,
          zIndex: 0,
        }}
        />
      
       { !!optWithDaysConfig[daysOption] && !isGetCashLoanProductConfigLoading && 
       <View style={{padding: 12}}>

       
        <ApplyLoanCard 
        optWithDaysConfig = {optWithDaysConfig} 
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></ApplyLoanCard>

        <LoanDetails 
        optWithDaysConfig = {optWithDaysConfig}
        setOptWithDaysConfig={setOptWithDaysConfig}
        daysOption = {daysOption}
        setDaysOption = {setDaysOption}
        amountIndex = {amountIndex}
        setAmountIndex = {setAmountIndex}
        ></LoanDetails>

        <Pressable onPress={() => clickCollectionAccount()}>
          <CollectionAccount></CollectionAccount>
        </Pressable>

        <Pressable onPress={() => clickFaceRecognition()}>
        <FaceRecognition
          faceDetected = {faceDetected}
        ></FaceRecognition>
        </Pressable>
        

        <View style={styles.loanAgreementStyle}>
          <Checkbox 
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#0825B8' : undefined}
          ></Checkbox>
          <Text style={{marginHorizontal: 6,fontSize: 12, color: '#4F5E6F'}}>Agree</Text>
          <Pressable onPress={() => clickLoanAgreement()}>
          <Text style={{fontSize: 12, color: '#0825B8', fontWeight: 'bold'}}>Loan Agreement</Text>
          </Pressable>
        </View>

        
        <Text style={{fontSize: 12,color: '#4F5E6F'}}>
          {'Kind Tips：'}
          {'\n'}
          {'1.Cooling off period: If you regret applying for a loan,please contact us promptly and repay the principal within24 hours.According to company regulations, we willcancel your loan application for free!'}
          {'\n\n'}
          {'2.Remember to repay the loan in time, if you fail to repay the loan on time, you will be fined according to the  Late Payment Charges rate of 2%/day!'}
          {'\n\n'}
          {'3.Key Excutive For Loan Handing Officer Name:Mr.Mohsin Ali'}
          {'\n'}
          {'Contact Email:xxxxt@xx.com'}
          {'\n'}
          {'address:XXXXXXXX'}
        </Text>

       </View>
       }
       </ScrollView>

       <TouchableOpacity onPress={() => getLoan()}>
       <View
        style={{
          bottom: 36,
          left: 36,
          right: 36,
          position: 'absolute',
          backgroundColor: isChecked ? "#0825B8" : "#C0C4D6",
          height: 46,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          borderRadius: 3,
        }}>
          <Text style={{color: '#FFFFFF',fontSize: 15}}>Get Loan</Text>
          <Image source={require('@assets/applyLoan/btn_ic_right.png')} style={{width: 15, height: 15,marginLeft: 2}}></Image>

        </View>
        </TouchableOpacity>
      </View>

      {/* 语音 */}
      { !!optWithDaysConfig[daysOption] && toVoice === true && faceDetected === false &&

       <View style={styles.otherContainer}>
        <Animated.View
          style={{
          transform: [
            {
                translateY: slideAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [windowHeight/2, 0], // 从下往上偏移
               }),
             },
           ],
         }}
        >
        <View style={styles.voiceViewStyle}>

          <View style={styles.voiceItemStyle}>
            <TouchableOpacity onPress={goBack}>
             <Image source={require('@assets/applyLoan/com_nav_ic_back_black.png')} style={{width: 21,height: 21}}></Image>
            </TouchableOpacity>
            <View style={{flex: 1,alignItems: 'center',backgroundColor: '#F4F5F7',}}>
           <Text style={{fontWeight: 'bold', color: '#0A233E',marginLeft: -21}}>Confirm Payment Info</Text>
           </View>
          </View>

          <View style={styles.voiceContentStyle}>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Loan Amount</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].applyAmount}</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Loan Term</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>{optWithDaysConfig[daysOption].days} Days</Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={{fontSize: 15,color: '#4F5E6F',fontWeight:'500'}}>Disburse Amount</Text>
              <Text style={{fontSize: 15,color: '#0A233E',fontWeight:'800'}}>RS.{optWithDaysConfig[daysOption].opt[amountIndex].disburseMoney}</Text>
            </View>
            
          </View>

          <View style={styles.voicePlayStyle}>
            <Pressable onPress={playVoice}>
            <Image source={isPlaying === false ? playImage : stopImage} style={{width: 24,height: 24}}></Image>
            </Pressable>
           
            <View style={{marginHorizontal: 15,flexDirection: 'column',flex: 1,justifyContent: 'center'}}>
              <MSlider
              style = {{marginTop: 6}}
              value={currentTime}
              minimumValue={0}
              maximumValue={duration}
              onValueChange={handleSliderChange}
              minimumTrackTintColor="#00B295" // 设置走过的进度的颜色
              maximumTrackTintColor="#00B2954D" // 设置进度条的颜色
              thumbTintColor="transparent" // 将滑块颜色设为透明
              thumbStyle={{ width: 0, height: 0 }} // 设置滑块样式为空对象，使其不占用空间
              ></MSlider>
              <View style ={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 3}}>
                <Text style={{color: '#8899AC', fontSize: 11}}>{formatTime(currentTime)}</Text>
                <Text  style={{color: '#8899AC', fontSize: 11}}>{formatTime(duration)}</Text>
              </View>
            </View>

          </View>

          <Text style={{color: '#4F5E6F', fontSize: 12,marginTop: 12,fontWeight: 500,lineHeight: 17}}>
          {'I have read and fully understood the Markup charges and terms of the loan product, and I agree that when the loan is approved, the funds will be transferred directly to the account I provided!'}
          </Text>

          <View style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 24}}>
           <TouchableOpacity onPress={goBack} style={{flex: 1,borderRadius:3,backgroundColor: '#C0C4D6',height: 46,justifyContent: 'center',alignItems: 'center',marginRight: 8}}>
              <Text style={{color: '#FFFFFF', fontSize: 15}}>Cancel</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress={getApplyLoan}  activeOpacity={isClickable ? 0.2 : 1} style={{flex: 1,borderRadius:3,backgroundColor: isClickable ? '#0825B8' : '#C0C4D6',height: 46,justifyContent: 'center',alignItems: 'center',marginLeft: 8}}>
              <Text style={{color: '#FFFFFF', fontSize: 15}}>Disburse Now</Text>
            </TouchableOpacity>
          </View>

        </View>
        </Animated.View>
        </View>
      }

      {/* 人脸识别 */}
      { faceDetected === true && <View style={{flex: 1}}>
       <TouchableOpacity onPress={handleShowModal}>
         <Text>Show Face Recognition Modal</Text>
       </TouchableOpacity>
       <FaceDetectionScreen
         visible={isModalVisible}
         onClose={() => setModalVisible(false)}
         onFaceDetected={handleFaceDetected}
       />
       </View>
      }
    
    </SafeAreaView>
       
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: '#F4F5F7'
  },

  noneContainer: {
   display: 'none'
  },

  otherContainer: {
    height: windowHeight,
    position: "relative",
    flex: 1,
    backgroundColor: '#00000080'
  },

  loanAgreementStyle: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center',
  },

  voiceViewStyle: {
    marginTop: windowHeight/2,
    opacity: 1,
    backgroundColor: '#F4F5F7',
    padding: 14,
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'column',
  },

  voiceItemStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    backgroundColor: '#F4F5F7',
    marginTop: 10
  },

  voiceContentStyle: {
    borderRadius:4,
    backgroundColor: '#FFFFFF',
    marginTop:24,
    paddingHorizontal: 12,
    paddingTop: 15,
    flexDirection: 'column'
  },

  voicecontentItemStyle: {
    flexDirection:'row',
    justifyContent: 'space-between',
    height: 35
  },

  voicePlayStyle: {
    height: 54,
    borderRadius:4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },


  
});