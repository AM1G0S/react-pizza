import React from "react";
import {Routes, Route} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Basket from "./pages/Basket";
import Pizza from "./pages/Pizza";

import "./scss/app.scss";

export const App = () => {
	return (
		<Routes>
			<Route path={'/'} element={<MainLayout/>}>
				<Route path="" element={<Home/>}/>
				<Route path="basket" element={<Basket/>}/>
				<Route path="pizza/:id" element={<Pizza/>}/>
				<Route path="*" element={<NotFound/>}/>
			</Route>
		</Routes>
	)
};
