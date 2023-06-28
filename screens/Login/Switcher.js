import { View,Text, Pressable, StyleSheet } from 'react-native';
import { useI18nStore, LocaleTypes } from "@hooks/useI18nStore";


export default function Switcher () {
const { locale, setLocale } = useI18nStore();
return (
    <View style={{ display: 'flex', flexDirection: 'row', gap:'4px', justifyContent: 'flex-end'}}>
        <Pressable onPress={() => setLocale(LocaleTypes.en)} style={{
            display: 'inline-block',
            width: 'fit-content'
        }}>
            <Text style={{
                opacity: locale === LocaleTypes.en ? 1 : 0.5,
                display: 'inline-block',
                color: 'white',
                fontSize: '14px'
            }}>EN</Text>
        </Pressable>
         <Text style={{
            color: 'white'
         }}>|</Text>
         <Pressable onPress={() => setLocale(LocaleTypes.urdu)} style={{
            display: 'inline-block',
            width: 'fit-content'
        }}>
            <Text style={{
                opacity: locale === LocaleTypes.urdu ? 1 : 0.5,
                display: 'inline-block',
                color: 'white',
                fontSize: '14px'
            }}>اردو</Text>
        </Pressable>
    </View>
    )
}
