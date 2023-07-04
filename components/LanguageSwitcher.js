import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useI18nStore, LocaleTypes } from "@store/useI18nStore";


export default function LanguageSwitcher() {
    const { locale, setLocale } = useI18nStore();
    return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 4, justifyContent: 'flex-end' }}>
            <Pressable onPress={() => setLocale(LocaleTypes.en)} style={{
                display: 'inline-block',
                width: 'fit-content'
            }}>
                <Text style={{
                    opacity: locale === LocaleTypes.en ? 1 : 0.5,
                    color: 'white',
                    fontSize: 14
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

                    color: 'white',
                    fontSize: 14
                }}>اردو</Text>
            </Pressable>
        </View>
    )
}
