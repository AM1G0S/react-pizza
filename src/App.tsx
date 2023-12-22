import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import "./scss/app.scss";

const Pizza = React.lazy(
  () => import(/* webpackChunkName: "Pizza" */ "./pages/Pizza")
);
const Basket = React.lazy(
  () => import(/* webpackChunkName: "Basket" */ "./pages/Basket")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

export const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="basket"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Basket />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Pizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};
