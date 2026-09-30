import {useSettings} from "../../hooks/useSettings.jsx"
import UserSettingsButton from "./UserSettingsButton.jsx"
import {UserSetttingsForm} from "./UserSetttingsForm.jsx"
import {createPortal} from "react-dom"
import {ModalWindow} from "../Collection/ModalWindow.jsx"

export default function SettingsPortal() {
	const {
		isEmail,
		setIsEmail,
		error,
		setIsModalSettingsOpen,
		isModalSettingsOpen,
		handleInputChange,
		handleSubmit,
		handleCancel,
		SettingsForm,
		logout
	} = useSettings();
	
	return (
		<div>
			<UserSettingsButton setIsEmail={setIsEmail} setIsModalSettingsOpen={setIsModalSettingsOpen} logout={logout} />
			
			{createPortal(
				<ModalWindow isOpen={isModalSettingsOpen}>
				<UserSetttingsForm
					isEmail={isEmail}
					setIsEmail={setIsEmail}
					error={error}
					handleInputChange={handleInputChange}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
					SettingsForm={SettingsForm}/>
				</ModalWindow>
					, document.body)
			}
			
		</div>
	
	);
}