import {useId} from "react"

export default function PhotoUploadField (props) {
	
	const {file,
	setFile} = props
	
	
		
		const handleFileChange = (e) => {
			if (e.target.files) {
				setFile(e.target.files[0]);
			}
		};
		
		
		
		const id = useId()
	
		return (
		<div>
		
			<label htmlFor={id}
			       className="block border-2 border-dashed
							 bg-white/80 dark:bg-primary-800/90
			text-md  border-mystic-400 dark:border-mystic-700
			 dark:focus:border-primary-800/90  dark:focus:shadow-glow transition-all duration-500
			  focus:outline-none focus:ring-2 dark:focus:ring-glow-600/80 focus:ring-primary-500
			   shadow-glass hover:not-focus:shadow-btn-hover
							 rounded-lg  p-2 md:p-4 text-center">
				<i className="fas fa-camera dark:text-primary-100/50 text-primary-700/70 text-2xl mb-2"></i>
				<p className="dark:text-primary-100/50 text-primary-700/70 text-sm">
					{file ? file.name : "Перетащите или нажмите для загрузки"}
				
				</p>
		<input
			id={id}
			className="visually-hidden"
			type="file" onChange={handleFileChange} accept="image/*"/>
			</label>
			
		
</div>




)
}