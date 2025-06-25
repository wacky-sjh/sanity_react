import { createBrowserRouter, Navigate } from "react-router-dom";
import NewsDetailPage from "@/pages/NewsDetailPage";
import Home from "@/pages/Home";
import Layout from "@/components/Layout";
import NewsList from "@/components/NewsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/ko" replace />,
  },
  {
    path: "/:lang",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/:lang/news",
    element: (
      <Layout>
        <NewsList />
      </Layout>
    ),
  },
  {
    path: "/:lang/news/:id",
    element: (
      <Layout>
        <NewsDetailPage />
      </Layout>
    ),
  },
]);

export default router;
