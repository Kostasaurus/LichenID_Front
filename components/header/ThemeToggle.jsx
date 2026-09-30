import {useEffect, useState} from 'react'

export function ThemeToggle() {
	
	const [isDarkMode, setDarkMode] = useState(() => {
		const savedTheme = localStorage.getItem("theme")
		if (savedTheme === 'dark' || !savedTheme) {return true}
		else return false
	})

	useEffect(() => {
		const theme_icon = document.getElementById("theme-icon")
		if (isDarkMode) {
			document.documentElement.classList.add('dark')
			localStorage.setItem("theme", "dark")
			
			theme_icon.classList.remove('fa-moon')
			theme_icon.classList.add('fa-sun')
		}
		else {
			document.documentElement.classList.remove('dark')
			localStorage.setItem("theme", "light")
			
			theme_icon.classList.remove('fa-sun')
			theme_icon.classList.add('fa-moon')
		}
	}, [isDarkMode])
	
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		if (!savedTheme && prefersDark) {
			setDarkMode(true);
		}
	}, []);
	
	
	
	
	return (
		
		
		
		
		
		<div>
			<button
				id="theme-toggle"
				type="button"
				onClick={() => {setDarkMode(!isDarkMode)}}
			        className="p-1.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-gray-400 dark:hover:shadow-[#e6c158] transition-shadow">
				<i id="theme-icon" className="fas fa-moon text-xl sm:text-4xl text-gray-700 dark:text-yellow-300"></i>
			</button>
		</div>
	)
}