import {useContext, useRef, useState} from "react"
import {userContext} from "../../contexts/contextProvider.js"
import useClickOutside from "../../hooks/useClickOutside.jsx"


export default  function UserSettingsButton (props) {
	
	const {
		userData,
		setUserData
	} = useContext(userContext)
	
	const {
		setIsEmail,
		setIsModalSettingsOpen,
		logout
	} = props
	
	const [showSettingsMenu, setShowSettingsMenu] = useState(false)
	const settingsMenuRef = useRef(null)
	useClickOutside(settingsMenuRef, () => setShowSettingsMenu(false))
	
	const onClick = (isEmailMode) => {
		setIsEmail(isEmailMode)
		setShowSettingsMenu(false)
		setIsModalSettingsOpen(true)
		
		
	}
	const logoutClick = () => {
		setShowSettingsMenu(false)
		logout()
	}
	
	
	
	return (
	<div
	ref={settingsMenuRef}
	className=""
	>
		{!!userData &&
			
			<button
				onClick={() => setShowSettingsMenu(!showSettingsMenu)}
				className="rounded-full"
			>
				
				<i className={`fas fa-gear text-3xl mr-3
	link-primary transition-color
	`}></i>
			</button>
		}
		{showSettingsMenu && (
			<div
				id="semester-menu"
				className="absolute right-4 mt-0 top-full w-30 bg-white dark:bg-[#0c1F10] rounded-lg
				shadow-lg border border-gray-200 dark:border-[#1c3024] z-100"
			>
				<div className="flex flex-col">
					<button type="button"
					        onClick={() => onClick(true)}
					   className="px-4 py-2 font-medium select-primary transition-colors">Изменить почту</button>
					<button type="button"
					        onClick={() => onClick(false)}
					   className="px-4 py-2 font-medium select-primary transition-colors">Изменить пароль</button>
					<button type="button"
					        onClick={() => logoutClick()}
					   className="px-4 py-2 font-medium select-primary transition-colors">Выйти</button>
				
				</div>
			</div>
	)
}
	</div>
) }