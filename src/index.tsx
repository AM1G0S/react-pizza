import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import store, {persistor} from './redux/store'
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react";

import {App} from './App'

const rootElement = document.getElementById('root')

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<BrowserRouter>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<App/>
				</PersistGate>
			</Provider>
		</BrowserRouter>
	)
}
