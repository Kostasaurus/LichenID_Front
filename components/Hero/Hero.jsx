import {Link} from "react-router-dom"

export default function Hero() {
	
	
	return (
		<section id="home" className="z-10">
			
			<div className="text-center sm:py-12 md:pb-24">
				
				
				<h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-10 leading-tight">
                    <span className="block text-gradient text-shadow-glow bg-clip-text">
                        Интерактивный определитель
                    </span>
					<span className="block text-primary-400 dark:text-lime-50 mt-6 text-shadow">
                        лишайников
                    </span>
				</h1>
				
				<div className="glass-gradient not-dark:bg-white!  max-w-3xl mx-auto
				mb-14 rounded-3xl  px-2 pt-6 pb-8 border dark:border-mystic-700">
					<p className="text-xl text-mystic-700 dark:text-mystic-200 leading-relaxed">
						Первый сайт для интерактивного определения, коллекционирования и изучения
						<span className="text-accent-300 font-semibold"> лишайников.</span>
					</p>
					<div className="mt-6 flex items-center justify-center space-x-4 text-mystic-400">
						<i className="fas fa-moon text-accent-400"></i>
						<span className="text-sm">Погрузитесь в мир лихенологии</span>
						<i className="fas fa-tree text-primary-400"></i>
					</div>
				</div>
				
				<div className="flex flex-col sm:flex-row gap-6 justify-center mb-24">
					<Link className="group btn-primary px-12 py-5 rounded-2xl! not-dark:bg-primary-100! not-dark:border-mystic-400!
  font-semibold text-xl relative overflow-hidden
  hover:scale-110 hover:shadow-3xl hover:shadow-primary-500/30
  transition-all duration-700 ease-out flex items-center justify-center dark: bg-glow-700/10! dark:hover:bg-glow-700/20!"
					      to='/identify'>
						<i className="fas fa-dna mr-6 group-hover:rotate-90 transition-transform duration-700"></i>
						<span className="group-hover:text-glow-500 group-hover:text-2xl has-hover:transition-all duration-700">Начать определение</span>
						<i className="fas fa-dna ml-6 group-hover:-rotate-90 transition-transform duration-700"></i>
					
					</Link>
				
				</div>
			</div>
			
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
				{[
					{
						icon: 'key',
						title: 'Определители',
						description: 'Выберите определитель для любого региона и уровня сложности',
						color: 'from-accent-500 to-yellow-700',
						glow: 'shadow-[0_0_30px_rgba(184,155,61,0.6)]',
						link:'/identify'
					},
					{
						icon: 'folder-open',
						title: 'Коллекция',
						description: 'Храните данные о своих образцах в надежном месте',
						color: 'from-primary-500 to-mystic-700',
						glow: 'shadow-[0_0_30px_rgba(74,124,94,0.6)]',
						link:'/collection'
					},
					{
						icon: 'graduation-cap',
						title: 'Глоссарий',
						description: 'Глоссарий терминов, использующихся в определителях',
						color: 'from-purple-500 to-primary-700',
						glow: 'shadow-[0_0_30px_rgba(138,43,226,0.6)]',
						link:'/glossary'
					},
					{
						icon: 'book-open',
						title: 'Литература',
						description: 'Хранилище самой разнообразной лихенологической литературы',
						color: 'from-secondary-500 to-accent-700',
						glow: 'shadow-[0_0_30px_rgba(184,155,61,0.6)]',
						link:'/literature'
					}
				].map((card, index) => (
					<Link
						to={`${card.link}`}>
					<div
						key={index}
						className="group glass-effect p-7 not-dark:bg-white! rounded-2xl hover:-translate-y-2.5 transition-all duration-500 animate-fade-in-up"
						style={{ animationDelay: `${index * 150}ms` }}
					>
						<div className={`relative mb-7 `}>
							<div className={`w-20 h-20 rounded-2xl ${card.glow} flex items-center justify-center bg-linear-to-br ${card.color}`}>
								<i className={`fas fa-${card.icon} text-white text-3xl`}></i>
							</div>
							<div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500/10 dark:bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
								<div className="w-2 h-2 bg-primary-500 dark:bg-accent-400 rounded-full animate-pulse"></div>
							</div>
						</div>
						<h3 className="text-2xl text-mystic-700 font-bold mb-5 dark:text-mystic-50 group-hover:text-accent-300 transition-colors">
							{card.title}
						</h3>
						<p className="dark:text-mystic-300 text-primary-500 mb-7 leading-relaxed">
							{card.description}
						</p>
						<p
							className="inline-flex items-center text-primary-500 dark:text-primary-300 group-hover:text-accent-400 font-semibold text-lg"
						>
                            <span className="border-b  border-transparent group-hover:border-accent-400 transition-border">
                                 Изучить
                            </span>
							<i className="fas fa-arrow-right ml-3 group-hover:translate-x-3 transition-transform"></i>
						</p>
					</div>
					</Link>
				))}
			</div>
		</section>
	)
}