import React from 'react'

export const Categories = () => {
	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
	const [activeCategory, setActiveCategory] = React.useState(0)
	
	return (
		<div className='categories'>
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => setActiveCategory(index)}
						className={index === activeCategory ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}
