import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";
import Root from "../pages/Root";
import ExternalMoviePage from "../pages/external-movie-page/ExternalMoviePage";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import AuthenticationGuard from "./AuthenticationGuard";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import DemoPage from "../pages/DemoPage";

const router = createBrowserRouter([
  {
    id: "root",
    element: <Root/>,
    errorElement: <NotFoundPage/>,
    children: [
      {
        Component: Layout,
        errorElement: <NotFoundPage/>,
        children: [
          {
            id: "login",
            path: "/login",
            element: <LoginPage />,
          },
          {
            id: "register",
            path: "/register",
            element: <RegisterPage />,
          },
        ]
      },
      {
        element: <Layout displayNavBar={true}/>,
        children: [
          {
            id: "default",
            path: "/",
            element: <HomePage />,
          },
          {
            id: "demo",
            path: "/demo/:id",
            element: <DemoPage />,
          },
          {
            element: <AuthenticationGuard/>,
            children: [
              {
                id: "external-movie-page",
                path: "/external-movie",
                element: <ExternalMoviePage />,
              },
            ]
          },
        ],
      },
    ],
  }
]);

export default router;