import { createBrowserRouter } from "react-router";
import App from "@/App";
import NewsDetailPage from "@/pages/NewsDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/news/:id",
    element: <NewsDetailPage />,
  },
]);

export default router;
