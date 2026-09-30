export default function CancelButton(props) {
	const {
		onCancel,
			additionalClasses = ''
	} = props
	return (
	<button
		type="button"
	onMouseDown={onCancel}
	className="rounded-full"
		>
		<i className={`fas fa-times text-3xl mr-3
	text-primary-500     hover:text-primary-700
	dark:text-primary-400   dark:hover:text-accent-300 transition-all duration-150 absolute top-2.5 right-2
	${additionalClasses}
	`}></i>
	</button>
	)
}