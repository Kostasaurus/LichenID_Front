import Field from '../elements/Field.jsx'
import SelectButton from '../elements/SelectButton.jsx'
import PhotoUploadField from "../elements/PhotoUploadField.jsx"
import {useContext} from "react"
import {userContext} from "../../contexts/contextProvider.js"

export function SampleForm (props) {
const {
	mode = 'add',
	formData,
	onChange,
	onSubmit,
	onCancel,
	setSelectedPhoto,
	selectedPhoto
	} = props
	const isEditMode = mode === 'edit'
	
	const {
		userData,
	} = useContext(userContext);
	
	return (
		<>
			<div className="sticky z-50 top-0 p-5 flex justify-between items-center mb-6 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-mystic-900">
				<h3 className="text-3xl font-bold text-gradient">{isEditMode ? 'Изменить образец' : 'Добавить образец'}</h3>
				<button
					onClick={onCancel}
					className="rounded-full"
				>
					<i className="fas fa-times text-3xl mr-3
					text-primary-500     hover:text-primary-700
					dark:text-primary-400   dark:hover:text-accent-300 transition-colors
					
					"></i>
				</button>
			</div>
			
			<form onSubmit={onSubmit} autoComplete="off">
				{userData ? '' : <p className="text-red-600 px-2 my-2 text-center text-xl">Для добавления образцов необходимо зарегистрироваться!</p>}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-3 md:p-4 mb-6">
					<div>
						<label className="block text-sm font-medium mb-2">
							Название образца
						</label>
						<Field
							type="text"
							name="name"
							value={formData.name}
							onChange={onChange}
							placeholder={isEditMode ? formData.name : 'LF-2024-001'}
						additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
						
					</div>
					
					<div>
						<label className="block text-sm font-medium mb-2">
							Дата сбора
						</label>
						
						<Field
							type="text"
							name="collectionDate"
							value={formData.collectionDate}
							onChange={onChange}
							placeholder={isEditMode ? formData.collectionDate : "12-01-2026"}
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div>
						<label className="block text-sm font-medium mb-2">
							Вид (латинское название)
						</label>
						<Field
							type="text"
							name="scientificName"
							value={formData.scientificName}
							onChange={onChange}
							placeholder={isEditMode ? formData.scientificName : 'Cladonia rangiferina'}
							
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div>
						<label className="block text-sm font-medium mb-2">
							Русское название
						</label>
			
						<Field
							type="text"
							name="commonName"
							value={formData.commonName}
							onChange={onChange}
							placeholder={isEditMode ? formData.commonName : "Олений мох"}
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div className="md:col-span-2">
						<label className="block text-sm font-medium mb-2">
							Место сбора
						</label>
						
					
						<Field
							type="text"
							name="location"
							value={formData.location}
							onChange={onChange}
							placeholder={isEditMode ? formData.location : "Сосновый бор, Ленинградская область"}
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div className="md:col-span-2">
						<label className="block text-sm font-medium mb-2">
							Местобитание
						</label>
						
						<Field
							type="text"
							name="habitat"
							value={formData.habitat}
							onChange={onChange}
							placeholder={isEditMode ? formData.habitat : "На старой сосне"}
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div className="md:col-span-2">
						<label className="block text-sm font-medium mb-2">
							Субстрат
						</label>
					
						<Field
							type="text"
							name="substrate"
							value={formData.substrate}
							onChange={onChange}
							placeholder={isEditMode ? formData.substrate : "Кора сосны обыкновенной (Pinus sylvestris)"}
							
							additionalClasses="rounded-md!"
							colorIfNotEmpty={true}
						/>
					</div>
					
					<div>
						
						<SelectButton
							id="sampleStatusSelect"
							labelText="Статус:"
							value={formData.status}
							buttonText={isEditMode ? formData.status : "Определен"}
							onChange={onChange}
							options={[{value: 'pending', text: 'На проверке'}, {value: 'identified', text: 'Определен'}, {value: 'unknown', text: 'Неизвестен'}]}
						>
						</SelectButton>
						
					</div>
					
					<div>
						<label className="block text-sm font-medium mb-2">
							Фотография
						</label>
						<PhotoUploadField
						file={selectedPhoto}
						setFile={setSelectedPhoto}
						/>
					</div>
					
					<div className="md:col-span-2">
						<label className="block text-sm font-medium mb-2">
							Примечания
						</label>
						<textarea
							className="rounded-md w-full pl-4 py-3 bg-white/80 dark:bg-primary-800/90
			  text-md border border-mystic-400 dark:border-mystic-700
			 dark:focus:border-primary-800/90  dark:focus:shadow-glow transition-all duration-500
			  focus:outline-none focus:ring-2 dark:focus:ring-glow-600/80 focus:ring-primary-500
			   shadow-glass hover:not-focus:shadow-btn-hover placeholder:text-primary-700/70
			   dark:placeholder:text-primary-100/50"
							name="notes"
							value={formData.notes}
							onChange={onChange}
							rows="3"
							placeholder={isEditMode ? formData.notes : "Дополнительная информация об образце..."}
						></textarea>
					</div>
				</div>
				
				<div className="flex justify-end space-x-5 pr-5 pb-5">
					<button
						type="button"
						onClick={onCancel}
						className="px-6 py-3 rounded-lg border border-mystic-400 dark:border-mystic-700
						  hover:bg-white
						  dark:hover:bg-mystic-700/40 font-medium"
					>
						Отмена
					</button>
					
					{userData ?
					<button
						type="submit"
						className="px-6 py-3 rounded-lg  bg-primary-600 text-white
						font-semibold  not-dark:hover:opacity-80 hover:dark:shadow-glow transition-all duration-500"
						onClick={onSubmit}
						disabled={!userData}
					>
						<i className="fas fa-save mr-2"></i>
						Сохранить образец
					</button>
						:
						<div
							className="px-6 py-3 rounded-lg  bg-primary-400 text-white
						font-semibold"
						>
							<i className="fas fa-save mr-2"></i>
							Сохранить образец
						</div>}
				</div>
			</form>
		</>
		
		
		
		
		
		
	)
	






}