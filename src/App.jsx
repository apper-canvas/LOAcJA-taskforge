import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              TF
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TaskForge
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="font-medium text-surface-800 dark:text-surface-100 hover:text-primary dark:hover:text-primary-light transition-colors">
              Dashboard
            </a>
            <a href="#projects" className="font-medium text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Projects
            </a>
            <a href="#tasks" className="font-medium text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Tasks
            </a>
            <a href="#team" className="font-medium text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light transition-colors">
              Team
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <nav className="flex flex-col py-3 px-4 space-y-3">
                <a 
                  href="/" 
                  className="py-2 px-4 rounded-lg font-medium text-surface-800 dark:text-surface-100 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </a>
                <a 
                  href="#projects" 
                  className="py-2 px-4 rounded-lg font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </a>
                <a 
                  href="#tasks" 
                  className="py-2 px-4 rounded-lg font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Tasks
                </a>
                <a 
                  href="#team" 
                  className="py-2 px-4 rounded-lg font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-surface-600 dark:text-surface-400 text-sm">
                &copy; {new Date().getFullYear()} TaskForge. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Terms
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Privacy
              </a>
              <a href="#" className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App