import React from "react"
import ContentLoader from "react-content-loader"

export const PizzaBlockSkeleton = (props) => (
	<ContentLoader
		className="pizza-block"
		speed={1}
		width={280}
		height={460}
		viewBox="0 0 280 460"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="128" cy="125" r="125" />
		<rect x="5" y="267" rx="5" ry="5" width="244" height="27" />
		<rect x="7" y="307" rx="10" ry="10" width="244" height="86" />
		<rect x="5" y="422" rx="5" ry="5" width="89" height="30" />
		<rect x="115" y="412" rx="19" ry="19" width="136" height="46" />
	</ContentLoader>
)
