import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface PizzaData {
	imageUrl: string;
	title: string;
	description: string;
	price: number;
	type: string;
}

const Pizza: React.FC = () => {
	const params = useParams<{ id: string }>();
	const navigate = useNavigate();
	const pizzaID = params.id;
	
	const [pizza, setPizza] = useState<PizzaData | null>(null);
	
	useEffect(() => {
		const fetchPizzas = async () => {
			try {
				const { data } = await axios.get<PizzaData>('https://65787cc6f08799dc80456b95.mockapi.io/items/' + pizzaID);
				setPizza(data);
			} catch (error) {
				alert('Такой пиццы у нас нет!');
				navigate('/');
			}
		};
		fetchPizzas();
	}, [navigate, pizzaID]);
	
	if (!pizza) {
		return <>Загрузка...</>;
	}
	
	return (
		<div>
			<img src={pizza.imageUrl} alt="" />
			<h2>{pizza.title}</h2>
			<p>{pizza.description}</p>
			<h3>{pizza.price}</h3>
			{pizza.type}
		</div>
	);
};

export default Pizza;
