import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import {
  Categories,
  PizzaBlock,
  PizzaBlockSkeleton,
  Sort,
  sortList,
  Pagination,
} from "../components/";

import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Pizza } from "../types";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state: RootState) => state.filter
  );
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const searchValue = useSelector(
    (state: RootState) => state.filter.searchValue
  );

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = React.useCallback(async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    try {
      await dispatch(
        fetchPizzas({ category, search, sortBy, order, currentPage })
      );

      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Ошибка при получении пицц:", error);
    }
  }, [categoryId, searchValue, sort.sortProperty, dispatch, currentPage]);

  // Если был первый рендер, то получаем параметры из URL и сохраняем их в стейте Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as {
        categoryId?: string;
        currentPage?: string;
        sortProperty?: string;
      };

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId) || 0,
          currentPage: Number(params.currentPage) || 1,
          sort:
            sortList.find((obj) => obj.sortProperty === params.sortProperty) ||
            sortList[0],
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  // Если был первый рендер, то парсим параметры фильтрации из запроса в строку и передаем в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, searchValue, currentPage, navigate]);

  // получаем данные с API
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage, getPizzas]);

  const pizzaSkeletons = Array.from({ length: 4 }).map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));
  const pizzas = items.map((item: Pizza) => (
    <PizzaBlock key={item.id} {...item} />
  ));

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>

      {status === "error" ? (
        <div className="content__error">
          <h2>К сожалению, не удалось загрузить пиццы 😕</h2>
          <p>Попробуйте еще раз, или перезагрузите страницу.</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {status === "loading" ? (
              pizzaSkeletons
            ) : items.length > 0 ? (
              pizzas
            ) : (
              <h3 className="content__subtitle_empty">Ничего не найдено 😕</h3>
            )}
          </div>
          <Pagination onChangePage={onChangePage} />
        </>
      )}
    </>
  );
};

export default Home;
