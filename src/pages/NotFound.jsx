import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6 relative">
          <div className="text-9xl font-bold text-surface-200 dark:text-surface-800">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Not Found
            </div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 text-surface-800 dark:text-surface-100">
          Oops! Page not found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound