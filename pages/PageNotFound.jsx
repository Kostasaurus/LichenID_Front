import PageBase from "./PageBase.jsx"


const PageNotFound = () => {
	
	return (
		<PageBase>
			
					<div className="text-center py-12 md:pb-24">
						
						<h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-10 leading-tight">
                    <span className="block text-gradient text-shadow-glow bg-clip-text">
                         404
                    </span>
							<span className="block  text-gradient text-shadow-glow bg-clip-text mt-6">
                        Страница не найдена
                    </span>
						</h1>
					</div>
		
		</PageBase>
	)
	
}

export default PageNotFound