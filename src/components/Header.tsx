import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = i18n.language;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    // 현재 경로에서 언어 부분만 교체
    let newPath = location.pathname.replace(/^\/(ko|en)/, "");
    if (!newPath.startsWith("/")) newPath = "/" + newPath;
    navigate(`/${selectedLang}${newPath}`);
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white mb-6">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate(`/${lang}`)}>
        Home
      </h1>
      <select value={lang} onChange={handleChange} className="border rounded px-2 py-1 ml-4">
        <option value="ko">한국어</option>
        <option value="en">English</option>
      </select>
    </header>
  );
}
