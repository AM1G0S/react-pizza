import {Routes, Route} from "react-router-dom";

import {Header} from './components/Header/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Basket from './pages/Basket'

import './scss/app.scss'

export const App = () => {
	
	return (
		<div className='wrapper'>
			<Header/>
			
			<div className='content'>
				<div className='container'>
					
					<Routes>
						<Route path='/' element={<Home/>}/>
						<Route path='/basket' element={<Basket/>}/>
						<Route path='*' element={<NotFound/>}/>
					</Routes>
				
				</div>
			</div>
			
		</div>
	)
}
