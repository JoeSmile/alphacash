import {
  View,
  Text,
  Image
} from "react-native";

import { useI18n, LocaleTypes } from "@hooks/useI18n";

export function OnlineService () {
  const { i18n } = useI18n();

  return (
    <View style={{
      marginBottom: 40,
      flexDirection: 'row',
      height: 40,
      borderRadius: 4,
      marginHorizontal: 15,
      paddingHorizontal: 15,
      paddingVertical: 15,
      elevation: 3,
      shadowColor: '#000',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <View style={{
        flexDirection: 'row'
      }}>
        <Image
          source={require("@assets/bills/home_ic_online_service.png")}
          contentFit="cover"
          transition={1000}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text style={{
          marginLeft: 10
        }}>{i18n.t('Online Service')}</Text>
      </View>
      <Image
        source={require("@assets/images/com_ic_right.png")}
        contentFit="cover"
        transition={1000}
        style={{
          width: 20,
          height: 20,
        }}
      />
    </View>
  )
}