import api from "../../api/apiClient.jsx"

export default function BookCard ({ book }) {
	
	const { title, subtitle, type, year, author, link, img } = book;
	const hasLink = link && link.trim() !== '';
	
	const handleDownload = async (downloadUrl, downloadTitle) => {
		try {
			const response = await api.downloadObject(downloadUrl,
			// {headers: {
			// 		'Content-Disposition': `attachment; filename*=UTF-8''${downloadTitle}`,
					);

			if (!response.ok) {
				throw new Error('Ошибка загрузки');
			}

			const blob = await response.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const linkElement = document.createElement('a');
			linkElement.href = blobUrl;
			linkElement.setAttribute('download', `${downloadTitle}.pdf`);
			document.body.appendChild(linkElement);
			linkElement.click();
			linkElement.remove();
			window.URL.revokeObjectURL(blobUrl);
		} catch (error) {
			console.error('Ошибка:', error);
		}
	};
	
	const TypeBadge = ({ type }) => {
		const config = {
			handbook: { label: 'Определитель', color: 'bg-primary-200 dark:bg-primary-800 -700 text-glow-200' },
			book: { label: 'Книга', color: 'bg-primary-400 text-primary-700' }
		};
		const { label, color } = config[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
		return <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${color}`}>{label}</span>;
	};
	
	return (
		<div className="bg-primary-100 dark:bg-primary-900 dark:border dark:shadow-card-hover
			dark:border-mystic-700 rounded-lg shadow-btn-primary border-primary-400
			overflow-hidden transition-shadow duration-300 flex flex-col h-full">
			<div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
				<img
					src={img}
					alt={title}
					className="w-full h-full object-cover"
				/>
			</div>
			
			<div className="p-4 flex-1 flex flex-col">
				<div className="flex items-start justify-between mb-2">
					<TypeBadge type={type} />
					{year && <span className="text-sm text-glow-500">{year}</span>}
				</div>
				
				<div className="flex-1">
					<h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
					{subtitle && (
						<p className="text-sm text-gray-600 dark:text-glow-800 mt-1 line-clamp-1">
							{subtitle}
						</p>
					)}
					{author && (
						<p className="text-sm text-gray-500 dark:text-glow-800 mt-2 italic">
							{author}
						</p>
					)}
				</div>
				
				
				<div className="mt-4">
					{hasLink ? (
						<button
							onClick={() => handleDownload(link, title)}
							className="w-full rounded text-center bg-primary-600 dark:bg-glow-700
                   dark:hover:shadow-glow dark:hover:bg-glow-600 hover:bg-primary-700
                   text-white font-medium py-2 px-4 transition-colors"
						>
							Скачать PDF
						</button>
					) : (
						<button
							disabled
							className="w-full text-center bg-gray-300 dark:bg-glow-900
                   text-glow-700 font-medium py-2 px-4 rounded cursor-not-allowed"
						>
							Недоступно
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
	

