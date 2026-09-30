import InfoButton from "../footer/InfoButton.jsx"
import {useContext, useEffect, useId, useState} from "react"
import {userContext} from "../../contexts/contextProvider.js"
import api from "../../api/apiClient.jsx"

export function CollectionTable ({ samples, onView, onEdit, onDelete }) {
	
	
	const id=useId()
	
	const handleClick = () => {
		const button = document.getElementById(id)
		button.click()
	}
	
	const ButtonForUnauthorized = () => {
		
		
		
		return (
			<InfoButton
				modalWindowText={
					<div className=" font-bold text-2xl text-center">
						<p>Эта демонтрационная коллекция)</p>
						<p>Чтобы была своя, необходимо <span className="text-glow-500">зарегистрироваться</span></p>
					</div>
				}
				buttonId={id}
				buttonClassname="visually-hidden"
			/>
		)
	}
	
	const SampleRow = ({ sample, onView, onEdit, onDelete }) => {
		
		const {
			userData,
		} = useContext(userContext);
		
		const [url, setUrl] = useState(null);
		
		
		useEffect(() => {
			
			let isMounted = true;
			if (userData) {
				api.getObjectUrl(sample.photos[0]).then(fullUrl => {
					if (isMounted) setUrl(fullUrl);
				}).catch(err => console.error('Ошибка загрузки фото', err));
			}
			else {setUrl(sample.photos[0])}
			
			return () => { isMounted = false; };
		}, [sample.photos, userData]);
		
		return (
			<tr className="border-t border-x-0 border-mystic-200 dark:border-mystic-800 bg-white dark:bg-forest-twilight">
				<td className="p-2 md:p-4">
					<div className="flex items-center">
							{url ?
								<div className="flex w-10 h-10  rounded-lg items-center justify-center mr-3">
								<img src={url} alt="photo" className="rounded-lg w-10 h-10"/>
								</div>
							:<div className="flex w-10 h-10 gradient-bg rounded-lg items-center justify-center mr-3">
								<i className="fas fa-seedling text-white"></i>
								</div>
							}
						
						{/*<div>*/}
							{/*<div className="font-medium">{sample.id}</div>*/}
							{/*<div className="text-sm text-gray-500 dark:text-gray-400">{sample.name}</div>*/}
						{/*</div>*/}
					</div>
				</td>
				<td className="p-2 md:p-4">
					<div className="font-medium italic">{sample.scientificName}</div>
					<div className="text-sm text-gray-500 dark:text-gray-400">{sample.commonName}</div>
				</td>
				<td className="hidden lg:table-cell p-4">{sample.collectionDateFormatted}</td>
				<td className="hidden sm:table-cell p-2 md:p-4">
					<div className="flex items-center">
						<i className="fas fa-map-marker-alt text-primary-500 dark:text-primary-400 mr-2"></i>
						<span>{sample.location}</span>
					</div>
				</td>
				<td className="hidden lg:table-cell p-4">
        <span className={`px-3 py-1 rounded-full text-sm ${
	        sample.status === 'identified'
		        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
		        : sample.status === 'pending'
			        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 whitespace-nowrap'
			        : 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
        }`}>
          {sample.status === 'identified' ? 'Определен' :
	          sample.status === 'pending' ? 'На проверке' : 'Неизвестен'}
        </span>
				</td>
				<td className="p-2 md:p-4">
					<div className="flex space-x-2">
						<button
							onClick={() => onView(sample)}
							className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent-300 dark:hover:text-glow-200"
							title="Просмотр"
						>
							<i className="fas fa-eye"></i>
						</button>
						
						<button
							onClick={userData ? () => onEdit(sample) : () => handleClick()}
							className="p-2 text-gray-600 dark:text-gray-400 hover:text-accent-300 dark:hover:text-glow-200"
							title="Редактировать"
						>
							<i className="fas fa-edit"></i>
						</button>
						
						<button
							onClick={userData ? () => onDelete(sample.id) : () => handleClick()}
							className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
							title="Удалить"
						>
							<i className="fas fa-trash"></i>
						</button>
					
					</div>
				</td>
			</tr>
		);
	};
	
	
	return (
		<div className=" rounded-2xl border border-mystic-200 shadow-btn-primary dark:border-mystic-700 overflow-hidden">
			<div className="overflow-x-auto">
				<table className="w-full border-x-0">
					<thead className="bg-gray-50 p-6 rounded-2xl dark:bg-forest-button">
					<tr>
						<th className="text-left p-2 md:p-4 font-semibold">Фото</th>
						<th className="text-left p-2 md:p-4 font-semibold">Вид</th>
						<th className="text-left hidden lg:table-cell p-4 font-semibold">Дата</th>
						<th className="text-left hidden sm:table-cell p-2 md:p-4 font-semibold">Локация</th>
						<th className="text-left hidden lg:table-cell lg:p-4 font-semibold">Статус</th>
						<th className="text-left p-2 md:p-4 font-semibold">Действия</th>
					</tr>
					</thead>
					<tbody>
					{samples.map((sample) => (
						<SampleRow
							key={sample.id}
							sample={sample}
							onView={onView}
							onEdit={onEdit}
							onDelete={onDelete}
						/>
					))}
					</tbody>
				</table>
			</div>
			<ButtonForUnauthorized/>
		</div>
	);
}


