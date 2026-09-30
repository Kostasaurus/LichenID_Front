import {useEffect, useMemo, useState} from 'react';
import Field from '../elements/Field.jsx';
import api from '../../api/apiClient.jsx';
import speciesList from "../../assets/species.json"
import SelectButton from "../elements/SelectButton.jsx"


export default function Species() {
	const [species, setSpecies] = useState(speciesList);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedFamily, setSelectedFamily] = useState('');
	const [selectedGenus, setSelectedGenus] = useState('');
	const [selectedSubstrate, setSelectedSubstrate] = useState('');
	const [selectedThallusType, setSelectedThallusType] = useState('');
	
	useEffect(() => {
		const fetchSpecies = async () => {
			try {
				const data = await api.getFile('species/species.json');
				setSpecies(await data.json());
			} catch (err) {
				console.error('Ошибка загрузки видов:', err);
			}
		};
		fetchSpecies();
	}, []);
	
	const families = useMemo(
		() => [...new Set(species.map(s => s.family).filter(Boolean))].sort(),
		[species]
	);
	const genera = useMemo(
		() => [...new Set(species.map(s => s.genus).filter(Boolean))].sort(),
		[species]
	);
	const substrates = useMemo(
		() => [...new Set(species.map(s => s.substrate).filter(Boolean))].sort(),
		[species]
	);
	const thallusTypes = useMemo(
		() => [...new Set(species.map(s => s.thallusType).filter(Boolean))].sort(),
		[species]
	);
	
	const getOptions = (values, label) => [
		{ value: '', text: `Все ${label}` },
		...values.map(v => ({ value: v, text: v }))
	];
	
	const filteredSpecies = useMemo(() => {
		let result = species;
		const query = searchQuery.trim().toLowerCase();
		
		if (selectedFamily) {
			result = result.filter(s => s.family === selectedFamily);
		}
		if (selectedGenus) {
			result = result.filter(s => s.genus === selectedGenus);
		}
		if (selectedSubstrate) {
			result = result.filter(s => s.substrate === selectedSubstrate);
		}
		if (selectedThallusType) {
			result = result.filter(s => s.thallusType === selectedThallusType);
		}
		if (query) {
			result = result.filter(s => s.name.toLowerCase().includes(query));
		}
		
		return result.sort((a, b) => a.name.localeCompare(b.name));
	}, [species, searchQuery, selectedFamily, selectedGenus, selectedSubstrate, selectedThallusType]);
	
	return (
		<section id="species" className="mb-20 mx-auto">
			<div className="mb-5">
				<h2 className="text-3xl font-bold mb-4">
					<span className="text-gradient">Виды лишайников</span>
				</h2>
				<p className="max-w-3xl">
					Информация о различных видах лишайников, их семействах, родах, субстратах и типах таллома.
				</p>
			</div>
			
			<div className="space-y-4 mb-14">
				<div className="flex gap-3 items-end mb-6">
					<div className="relative flex-1 pr-3">
						<i className="fas fa-search absolute left-3 top-4 text-gray-400 z-10 pointer-events-none"></i>
						<Field
							placeholder="Поиск видов..."
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
							onClear={() => setSearchQuery('')}
							additionalClasses="pl-10"
						/>
					</div>
				</div>
				
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="w-full">
						<SelectButton
							id="familySelect"
							labelText="Семейство"
							value={selectedFamily}
							buttonText="Все семейства"
							onChange={option => setSelectedFamily(option.value)}
							options={getOptions(families, 'семейства')}
							searchField={true}
						/>
					</div>
					<div className="w-full">
						<SelectButton
							id="genusSelect"
							labelText="Род"
							value={selectedGenus}
							buttonText="Все роды"
							onChange={option => setSelectedGenus(option.value)}
							options={getOptions(genera, 'роды')}
							searchField={true}
							
						/>
					</div>
					<div className="w-full">
						<SelectButton
							id="substrateSelect"
							labelText="Субстрат"
							value={selectedSubstrate}
							buttonText="Все субстраты"
							onChange={option => setSelectedSubstrate(option.value)}
							options={getOptions(substrates, 'субстраты')}
							
						/>
					</div>
					<div className="w-full">
						<SelectButton
							id="thallusTypeSelect"
							labelText="Тип таллома"
							value={selectedThallusType}
							buttonText="Все типы"
							onChange={option => setSelectedThallusType(option.value)}
							options={getOptions(thallusTypes, 'типы')}
							
						/>
					</div>
				</div>
			</div>
			
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{filteredSpecies.map(speciesItem => (
					<div
						key={speciesItem.id || speciesItem.name}
						className="bg-white p-6 rounded-2xl border border-mystic-200 dark:border-mystic-700 dark:bg-primary-900 flex flex-col h-full min-h-50"
					>
						<div className="flex-1 flex flex-col justify-between">
							<div>
								<h3 className="pb-2 text-xl font-semibold dark:shadow-md dark:text-glow-200">
									{speciesItem.name}
								</h3>
								<p className="text-gray-600 dark:text-lime-50 mb-4">
									{speciesItem.description}
								</p>
							</div>
						</div>
						<div className="flex flex-wrap gap-2 mt-4 text-sm text-primary-600 dark:text-primary-300">
							{speciesItem.family && (
								<span className="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded-full">
                  <i className="fas fa-tag mr-1"></i> {speciesItem.family}
                </span>
							)}
							{speciesItem.genus && (
								<span className="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded-full">
                  <i className="fas fa-leaf mr-1"></i> {speciesItem.genus}
                </span>
							)}
							{speciesItem.substrate && (
								<span className="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded-full">
                  <i className="fas fa-tree mr-1"></i> {speciesItem.substrate}
                </span>
							)}
							{speciesItem.thallusType && (
								<span className="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded-full">
                  <i className="fas fa-shapes mr-1"></i> {speciesItem.thallusType}
                </span>
							)}
						</div>
					</div>
				))}
			</div>
			
			{filteredSpecies.length === 0 && (
				<p className="text-center text-gray-500 mt-8">Ничего не найдено</p>
			)}
		</section>
	);
}