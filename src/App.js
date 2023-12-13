import React, {useEffect} from "react";
import {Categories} from './components/Categories/Categories'
import {Header} from './components/Header/Header'
import {PizzaBlock} from './components/PizzaBlock/PizzaBlock'
import {Sort} from './components/Sort/Sort'
import './scss/app.scss'

export const App = () => {
	const [products, setProducts] = React.useState([]);
	
	useEffect(() => {
		fetch('https://65787cc6f08799dc80456b95.mockapi.io/items')
			.then((response) => response.json())
			.then((data) => setProducts(data))
			.catch((error) => {
				throw new Error('Произошла ошибка загрузки товаров', error);
			});
	}, []);
	
	console.log(products)
	
	return (
		<div className='wrapper'>
			<Header/>
			
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories/>
						<Sort/>
					</div>
					
					<h2 className='content__title'>Все пиццы</h2>
					<div className='content__items'>
						{products.map((item) => <PizzaBlock key={item.id} {...item} />)}
					</div>
				</div>
			</div>
		</div>
	)
}
