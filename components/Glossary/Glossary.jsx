import {useEffect, useMemo, useState} from 'react'
import Field from '../elements/Field.jsx'
import SelectButton from '../elements/SelectButton.jsx'
import api from "../../api/apiClient.jsx"


export default function Glossary () {
	
	
	
	const [displayMode, setDisplayMode] = useState('cards')
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedTopic, setSelectedTopic] = useState('')
	const [glossary, setGlossary] = useState([]);
	
	useEffect(() => {
		const fetchGlossary = async () => {
			try {
				const data = await api.downloadObject('common/glossary.json');
				setGlossary(await data.json());
			} catch (err) {
				throw new Error(err.message || 'Ошибка загрузки глоссария');
			}
		};

		fetchGlossary();
		
	}, []);
	
	const filteredTerms = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase()
		let terms = glossary
		
		if (selectedTopic) {
			terms = terms.filter(term => term.topic === selectedTopic)
		}
		
		if (clearSearchQuery.length > 0) {
			terms = terms.filter(term =>
				term.title.toLowerCase().includes(clearSearchQuery)
			)
		}
		
		return terms
	}, [searchQuery, selectedTopic, glossary])
	
	const termsTopics = [...new Set(glossary.map(term => term.topic))].toSorted()
	
	
	const topicButtonDisplay = (topic) => {
		const isSelected = selectedTopic === topic
		return (
			<button
				key={topic}
				type="button"
				className={`px-4 py-2 rounded-xl glass-border-effect   ${isSelected ? 'shadow-glow not-dark:bg-primary-100!!' : 'hover:shadow-btn-primary not-dark:bg-white!'}`}
				onClick={() => {
					setSelectedTopic(isSelected ? '' : topic)
				}}
			>
				{topic}
			</button>
		)
	}
	
	const termsDisplay = (topic) => {
		const eachTopicTerms = topic ? (filteredTerms).filter(term => term.topic === topic) : filteredTerms
		if (displayMode === 'list') return (
			<div>
				<p className="font-bold text-2xl mt-8 mb-5 flex justify-center dark:text-glow-200">{topic}</p>
				{eachTopicTerms.map((term) => (
					<div className="mb-3"><p><span className="span font-bold">{term.title}</span>
						<span className="span"> - {term.description}</span>
					</p></div>
				))}
			</div>
		)
		else if (displayMode === 'cards')
			return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			
		{eachTopicTerms.map((term) => (
			
			<div className="bg-white p-6 rounded-2xl border border-mystic-200 dark:border-mystic-700 dark:bg-primary-900
                    flex flex-col h-full min-h-50">
				<div className="flex-1 flex flex-col justify-between">
					<div>
						<h3 className="pb-2 text-xl font-semibold dark:shadow-md dark:text-glow-200">
							{term.title}
						</h3>
						<p className="text-gray-600 dark:text-lime-50 mb-4">
							{term.description}
						</p>
					</div>
				</div>
				<div className="text-sm text-primary-600 dark:text-primary-300 mt-auto pt-4">
					<i className="fas fa-tag mr-1"></i> {term.topic}
				</div>
			</div>
		))}
	</div>
		)
	}
	
	
	
	
		return (
			<section id="glossary" className="mb-20 mx-auto">
				<div className="mb-5">
					<h2 className="text-3xl font-bold mb-4">
						<span className="text-gradient">Глоссарий терминов</span>
					</h2>
					<p className=" max-w-3xl">
						Определения морфологических, анатомических и экологических терминов, используемых в лихенологии.
					</p>
				</div>
				
				<div className="space-y-4 mb-14">
					<div className="flex gap-3 items-end mb-6">
						<div className="relative flex-1 pr-3">
							<i className="fas fa-search absolute left-3 top-4 text-gray-400 z-10 pointer-events-none"></i>
							<Field
							placeholder={"Поиск терминов..."}
							value={searchQuery}
							onChange={event => setSearchQuery(event.target.value)}
							onClear={() => setSearchQuery('')}
							additionalClasses="pl-10 placeholder:opacity-0 md:placeholder:opacity-100"
							/>
						</div>
						
						<div className="min-w-[100px]">
							
							<SelectButton
								id="displayModeSelect"
							labelText="Способ отображения:"
							value={displayMode}
								buttonText="Карточки"
								onChange={(option) => setDisplayMode(option.value)}
								options={[{value: 'list', text: 'Список'}, {value: 'cards', text: 'Карточки'}]}
							>
							</SelectButton>
							
						</div>
					</div>
					
					{/* Строка 2: Кнопки тем */}
					<div className="grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-6 gap-y-3">
						{termsTopics.map((topic) => topicButtonDisplay(topic))}
					</div>
				</div>
				
				
				
				{selectedTopic
					? termsDisplay(selectedTopic)
					: (displayMode === 'cards' ? termsDisplay('') : (termsTopics.map((topic) => termsDisplay(topic))))  // Show all topics
				}
			</section>
			
			
		)
	}
	
	
	