import React, { useEffect } from "react";

import { Categories } from "../components/Categories/Categories";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSkeleton } from "../components/PizzaBlock/Skeleton";
import { Sort } from "../components/Sort/Sort";
import { Pagination } from "../components/Pagination/Pagination";

const Home = ({ searchValue }) => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [currentPage, setCurrentPage] = React.useState(1)

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "asc" : "desc";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://65787cc6f08799dc80456b95.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);

        // window.scrollTo(0, 0);
      })
      .catch((error) => {
        throw new Error("Произошла ошибка загрузки товаров", error);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaSkelotns = Array.from({ length: 4 }).map((_, index) => (
    <PizzaBlockSkeleton key={index} />
  ));
  const pizzas = products.map((item) => <PizzaBlock key={item.id} {...item} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSortType={(obj) => setSortType(obj)} />
      </div>

      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? pizzaSkelotns : pizzas}</div>

	  <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </>
  );
};

export default Home;
