import React, {useEffect} from "react";
import {useSelector} from 'react-redux'
import {SearchContext} from "../App"

import {Categories} from "../components/Categories/Categories";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/Skeleton";
import {Sort} from "../components/Sort/Sort";
import {Pagination} from "../components/Pagination/Pagination";

const Home = () => {
	const {categoryId, sort} = useSelector((state) => state.filter)
	
	const {searchValue} = React.useContext(SearchContext);
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [currentPage, setCurrentPage] = React.useState(1)
	
	// переменные для работы с API
	const categoryVal = categoryId > 0 ? `category=${categoryId}` : "";
	const sortByVal = sort.sortProperty.replace("-", "");
	const orderVal = sort.sortProperty.includes("-") ? "asc" : "desc";
	const searchVal = searchValue ? `&search=${searchValue}` : "";
	
	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://65787cc6f08799dc80456b95.mockapi.io/items?page=${currentPage}&limit=4&${categoryVal}${searchVal}&sortBy=${sortByVal}&order=${orderVal}`
		)
			.then((response) => response.json())
			.then((data) => {
				setProducts(data);
				setIsLoading(false);
				
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				throw new Error(`Произошла ошибка загрузки товаров: \n ${error}`);
			});
	}, [categoryId, sort, searchValue, currentPage, searchVal, sortByVal, orderVal, categoryVal]);
	
	const pizzaSkeletons = Array.from({length: 4}).map((_, index) => (
		<PizzaBlockSkeleton key={index}/>
	));
	const pizzas = products.map((item) => <PizzaBlock key={item.id} {...item} />);
	
	return (
		<>
			<div className="content__top">
				<Categories/>
				<Sort/>
			</div>
			
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? pizzaSkeletons : pizzas}</div>
			
			<Pagination onChangePage={(number) => setCurrentPage(number)}/>
		</>
	);
};

export default Home;
