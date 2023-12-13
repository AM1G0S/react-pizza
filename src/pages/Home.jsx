import React, {useEffect} from "react";

import {Categories} from "../components/Categories/Categories";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/Skeleton";
import {Sort} from "../components/Sort/Sort";

const Home = () => {
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0)
	const [sortType, setSortType] = React.useState({name: 'популярности', sortProperty: 'rating'})
	
	const category = categoryId > 0 ? `category=${categoryId}` : ''
	const sortBy = sortType.sortProperty.replace('-', '')
	const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
	
	useEffect(() => {
		setIsLoading(true)
		fetch(`https://65787cc6f08799dc80456b95.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data)
				setIsLoading(false)
				
				window.scrollTo(0, 0)
			})
			.catch((error) => {
				throw new Error('Произошла ошибка загрузки товаров', error);
			});
	}, [category, categoryId, order, sortBy, sortType]);
	
	return (
		<>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={setCategoryId}/>
				<Sort value={sortType} onChangeSortType={(obj) => setSortType(obj)}/>
			</div>
			
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{isLoading ? (
					Array.from({length: 12}).map((_, index) => (
						<PizzaBlockSkeleton key={index}/>
					))
				) : (products.map((item) => <PizzaBlock key={item.id} {...item} />)
				)}
			</div>
		</>
	)
}

export default Home
