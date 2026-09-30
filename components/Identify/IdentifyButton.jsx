export default function IdentifyButton(props) {
	
	const {
		onClick,
		id,
		text
	} = props
	
	
	
	return (
		<button
			onClick={() => onClick('thesis')}
			className="bg-white dark:bg-forest-button w-full text-left mb-5 rounded-xl border border-primary-400
			dark:border-mystic-700 hover:translate-x-3 hover:border-primary-700 hover:shadow-primary-200 dark:hover:border-glow-400 hover:shadow-md transition-all shadow-accent-300 "
		>
			<div className="flex items-center justify-between p-6">
				<div>
					<div className="">
						{text}
					</div>
				</div>
				<div className="flex-shrink-0 ml-4">
					<div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
						<i className="fas fa-chevron-right text-primary-600 dark:text-primary-400"></i>
					</div>
				</div>
			</div>
		</button>
	)
}