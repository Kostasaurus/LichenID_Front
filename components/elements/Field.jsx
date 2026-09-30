import {useEffect, useRef, useState} from 'react'
import useClickOutside from "../../hooks/useClickOutside.jsx"
import CancelButton from "./CancelButton.jsx"

const Field = (props) => {
	const {
		type = 'search',
		placeholder = '',
		required = false,
		cancelButton = true,
		value,
		onChange,
		onClear = null,
		name = '',
		additionalClasses = '',
		colorIfNotEmpty = false,
		error = false,
	} = props
	
	
	
	
	
	const [isCanselButtonShown, setIsCanselButtonShown] = useState(false)
	
	const [isFocused, setIsFocused] = useState(false)
	
	const fieldRef = useRef(null)
	
	
	const onInputChange = (event) => {
		onChange(event)
	}
	
	const onClearTap = (event) => {
		event.preventDefault()
		event.stopPropagation()
			
			if (onClear) {
				onClear()
			} else {
				const clearedValue = {target: {name: name, value: ''}}
				onChange(clearedValue)
			}
		
	}
	
	useEffect(() => {
		setIsCanselButtonShown(isFocused && value && value.trim().length > 0)
	}, [isFocused, value])
	

	const handleTab = (event) => {
		if (event.key === 'Tab') {
			setIsCanselButtonShown(false)
		}
	}

	
	
	useClickOutside(fieldRef, (() => setIsFocused(false)))
	
	return (
		
		<div className="relative"
	ref={fieldRef}
	onKeyDown={(event) => handleTab(event)}
		>
			<input
				required={required}
			type={type}
			placeholder={placeholder}
			name={name}
			onSubmit={() => setIsCanselButtonShown(false)}
			value={value}
			onFocus={() => setIsFocused(true)}
			onChange={event => onInputChange(event)}
			className={`w-full pl-4 pr-15 py-3 bg-white/80 dark:bg-primary-800/90
			 rounded-[20px] text-md border placeholder:text-primary-700/70
			 
			   dark:placeholder:text-primary-100/50 transition-all duration-300 focus:outline-none shadow-glass
			   ${error ? `border-red-600 dark:border-red-600 dark:focus:border-red-600/80 shadow-md focus:shadow-red-600 focus:ring-1
			    hover:not-focus:shadow-btn-hover dark:focus:ring-red-600/80`:
				`focus:ring-2 border-mystic-400 dark:border-mystic-700 dark:focus:border-primary-800/90
				dark:focus:shadow-glow dark:focus:ring-glow-600/80 focus:ring-primary-500  hover:not-focus:shadow-btn-hover`}
			   ${colorIfNotEmpty && 'not=focus:not-placeholder-shown:bg-primary-300 not-focus:not-placeholder-shown:dark:bg-forest-spirit/60'}
			    ${additionalClasses}`}/>
			
			{cancelButton &&
				<CancelButton
				onCancel={(event) => onClearTap(event)}
				additionalClasses={`${isCanselButtonShown && isFocused ? '' : 'visually-hidden'}${error ? 'text-red-600! hover:text-red-800!' : ''}`}
			/>}
		
		
		</div>
		
	)
}

export default Field