import BookCard from "./BookCard.jsx"
import {useEffect, useState} from "react"
import api from "../../api/apiClient.jsx"

function Literature() {
	
	const[booksData, setBooksData] = useState(null);
	
	useEffect(() => {
		const fetchBooksData = async () => {
			try {
				const data = await api.downloadObject('common/booksData.json');
				setBooksData(await data.json());
			} catch (err) {
				throw new Error(err.message || 'Ошибка загрузки литературы');
			}
		};
		
		fetchBooksData();
	}, []);
	
	
	// const [selectedType, setSelectedType] = useState('')
	//
	// const filteredBooks = useMemo(() => {
	// 	let books = booksData
	//
	// 	if (selectedType) {
	// 		books = books.filter(term => term.topic === selectedType)
	// 	}
	//
	// 	return books
	// }, [selectedType])
	
	
	return (
		<>
			
			{!!booksData &&
				<section id="glossary" className="mb-20 mx-auto">
				<div className="mb-10">
					<h2 className="text-3xl font-bold mb-4">
						<span className="text-gradient">Литература</span>
					</h2>
				</div>
				
				
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{booksData.map((book, index) => (
						<BookCard key={index} book={book}/>
					))}
				</div>
			</section>}
			
		</>
	);
}

export default Literature;