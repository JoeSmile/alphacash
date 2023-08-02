import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { useEffect, useState, useCallback } from "react";

import { Audio } from "expo-av";
import MSlider from "@react-native-community/slider";
import { useI18n } from "@hooks/useI18n";
import { formatTime, formatNumberToFinancial as fn2f } from "@utils";

const playImage = require("@assets/applyLoan/dialogs_ic_play.png");
const stopImage = require("@assets/applyLoan/dialogs_ic_pause.png");

export default function VoiceModal({
  visible,
  optWithDaysConfig,
  daysOption,
  amountIndex,
  audioFileUri,
  checkApply,
  goBack,
}) {
  const { i18n } = useI18n();
  const daysConfig = optWithDaysConfig[daysOption];
  const amountConfig = daysConfig.opt[amountIndex];

  //音频
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // 进度条当前值
  const [duration, setDuration] = useState(0); // 进度条最大值，等于语音的长度
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    async function run() {
      if (visible) {
        setIsClickable(daysConfig.days !== 30); // 30天期必须听完播音才可点
        setIsPlaying(true);
        setCurrentTime(0);
        setDuration(0);

        await unloadAudio();
        loadAudio(audioFileUri);
      }
    }

    run();

    return () => sound?.unloadAsync();
  }, [visible]);

  const unloadAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
    } catch (error) {
      console.log("Error unloading audio:", error);
    }
  };

  const loadAudio = async (audioFileUri) => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: audioFileUri,
        initialStatus: {
          shouldPlay: true,
          isLooping: false,
        },
      });
      setSound(sound);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.log("Error loading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = useCallback((status) => {
    if (status.isLoaded && !status.isBuffering) {
      setCurrentTime(status.positionMillis);
      setDuration(status.durationMillis);
    }

    //报错 status.durationMillis = infinity 以及调用了后会引起音频卡顿(web 端)
    //  console.log('status.durationMillis' + status.durationMillis)
    // setDuration(status.durationMillis)

    // 判断是否音频播放结束
    if (status.didJustFinish && !status.isLooping) {
      // 重置所有状态
      setIsClickable(true);
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, []);

  const playVoice = () => {
    console.log("Sun >>> playVoice" + isPlaying);
    //Andoroid端播放结束自动销毁，需要重新加载播放
    if (currentTime != 0) {
      playSound();
    } else {
      if (!isPlaying) {
        loadAudio(audioFileUri);
        setIsPlaying(!isPlaying);
      }
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
        console.log("Error playing/pausing audio:", error);
      }
    }
  };

  const getApplyLoan = useCallback(() => {
    isClickable && checkApply(); //参数检查
  }, [isClickable]);

  const handleSliderChange = useCallback(
    (value) => sound?.setPositionAsync(value),
    [sound]
  );

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.otherContainer}>
        <View style={styles.voiceViewStyle}>
          <View style={styles.voiceItemStyle}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require("@assets/applyLoan/com_nav_ic_back_black.png")}
                style={{ width: 21, height: 21 }}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#F4F5F7",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#0A233E",
                  marginLeft: -21,
                }}
              >
                {i18n.t("Confirm Payment Info")}
              </Text>
            </View>
          </View>

          <View style={styles.voiceContentStyle}>
            <View style={styles.voicecontentItemStyle}>
              <Text style={styles.itemLabelText}>{i18n.t("Loan Amount")}</Text>
              <Text style={styles.itemValueText}>
                {fn2f(amountConfig.applyAmount)}
              </Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={styles.itemLabelText}>{i18n.t("LoanTerm")}</Text>
              <Text style={styles.itemValueText}>
                {daysConfig.days} {i18n.t("Days")}
              </Text>
            </View>

            <View style={styles.voicecontentItemStyle}>
              <Text style={styles.itemLabelText}>
                {i18n.t("DisburseAmount")}
              </Text>
              <Text style={styles.itemValueText}>
                {fn2f(amountConfig.disburseMoney)}
              </Text>
            </View>
          </View>

          <View style={styles.voicePlayStyle}>
            <Pressable onPress={playVoice}>
              <Image
                source={isPlaying === false ? playImage : stopImage}
                style={{ width: 24, height: 24 }}
              />
            </Pressable>

            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "center",
                marginTop: -6,
              }}
            >
              <MSlider
                style={{ marginTop: 6 }}
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#00B295" // 设置走过的进度的颜色
                maximumTrackTintColor="#00B2954D" // 设置进度条的颜色
                thumbTintColor="transparent" // 将滑块颜色设为透明
                thumbStyle={{ width: 0, height: 0 }} // 设置滑块样式为空对象，使其不占用空间
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 15,
                  marginTop: -3,
                }}
              >
                <Text style={{ color: "#8899AC", fontSize: 11 }}>
                  {formatTime(currentTime)}
                </Text>
                <Text style={{ color: "#8899AC", fontSize: 11 }}>
                  {formatTime(duration)}
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={{
              color: "#4F5E6F",
              fontSize: 12,
              marginTop: 12,
              fontWeight: 500,
              lineHeight: 17,
            }}
          >
            I have read and fully understood the Markup charges and terms of the
            loan product, and I agree that when the loan is approved, the funds
            will be transferred directly to the account I provided!
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 24,
            }}
          >
            <TouchableOpacity
              onPress={goBack}
              style={{
                flex: 1,
                borderRadius: 3,
                backgroundColor: "#C0C4D6",
                height: 46,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                {i18n.t("Cancel")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={getApplyLoan}
              activeOpacity={isClickable ? 0.2 : 1}
              style={{
                flex: 1,
                borderRadius: 3,
                backgroundColor: isClickable ? "#0825B8" : "#C0C4D6",
                height: 46,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                {i18n.t("Disburse Now")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  otherContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  voiceViewStyle: {
    position: "absolute",
    bottom: 0,
    opacity: 1,
    backgroundColor: "#F4F5F7",
    padding: 14,
    paddingTop: 24,
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "column",
  },

  voiceItemStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: "row",
    backgroundColor: "#F4F5F7",
  },

  voiceContentStyle: {
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginTop: 24,
    paddingHorizontal: 12,
    paddingTop: 15,
    flexDirection: "column",
  },

  voicecontentItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 35,
  },

  itemLabelText: {
    fontSize: 15,
    color: "#4F5E6F",
    fontWeight: "500",
  },
  itemValueText: {
    fontSize: 15,
    color: "#0A233E",
    fontWeight: "800",
  },

  voicePlayStyle: {
    height: 54,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
