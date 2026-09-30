import InfoButton from "./InfoButton.jsx"

export default function Footer() {
	return (
		<footer className="bg-primary-50/80 dark:bg-primary-900/80  py-12 relative z-10">
			
				<div className="border-t border-gray-200 dark:border-mystic-900 pt-8 flex flex-col md:flex-col justify-between items-center gap-4">
					<div className="mb-4 md:mb-0">
						<p className="text-sm">© 2026 LichenID. Все права защищены.</p>
					</div>
					<div className="flex space-x-4">
						
						<a href="https://github.com/Kostasaurus/" className="link-primary transition-colors" target="_blank">
							<i className="fab fa-github text-xl"></i>
						</a>
						
						<a href="https://t.me/kostyaiskostya" className="link-primary transition-colors" target="_blank">
							<i className="fab fa-telegram text-xl"></i>
						</a>
						
						<InfoButton
						buttonClassname="link-primary transition-colors"
						buttonText={<i className="fab fa-youtube text-xl"></i>}
						modalWindowText={
							<div className=" font-bold text-3xl text-center">
								<p><span className="text-gradient"> У меня пока нет</span> <span className="text-glow-500">youtube-канала,</span>
								</p>
								<p className="text-gradient">но скоро будет)</p>
							</div>
						}
						/>
					</div>
				</div>
		</footer>
	)
}