import React from "react";
import {Routes, Route} from "react-router-dom";

import {Header} from "./components/Header/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Basket from "./pages/Basket";

import "./scss/app.scss";

export const SearchContext = React.createContext([]);

export const App = () => {
	const [searchValue, setSearchValue] = React.useState("");
	
	return (
		<div className="wrapper">
			<SearchContext.Provider value={{searchValue, setSearchValue}}>
				
				<Header/>
				
				<div className="content">
					<div className="container">
						<Routes>
							<Route path="/" element={<Home searchValue={searchValue}/>}/>
							<Route path="/basket" element={<Basket/>}/>
							<Route path="*" element={<NotFound/>}/>
						</Routes>
					</div>
				</div>
			
			</SearchContext.Provider>
		</div>
	);
};
