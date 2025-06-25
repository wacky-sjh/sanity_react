import { RouterProvider } from "react-router";
import router from "@/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <RouterProvider router={router} />;
}

export default App;
