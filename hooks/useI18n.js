import { useCallback } from "react";
import { useI18nStore } from "../store/useI18nStore";
import { useSystemStore } from "../store/useSystemStore";
export { LocaleTypes } from "../store/useI18nStore";

export function useI18n() {
    const [sSetLocale, locale] = useSystemStore(s => [s.setLocale, s.locale]);
    const [iSetLocale, i18n] = useI18nStore(s => [s.setLocale, s.i18n]);
    const _setLocale = useCallback((newLocale)=> {
        iSetLocale(newLocale);
        sSetLocale(newLocale);
    }, [iSetLocale, sSetLocale])

    return {
        setLocale: _setLocale,
        locale,
        i18n
    }
}