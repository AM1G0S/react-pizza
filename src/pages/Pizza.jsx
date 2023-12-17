import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

const Pizza = () => {
	const params = useParams();
	const navigate = useNavigate()
	const pizzaID = params.id
	
	const [pizza, setPizza] = React.useState([])
	
	React.useEffect(() => {
		const fetchPizzas = async () => {
			try {
				const {data} = await axios.get('https://65787cc6f08799dc80456b95.mockapi.io/items/' + pizzaID)
				setPizza(data)
			} catch (error) {
				alert('Такой пиццы у нас нет!')
				navigate('/')
			}
		}
		fetchPizzas()
	}, [navigate, pizzaID])
	
	return (
		<div>
			<img src={pizza.imageUrl} alt=""/>
			<h2>{pizza.title}</h2>
			<p>{pizza.description}</p>
			<h3>{pizza.price}</h3>
			{pizza.type}
		</div>
	)
}

export default Pizza


