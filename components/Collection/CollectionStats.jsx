export const CollectionStats = ({ metadata, onAddClick }) => {
	
	let totalSamplesText = "Образцов"
	let totalSpeciesText = "Видов"
	let totalGeneraText = "Родов"
	
	


if (metadata.totalSamples > 1 && metadata.totalSamples < 5) {
	totalSamplesText = "Образца"
}
else if (metadata.totalSamples === 1) {
	 totalSamplesText = "Образец"
}
	

	if (metadata.totalSpecies > 1 && metadata.totalSpecies < 5) {
		 totalSpeciesText = "Вида"
	}
	else if (metadata.totalSpecies === 1) {
		 totalSpeciesText = "Вид"
	}
	

	if (metadata.totalGenera > 1 && metadata.totalGenera < 5) {
		 totalGeneraText = "Рода"
	}
	else if (metadata.totalGenera === 1) {
		 totalGeneraText = "Род"
	}
	
	
	
	
	
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
			<div className="bg-white p-6 rounded-2xl shadow-btn-primary border border-mystic-200 dark:border-mystic-700 dark:bg-forest-button">
				<div className="text-3xl font-bold text-gradient mb-2">{metadata.totalSamples}</div>
				<div className="text-gray-600 dark:text-gray-400">{totalSamplesText}</div>
			</div>
			<div className="bg-white p-6 rounded-2xl shadow-btn-primary border border-mystic-200 dark:border-mystic-700 dark:bg-forest-button">
				<div className="text-3xl font-bold text-gradient mb-2">{metadata.totalGenera}</div>
				<div className="text-gray-600 dark:text-gray-400">{totalGeneraText}</div>
			</div>
			<div className="bg-white p-6 rounded-2xl shadow-btn-primary border border-mystic-200 dark:border-mystic-700 dark:bg-forest-button">
				<div className="text-3xl font-bold text-gradient mb-2">{metadata.totalSpecies}</div>
				<div className="text-gray-600 dark:text-gray-400">{totalSpeciesText}</div>
			</div>
			{/*<div className="bg-white p-6 rounded-2xl shadow-btn-primary border border-mystic-200 dark:border-mystic-700 dark:bg-forest-button flex flex-col">*/}
				{/*<h3 className="text-2xl font-semibold mb-4">Добавить новый образец</h3>*/}
				<button
					className=" glass-border-effect rounded-2xl font-semibold text-xl shadow-btn-primary hover:shadow-btn-hover dark:hover:shadow-glow not-dark:hover:bg-white!"
					onClick={onAddClick}
				>
					<div className=""><i className="fas fa-plus mr-2"></i> Добавить</div>
				</button>
			{/*</div>*/}
			
		</div>
	);
};