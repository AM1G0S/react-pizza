import React, {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setCategory} from '../../redux/slices/filterSlice'
import {RootState} from "../../redux/store";

export const Categories: FC = () => {
	const category: number = useSelector((state: RootState) => state.filter.categoryId)
	const dispatch = useDispatch()
	const categories: string[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
	
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => dispatch(setCategory(index))}
						className={index === category ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}
