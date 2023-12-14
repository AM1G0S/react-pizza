import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { onChangeCategory } from '../../redux/slices/categorySlice'

export const Categories = () => {
	const category = useSelector((state) => state.categorySlice.value)
	const dispatch = useDispatch()
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
	
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => dispatch(onChangeCategory(index))}
						className={index === category ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}
