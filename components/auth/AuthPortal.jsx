import {useAuth} from "../../hooks/useAuth.jsx";
import {createPortal} from "react-dom"

import LoginButton from "./LoginButton.jsx";
import {ModalWindow} from "../Collection/ModalWindow.jsx"
import {AuthForm} from "./AuthForm.jsx"

export default function AuthPortal() {
	const {
		isRegistr,
		setIsRegistr,
		error,
		setIsModalLoginOpen,
		isModalLoginOpen,
		handleInputChange,
		handleSubmit,
		handleCancel,
		loginForm
	} = useAuth();
	
	return (
		<div>
			<LoginButton onClick={() => setIsModalLoginOpen(true)} />
			
			{createPortal(
			<ModalWindow isOpen={isModalLoginOpen}>
				<AuthForm
					isRegistr={isRegistr}
					setIsRegistr={setIsRegistr}
					error={error}
					handleInputChange={handleInputChange}
					handleSubmit={handleSubmit}
					handleCancel={handleCancel}
					loginForm={loginForm}
				/>
			</ModalWindow>, document.body)}
		</div>
		
	);
}