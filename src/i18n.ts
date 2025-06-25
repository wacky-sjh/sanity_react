import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "ko", // 기본 언어
  fallbackLng: "ko",
  resources: {
    ko: { translation: {} },
    en: { translation: {} },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
