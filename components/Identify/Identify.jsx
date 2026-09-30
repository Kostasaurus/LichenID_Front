import {useEffect, useMemo, useState} from 'react';
import IdentifyButton from './IdentifyButton.jsx';
import api from "../../api/apiClient.jsx"

export default function Identify() {
	const [book, setBook] = useState(null);
	
	const [history, setHistory] = useState([]);
	
	const [stepLink, setStepLink] = useState('initialStep');
	const [stepArea, setStepArea] = useState(null);
	const [fatherArea, setFatherArea] = useState(null);
	
	const [genusInfo, setGenusInfo] = useState(null);
	const [speciesInfo, setSpeciesInfo] = useState(null);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	
	useEffect(() => {
		const fetchIdentifier = async () => {
			try {
				const data = await api.downloadObject('identifiers/muchnik.json');
				setBook(await data.json());
			} catch (err) {
				throw new Error(err.message || 'Ошибка загрузки определителя');
			}
		};
		
		fetchIdentifier();
	}, []);
	
	const currentStepItems = useMemo(() => {
		if (!book) return [];
		if (stepLink !== 'initialStep' && !stepArea) return [];
		
		const items = [];
		if (stepLink === 'initialStep') {
			const initialData = book[stepLink] || {};
			for (const key in initialData) {
				items.push({ text: key, link: initialData[key] });
			}
		} else {
			for (const key in stepArea) {
				if (stepArea[key] && typeof stepArea[key] === 'object') {
					items.push({
						name: key,
						text: stepArea[key].text,
						link: stepArea[key].link
					});
				}
			}
		}
		return items;
	}, [book, stepLink, stepArea]);
	
	const processAnswer = (item) => {
		const keyLink = item.link?.trim();
		if (!keyLink) return;
		
		setHistory(prev => [...prev, {
			step: stepLink,
			stepArea: stepArea,
			fatherArea: fatherArea,
			genusInfo: genusInfo ? { ...genusInfo } : null,
			choice: item.text
		}]);
		
		if (keyLink.startsWith('р.')) {
			for (let key in book) {
				if (key.startsWith(keyLink)) {
					const genusData = book[key];
					const newGenus = { name: key, info: genusData.description };
					setGenusInfo(newGenus);
					
					if (genusData.species) {
						setStepLink("1");
						setFatherArea(genusData.species);
						setStepArea(genusData.species["1"]);
					} else if (genusData.oneSpecies) {
						setSpeciesInfo(genusData.oneSpecies);
					}
					return;
				}
			}
		}
		
		
		if (keyLink.startsWith('key')) {
			setStepLink("1");
			setFatherArea(book[keyLink]);
			setStepArea(book[keyLink]?.["1"]);
			return;
		}
		
		
		if (!isNaN(Number(keyLink))) {
			setStepLink(keyLink);
			setStepArea(fatherArea?.[keyLink]);
			return;
		}
		
		
		if (!genusInfo) {
			const genusName = keyLink.split(' ')[0];
			let foundGenus = false;
			
			for (let key in book) {
				if (key.includes(genusName)) {
					foundGenus = true;
					const target = book[key];
					const newGenus = { name: key, info: target.description };
					setGenusInfo(newGenus);
					
					if (target.oneSpecies) {
						setSpeciesInfo({ name: keyLink, info: target.oneSpecies.description || '' });
					} else if (target.species) {
						
						setStepLink("1");
						setFatherArea(target.species);
						setStepArea(target.species["1"]);
					}
					break;
				}
			}
			if (!foundGenus) {
				setSpeciesInfo({ name: keyLink, info: item.text });
			}
		} else {
			setSpeciesInfo({ name: keyLink, info: item.text });
		}
	};
	
	const goBack = () => {
		if (history.length === 0) return;
		const lastStep = history[history.length - 1];
		
		setStepLink(lastStep.step);
		setStepArea(lastStep.stepArea);
		setFatherArea(lastStep.fatherArea);
		setGenusInfo(lastStep.genusInfo);
		setSpeciesInfo(null);
		setHistory(prev => prev.slice(0, -1));
	};
	
	const restart = () => {
		setStepLink("initialStep");
		setStepArea(book);
		setFatherArea(book);
		setGenusInfo(null);
		setSpeciesInfo(null);
		setHistory([]);
	};
	
	
	
	
	const Header = () => (
		<div className="mb-5">
			<h2 className="text-3xl font-bold mb-4">
				<span className="text-gradient">Интерактивный определитель</span>
			</h2>
			<p className="max-w-3xl">Лишайники средней полосы России</p>
		</div>
	);
	
	const NavigationButtons = () => (
		<div className="grid grid-cols-2 gap-4 justify-center max-w-md mx-auto mb-4 px-4 py-2 mt-4">
			<button
				onClick={goBack}
				disabled={history.length === 0}
				className="px-4 py-2 glass-border-effect font-medium shadow-btn-primary hover:shadow-btn-hover text-xl dark:hover:shadow-glow transition-all duration-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
			>
				<i className="fas fa-arrow-left pr-2"></i> Назад
			</button>
			<button
				onClick={restart}
				className="px-4 py-2 glass-border-effect shadow-btn-primary hover:shadow-btn-hover font-medium text-xl dark:hover:shadow-glow transition-all duration-500 rounded"
			>
				<i className="fas fa-redo pr-2"></i> Сбросить
			</button>
		</div>
	);
	
	if (speciesInfo) {
		const speciesFullName = genusInfo
			? `${genusInfo.name.split(' ')[1]} ${speciesInfo.name.split(' ').slice(1).join(' ')}`
			: speciesInfo.name;
		
		const names = speciesFullName.split(' ');
		const speciesShortName = names.slice(0, 2).join(' ');
		const speciesAdditionalName = names.slice(2).join(' ');
		
		return (
			<div className="max-w-4xl mx-auto min-h-screen p-4">
				<Header />
				<h2 className="text-2xl font-bold mb-4">Результат определения:</h2>
				<p className="text-lg mb-4 dark:text-glow">
					<span className="font-bold italic">{speciesShortName} </span>
					{speciesAdditionalName}
				</p>
				{speciesInfo.info && <p className="mb-4">{speciesInfo.info}</p>}
				
				{genusInfo && (
					<div className="mt-6 p-4 bg-primary-600/60 border border-mystic-500 rounded">
						<h3 className="font-bold">Род {genusInfo.name.replace(/^р\.\s+/, '')}</h3>
						<details open={isDetailsOpen} onToggle={(e) => setIsDetailsOpen(e.target.open)}>
							<summary className="cursor-pointer text-sm underline opacity-80">
								{isDetailsOpen ? 'Скрыть' : 'Подробнее о роде'}
							</summary>
							<p className="mt-2">{genusInfo.info}</p>
						</details>
					</div>
				)}
				<NavigationButtons />
			</div>
		);
	}
	
	return (
		<div className="max-w-4xl mx-auto p-4">
			<Header />
			
			{genusInfo && (
				<div className="mb-6 p-4 bg-primary-200 dark:bg-primary-700/60 border border-mystic-400 dark:border-mystic-700 rounded">
					<h2 className="text-xl font-bold">Род {genusInfo.name.replace(/^р\.\s+/, '')}</h2>
					<details open={isDetailsOpen} onToggle={(e) => setIsDetailsOpen(e.target.open)}>
						<summary className="cursor-pointer text-sm underline opacity-80">
							{isDetailsOpen ? 'Скрыть информацию' : 'Показать информацию'}
						</summary>
						<p className="mt-2 text-sm">{genusInfo.info}</p>
					</details>
				</div>
			)}
			
			<div className="space-y-3">
				{currentStepItems.map((item, index) => (
					<IdentifyButton
						key={`${stepLink}-${index}`}
						onClick={() => processAnswer(item)}
						text={item.text}
					/>
				))}
			</div>
			
			{stepLink !== 'initialStep' && <NavigationButtons />}
		</div>
	);
}