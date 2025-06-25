import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ko from "./messages/ko";
import en from "./messages/en";

i18n.use(initReactI18next).init({
  lng: "ko", // 기본 언어
  fallbackLng: "ko",
  resources: {
    ko: ko,
    en: en,
  },
  interpolation: { escapeValue: false },
});

export default i18n;
