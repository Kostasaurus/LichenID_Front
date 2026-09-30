import {userContext} from "../../contexts/contextProvider.js"
import {useContext} from "react"

export default function LoginButton(props) {
	
	const {
		onClick
		
	} = props
	
	const {
	userData,
	} = useContext(userContext)
	
	
	
	return (
		<>
		{!userData &&
		<>
		<button
			onClick={onClick}
			className="rounded-full md:hidden"
		>
			
			<i className={`fas fa-user text-2xl sm:text-4xl mr-3
	link-primary transition-color
	`}></i>
		</button>
		
			<button
				onClick={onClick}
			className="not-md:hidden rounded-2xl p-2 modal-submit-button"
			>
			Войти
		</button>
		
		</>
		}
		
		
		
		
		</>
		
		
	)
	
}