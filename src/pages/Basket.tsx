import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import BasketCard from "../components/BasketCard/BasketCard";
import BasketEmpty from "../components/BasketEmpty/BasketEmpty";
import { clearItems } from "../redux/slices/basketSlice";
import { RootState } from "../redux/store";
import { BasketItem } from "../types"; // Предположим, что у вас есть тип BasketItem

const Basket: React.FC = () => {
	const dispatch = useDispatch();
	const { items, totalPrice } = useSelector((state: RootState) => state.basket);
	
	const totalCount = items.reduce((sum: number, item: BasketItem) => sum + item.count, 0);
	
	const onClickRemove = () => {
		dispatch(clearItems());
	};
	
	if (!items.length) {
		return <BasketEmpty />;
	}
	
	return (
		<div className="cart">
			<div className="cart__top">
				<h2 className="content__title">
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						{/* ... ваш SVG код ... */}
					</svg>
					Корзина
				</h2>
				<div onClick={onClickRemove} className="cart__clear">
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						{/* ... ваш SVG код ... */}
					</svg>
					<span>Очистить корзину</span>
				</div>
			</div>
			<div className="content__items">
				{items.map((item: BasketItem) => (
					<BasketCard {...item} key={item.id + item.type + item.size} />
				))}
			</div>
			<div className="cart__bottom">
				<div className="cart__bottom-details">
					<span> Всего пицц: <b>{totalCount} шт.</b> </span>
					<span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
				</div>
				<div className="cart__bottom-buttons">
					<Link to={"/"} className="button button--outline button--add go-back-btn">
						{/* ... ваш SVG код ... */}
						<span>Вернуться назад</span>
					</Link>
					<div className="button pay-btn">
						<span>Оплатить сейчас</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Basket;
