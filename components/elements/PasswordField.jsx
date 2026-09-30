import {useRef, useState} from 'react'

const PasswordField = (props) => {
	const {
		placeholder,
		value,
		onChange,
		name = '',
		additionalClasses = '',
		colorIfNotEmpty = false,
		error = false
	} = props
	
	const [isPasswordShown, setIsPasswordShown] = useState(false)
	
	const handleEyeButtonClick = (event) => {
		event.preventDefault()
		event.stopPropagation()
		setIsPasswordShown(!isPasswordShown)
	}
	
	const fieldRef = useRef(null)
	
	
	const onInputChange = (event) => {
		onChange(event)
	}
	
	
	return (
		<div>
			<div ref={fieldRef}>
				<div className="relative"
				     // onKeyDown={(event) => handleTab(event)}
				>
					<input
						// required={true}
						type={isPasswordShown ? "text" : "password"}
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={event => onInputChange(event)}
						className={`w-full pl-4 py-3 bg-white/80 dark:bg-primary-800/90
			 rounded-[20px] text-md border placeholder:text-primary-700/70
			   dark:placeholder:text-primary-100/50 transition-all duration-300 focus:outline-none shadow-glass
			   ${error ? `border-red-600 dark:border-red-600 dark:focus:border-red-600/80 shadow-md focus:shadow-red-600 focus:ring-1
			    hover:not-focus:shadow-btn-hover dark:focus:ring-red-600/80`:
							`focus:ring-2 border-mystic-400 dark:border-mystic-700 dark:focus:border-primary-800/90
				dark:focus:shadow-glow dark:focus:ring-glow-600/80 focus:ring-primary-500  hover:not-focus:shadow-btn-hover`}
			   ${colorIfNotEmpty && 'not=focus:not-placeholder-shown:bg-primary-300 not-focus:not-placeholder-shown:dark:bg-forest-spirit/60'}
			    ${additionalClasses}`}/>
					
							<button
								type="button"
								onMouseDown={(event) => handleEyeButtonClick(event)}
								className="inline-flex justify-center  items-center "
								title="Просмотр"
							>
								<i className={`${isPasswordShown ? 'fas fa-eye-slash' : "fas fa-eye"}
								 text-xl mr-3 text-primary-500 hover:text-primary-700 dark:text-primary-400 dark:hover:text-accent-300 transition-all duration-300 absolute top-3.5 right-2
								`}></i>
							</button>
						
					
				</div>
				
			</div>
		</div>
	)
}






export default PasswordField