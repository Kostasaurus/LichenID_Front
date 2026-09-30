import {ModalWindow} from "../Collection/ModalWindow.jsx"
import {useState} from "react"
import {createPortal} from "react-dom"

export default function InfoButton ({ buttonId=null, modalWindowText, buttonClassname='', buttonText='', buttonTitle='' }) {
	
	const [isModalInfoOpen, setIsModalInfoOpen] = useState(false)
	
	
	const ModalYoutube = ({ handleSubmit } ) => {
		return (
			<div className="p-5">
				<div className="grid grid-cols-1 gap-20 md:mx-40 mb-3 px-3 md:p-4">
				
				{modalWindowText}
				
				<button
					type="button"
					className="px-6 py-3 rounded-lg  modal-submit-button"
					onClick={handleSubmit}
				>
					Понятно
				</button>
				</div>
			</div>
		)
	}
	
	
return (
	<div>
		<button
			id={buttonId}
			type="button"
			title={buttonTitle}
			onClick={() => setIsModalInfoOpen(true)}
			className={buttonClassname}>
			{buttonText}
		</button>
		
		{createPortal(
			<ModalWindow isOpen={isModalInfoOpen}>
				<ModalYoutube
					handleSubmit={() => setIsModalInfoOpen(false)}
				/>
			</ModalWindow>, document.body)}
	</div>
)

}