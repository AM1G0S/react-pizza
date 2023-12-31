import React, {FC} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";

import {addItem} from "../../redux/slices/basketSlice";

const pizzaTypes = ['тонкое', 'традиционное']

type Props = {
	imageUrl: string;
	title: string;
	price: number;
	sizes: number[];
	types: number[];
	id: string;
}

export const PizzaBlock: FC<Props> = ({imageUrl, title, price, sizes, types, id}) => {
	const dispatch = useDispatch()
	
	const [activeType, setActiveType] = React.useState(0);
	const [activeSize, setActiveSize] = React.useState(0);
	// @ts-ignore
	const cartItem = useSelector(state => state.basket.items.find(obj => obj.id === id && obj.size === sizes[activeSize] && obj.type === pizzaTypes[activeType]))
	const addedCount = cartItem ? cartItem.count : 0
	
	const onClickAdd = () => {
		dispatch(addItem({
			imageUrl,
			title,
			price,
			size: sizes[activeSize],
			type: pizzaTypes[activeType],
			id,
			count: 1,
		}))
	}
	
	return (
		<div className='pizza-block'>
			<Link to={'pizza/' + id} className='pizza-block__title'>
				<img
					className='pizza-block__image'
					src={imageUrl}
					alt='Pizza'
				/>
				<h4>{title}</h4>
			</Link>
			<div className='pizza-block__selector'>
				<ul>
					{
						types.map((typeId) => (
							<li
								key={typeId}
								className={activeType === typeId ? 'active' : ''}
								onClick={() => setActiveType(typeId)}
							>
								{pizzaTypes[typeId]}
							</li>
						))
					}
				</ul>
				<ul>
					{
						sizes.map((size, index) => (
							<li
								key={index}
								onClick={() => setActiveSize(index)}
								className={activeSize === index ? 'active' : ''}
							>
								{size} см.
							</li>
						))
					}
				</ul>
			</div>
			<div className='pizza-block__bottom'>
				<div className='pizza-block__price'>от {price} ₽</div>
				<div onClick={onClickAdd} className='button button--outline button--add'>
					<svg
						width='12'
						height='12'
						viewBox='0 0 12 12'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
							fill='white'
						/>
					</svg>
					<span>Добавить</span>
					{
						addedCount > 0 ? <i>{addedCount}</i> : ''
					}
				</div>
			</div>
		</div>
	)
}
