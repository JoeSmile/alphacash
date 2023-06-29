import { useEffect } from "react";
import { useI18nStore } from "../store/useI18nStore";
import { useSystemStore } from "../store/useSystemStore";

export function useInitialStore() {
    const locale = useSystemStore(s => s.locale);
    const setLocale = useI18nStore(s => s.setLocale);
    useEffect(() => {
        setLocale(locale)
    }, [])
}