import {useEffect, useMemo, useRef, useState} from 'react';
import useClickOutside from "../../hooks/useClickOutside.jsx";
import Field from "./Field.jsx"

export default function SelectButton({
	                                     id,
	                                     labelText,
	                                     value,
	                                     onChange,
	                                     options,
	                                     buttonText = '',
	                                     additionalLabelClasses = '',
	                                     additionalOptionClasses = '',
	                                     additionalButtonClasses = '',
																			 searchField = null
                                     }) {
	const [isOptionsOpen, setIsOptionsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(buttonText);
	const selectRef = useRef(null);
	
	useClickOutside(selectRef, () => setIsOptionsOpen(false));
	
	useEffect(() => {
		if (value) {
			const selectedOption = options.find(opt => opt.value === value);
			setSelectedValue(selectedOption ? selectedOption.text : buttonText);
		} else {
			setSelectedValue(buttonText);
		}
	}, [value, options, buttonText]);
	
	const handleOptionClick = (option) => {
		setSelectedValue(option.text);
		setIsOptionsOpen(false);
		if (onChange) onChange(option);
	};
	
	const [searchQuery, setSearchQuery] = useState('')
	
	const filteredOptions = useMemo (() => {
		
		const clearSearchQuery = searchQuery.trim().toLowerCase()
		if (clearSearchQuery === 0) return options
		
		
		
		
			let matchedOptions = options.filter(option =>
				option.text.toLowerCase().includes(clearSearchQuery)
			)
		
		
		matchedOptions.sort((a, b) => {
			const aStarts = a.text.toLowerCase().startsWith(searchQuery);
			const bStarts = b.text.toLowerCase().startsWith(searchQuery);
			if (aStarts && !bStarts) return -1;
			if (!aStarts && bStarts) return 1;
			return 0;
		});
		
		return matchedOptions
	}, [searchQuery])
	
	
	
	return (
		<div className={`relative w-full ${isOptionsOpen ? "z-50" : "z-10"}`}
		     ref={selectRef}
		>
			<p className={`block mb-2 pl-1 text-md font-medium whitespace-nowrap ${additionalLabelClasses}`}>
				{labelText}
			</p>
			
			<button
				type="button"
				id={id}
				// ref={selectRef}
				onClick={() => setIsOptionsOpen(!isOptionsOpen)}
				className={`w-full btn-select py-2 px-4 flex justify-between items-center ${additionalButtonClasses}`}
			>
				<span>{selectedValue}</span>
				<i className={`pr-2 ${isOptionsOpen ? "fas fa-angle-up" : "fas fa-angle-down"}`}></i>
			</button>
			
			{isOptionsOpen && (
				<div
					className= "grid gap-1 p-2 absolute mt-2 top-full w-full bg-white dark:bg-[#0c1F10] rounded-lg shadow-lg border border-gray-200
					 dark:border-[#1c3024] z-50 max-h-90 overflow-y-auto custom-scrollbar"
				>
					{searchField &&
						<div className="relative flex-1 pr-3">
						<i className="fas fa-search absolute left-3 top-2.5 text-sm  text-gray-400 z-10 pointer-events-none"></i>
						<Field
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
							onClear={() => setSearchQuery('')}
							additionalClasses="rounded-2xl! py-1! pl-10!"
							cancelButton={false}
						/>
					</div>
					}
					{filteredOptions.map((option) => (
						<button
							key={option.value}
							type="button"
							value={option.value}
							onClick={() => handleOptionClick(option)}
							className={`w-full text-left px-4 py-2 font-medium select-primary ${additionalOptionClasses}
							}`}
						>
							{option.text}
						</button>
					))}
				</div>
			)}
		</div>
	);
}