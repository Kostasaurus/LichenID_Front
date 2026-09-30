import api from "../../api/apiClient.jsx"
import {useContext, useEffect, useState} from "react"
import {userContext} from "../../contexts/contextProvider.js"

export default function SampleShow (props) {
	const { sample, onCancel } = props
	
	const [url, setUrl] = useState(null);
	
	const {
		userData,
	} = useContext(userContext);
	
	
	
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
		<>
			<div className="sticky top-0 p-5 flex justify-between items-center mb-3 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-mystic-900">
				<h3 className="text-2xl font-bold text-gradient">{sample.name || '—'}</h3>
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
			
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 mb-6 ">
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Название образца
					</p>
					<p className="text-base">
						{sample.name || '—'}
					</p>
				</div>
				
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Дата сбора
					</p>
					<p className="text-base">
						{sample.collectionDate || '—'}
					</p>
				</div>
				
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Вид
					</p>
					<p className="text-base italic">
						{sample.scientificName || '—'}
					</p>
				</div>
				
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Русское название
					</p>
					<p className="text-base">
						{sample.commonName || '—'}
					</p>
				</div>
				
				<div className="md:col-span-2">
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Место сбора
					</p>
					<p className="text-base">
						{sample.location || '—'}
					</p>
				</div>
				
				<div className="md:col-span-2">
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Местобитание
					</p>
					<p className="text-base">
						{sample.habitat || '—'}
					</p>
				</div>
				
				<div className="md:col-span-2">
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Субстрат
					</p>
					<p className="text-base">
						{sample.substrate || '—'}
					</p>
				</div>
				
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Статус
					</p>
					<p className="text-base">
						{sample.status || '—'}
					</p>
				</div>
				
				<div>
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Фотография
					</p>
					<p className="text-base">
						
						{sample.photos ?
							<img
								className="rounded-xl w-1/2 lg:w-3/4"
							src={url} alt="photo"/> : '—'}
					</p>
				</div>
				
				<div className="md:col-span-2">
					<p className="block text-md font-semibold mb-2 dark:text-glow-200">
						Примечания
					</p>
					<p className="text-base whitespace-pre-line">
						{sample.notes || '—'}
					</p>
				</div>
			</div>
			
			{/*<div className="flex justify-end">*/}
			{/*	<button*/}
			{/*		type="button"*/}
			{/*		onClick={onCancel}*/}
			{/*		className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-glow-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"*/}
			{/*	>*/}
			{/*		Закрыть*/}
			{/*	</button>*/}
			{/*</div>*/}
  </>
			)
	
}