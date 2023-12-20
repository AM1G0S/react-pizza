export interface Pizza {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
}

export interface FetchPizzasParams {
	category: string;
	search: string;
	sortBy: string;
	order: string;
	currentPage: number;
}

export interface BasketItem {
	id: string;
	type: string;
	size: number;
	imageUrl?: string;
	title?: string;
	price: number;
	count: number;
}
