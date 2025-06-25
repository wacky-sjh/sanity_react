import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => navigate(`/${lang}/news`)}
      >
        {t("goToNewsList")}
      </Button>
    </>
  );
}
