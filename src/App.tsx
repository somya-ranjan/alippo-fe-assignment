import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// // static import
import { useAppSelector } from "./store/hooks";
import MainLayout from "./layouts/MainLayout";
import { guestRoutes, userRoutes } from "./routes";
import "./App.css";

type routesDataType = {
  name: string;
  path: string;
  exact: boolean;
  component: React.LazyExoticComponent<() => JSX.Element>;
  redirectRoute: boolean;
};
function App() {
  // // initial state
  const tokenPresent = localStorage.getItem("authToken");

  // // redux state
  const { isAuth } = useAppSelector((state) => state.auth);

  // // local state
  const [appRoutes, setAppRoutes] = useState<routesDataType[]>([]);

  const mainContent = appRoutes.map((route: routesDataType) => {
    return route.component ? (
      <Route
        key={route.name}
        path={route.path}
        exact={route.exact}
        name={route.name}
        element={<route.component />}
      />
    ) : (
      route.redirectRoute && (
        <Route
          path="*"
          key={route.name}
          element={<Navigate to={route.path} />}
        />
      )
    );
  });

  useEffect(() => {
    if (tokenPresent || isAuth) {
      setAppRoutes(userRoutes);
    } else {
      setAppRoutes(guestRoutes);
    }
  }, [tokenPresent, isAuth]);

  return (
    <>
      <Routes>
        <Route element={<MainLayout isAuthenticated={tokenPresent} />}>
          {mainContent}
        </Route>
      </Routes>
    </>
  );
}

export default App;
