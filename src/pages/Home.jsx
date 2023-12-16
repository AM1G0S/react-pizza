import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import qs from 'qs';
import {useNavigate} from 'react-router-dom'

import {SearchContext} from "../App";
import {Categories} from "../components/Categories/Categories";
import {PizzaBlock} from "../components/PizzaBlock/PizzaBlock";
import {PizzaBlockSkeleton} from "../components/PizzaBlock/Skeleton";
import {Sort, sortList} from "../components/Sort/Sort";
import {Pagination} from "../components/Pagination/Pagination";
import {setCurrentPage, setFilters} from "../redux/slices/filterSlice";

const Home = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	
	const {categoryId, sort, currentPage} = useSelector((state) => state.filter);
	
	const {searchValue} = React.useContext(SearchContext);
	const [products, setProducts] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	}
	
	const fetchPizzas = () => {
		setIsLoading(true);
		
		axios
			.get(
				`https://65787cc6f08799dc80456b95.mockapi.io/items?page=${currentPage}&limit=4&${categoryVal}${searchVal}&sortBy=${sortByVal}&order=${orderVal}`
			)
			.then((res) => {
				setProducts(res.data);
				setIsLoading(false);
			})
			.catch((error) => {
				throw new Error(`Произошла ошибка загрузки товаров: \n ${error}`);
			});
	}
	
	// переменные для работы с API
	const categoryVal = categoryId > 0 ? `category=${categoryId}` : "";
	const sortByVal = sort.sortProperty.replace("-", "");
	const orderVal = sort.sortProperty.includes("-") ? "asc" : "desc";
	const searchVal = searchValue ? `&search=${searchValue}` : "";
	
	// Если был первый ренден, то получаем параметры из URL и сохраняем их в стейте Redux
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			
			dispatch(
				setFilters({
					categoryId: Number(params.categoryId) || 0,
					currentPage: Number(params.currentPage) || 1,
					sort: sortList.find((obj) => obj.sortProperty === params.sortProperty) || sortList[0],
				})
			)
			isSearch.current = true
		}
	}, [])
	
	// Если был первый ренден, то парсим параметры фильтрации из запроса в строку и передаем в URL
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage
			})
			
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sort, searchValue, currentPage]);
	
	// получаем данные с API
	useEffect(() => {
		window.scrollTo(0, 0)
		
		if (!isSearch.current) {
			fetchPizzas();
		}
		
		isSearch.current = false
	}, [categoryId, sort, searchValue, currentPage]);
	
	
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
			<div className="content__items">
				{isLoading ? pizzaSkeletons : pizzas}
			</div>
			
			<Pagination onChangePage={onChangePage}/>
		</>
	);
};

export default Home;
