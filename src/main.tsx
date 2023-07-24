import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home/Home";
import SearchList from "./Components/SearchList/SearchList";
import CoinDetails from "./Components/CoinDetails/CoinDetails";
import ThemeContextProvider from "./contexts/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchList />,
  },
  {
    path: "/search/:coinId",
    element: <CoinDetails />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <RouterProvider  router={router} />
    </ThemeContextProvider>
  </React.StrictMode>
);
