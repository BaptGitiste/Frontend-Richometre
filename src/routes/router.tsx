import {createBrowserRouter, Navigate} from "react-router-dom";

import HomePage from "../pages/HomePage";
import Layout from "../components/layout/Layout";
import Root from "../pages/Root";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import NotFoundPage from "../pages/not-found/NotFoundPage";
import Bourse from "../pages/Bourse.tsx";
import Crypto from "../pages/Crypto.tsx";

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
          //{
           // id: "defaultRedirect",
          //  path: "/",
          //  element: <Navigate to="/login" />, // Redirige vers /login par défaut
          //},
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
            id: "Bourse",
            path: "/Bourse",
            element: <Bourse />,
          },
          {
            id: "Crypto",
            path: "/Crypto",
            element: <Crypto />,
          },

        ],
      },
    ],
  }
]);

export default router;