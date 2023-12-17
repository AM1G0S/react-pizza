import React from "react";
import {useDispatch, useSelector} from "react-redux";
import debounce from "lodash.debounce"

import {setSearchValue} from '../../redux/slices/filterSlice'

import styles from './Search.module.scss'

const Search = () => {
	const dispatch = useDispatch()
	const [localValue, setLocalValue] = React.useState('')
	const inputRef = React.useRef()
	
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 300),
		[]
	);
	
	const onChangeInput = (event) => {
		setLocalValue(event.target.value)
		updateSearchValue(event.target.value)
	}
	
	const onCleatInput = () => {
		dispatch(setSearchValue(''))
		setLocalValue('')
		inputRef.current.focus()
	}
	
	return (
		<div className={styles.search}>
			<input className={styles.input} ref={inputRef} value={localValue} onChange={onChangeInput}
			       type="search" placeholder="Поиск товара"/>
			<svg className={styles.searchIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px"
			     height="48px">
				<path
					d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"/>
			</svg>
			{
				localValue &&
				<svg className={styles.closeIcon} onClick={onCleatInput} xmlns="http://www.w3.org/2000/svg"
				     viewBox="0 0 72 72" width="64px" height="64px" baseProfile="basic">
					<path
						d="M55.828,16.171c1.562,1.562,1.562,4.095,0,5.657l-34,34C21.048,56.609,20.023,57,19,57s-2.048-0.391-2.828-1.171 c-1.562-1.562-1.562-4.095,0-5.657l34-34C51.732,14.61,54.268,14.61,55.828,16.171z"/>
					<path
						d="M55.828,55.829c-1.561,1.562-4.096,1.562-5.656,0l-34-34c-1.562-1.562-1.562-4.095,0-5.657C16.952,15.391,17.977,15,19,15 s2.048,0.391,2.828,1.171l34,34C57.391,51.734,57.391,54.266,55.828,55.829z"/>
				</svg>
			}
		</div>
	);
};

export default Search;
