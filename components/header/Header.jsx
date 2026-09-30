import {ThemeToggle} from './ThemeToggle.jsx'
import {useRef, useState} from 'react'
import {Link} from 'react-router-dom';
import AuthPortal from "../auth/AuthPortal.jsx"
import useClickOutside from "../../hooks/useClickOutside.jsx"
import SettingsPortal from "../user/SetttingsPortal.jsx"

const Header = () => {
    
    const [showMobileNav, setShowMobileNav] = useState(false);
    
    const mobileMenuRef = useRef(null)
    
    useClickOutside(mobileMenuRef, () => setShowMobileNav(false))
    
    return (
      <header id="Header"
        
        className="relative md:sticky top-0 z-100 py-4 md:pt-6 bg-primary-50/80 dark:bg-primary-900/80 backdrop-blur-md border-b border-gray-200 dark:border-mystic-900">
          <div className="w-full h-full mx-auto px-6 items-center flex justify-between">
                  <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 whitespace-nowrap gradient-bg rounded-xl flex items-center justify-center">
                          <i className="fas fa-microscope text-white"></i>
                      </div>
                      <div className="block">
                          <h1 className="text-3xl md:text-3xl font-bold text-gradient">LichenID</h1>
                          <p className="hidden sm:block sm:text-sm md:text-base text-gray-600 dark:text-lime-50">Интерактивный определитель
                              лишайников</p>
                      </div>
                  </div>
                  
                  <nav className="hidden lg:block">
                      <ul className="flex items-center space-x-8">
                          <li>
                              <Link
                                to="/"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Главная
                              </Link>
                          </li>
                          <li>
                              <Link
                                to="/identify"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Определители
                              </Link>
                          </li>
                          <li>
                              <Link
                                to="/species"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Виды
                              </Link>
                          </li>
                          <li>
                              <Link
                                to="/collection"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Коллекция
                              </Link>
                          </li>
                          <li>
                              <Link
                                to="/glossary"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Глоссарий
                              </Link>
                          </li>
                          <li>
                              <Link
                                to="/literature"
                                className="font-medium text-xl link-primary transition-colors"
                              >
                                  Литература
                              </Link>
                          </li>
                      </ul>
                  </nav>
              
             
              <div className="pl-3 flex items-center justify-between space-x-2 md:space-x-3 lg:space-x-4"
              
              
              >
                  <div className="relative">
                      <button
                        ref={mobileMenuRef}
                        id="mobile-menu-btn"
                        className="lg:hidden p-2 link-primary"
                        onClick={() => setShowMobileNav(!showMobileNav)}
                      >
                          <i className="fas fa-bars text-2xl sm:text-4xl"></i>
                      </button>
                      
                      
                  </div>
                  
                  {showMobileNav && (
                    <div
                      id="mobile-menu"
                      className="absolute right-0 mt-0 top-full w-48 bg-white dark:bg-[#0c1F10] rounded-lg shadow-lg border border-gray-200 dark:border-[#1c3024] z-100"
                    >
                        <div className="flex flex-col">
                            <Link to="/"
                               className="px-4 py-2 font-medium select-primary transition-colors">Главная</Link>
                            <Link to="/identify"
                               className="px-4 py-2 font-medium  select-primary transition-colors">Определители</Link>
                            <Link to="/species"
                               className="px-4 py-2 font-medium  select-primary transition-colors">Виды</Link>
                            <Link to="/collection"
                               className="px-4 py-2 font-medium  select-primary transition-colors">Коллекция</Link>
                            <Link to="/glossary"
                               className="px-4 py-2 font-medium  select-primary transition-colors">Глоссарий</Link>
                            <Link to="/literature"
                               className="px-4 py-2 font-medium select-primary transition-colors">Литература</Link>
                        </div>
                    </div>
                  )}
                  
                  <div>
                      <AuthPortal/>
                      <SettingsPortal/>
                      
                  </div>
                  <div>
                      <ThemeToggle/>
                  </div>
              </div>
          </div>
      </header>
    )
}
export default Header