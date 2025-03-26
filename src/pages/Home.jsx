import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Filter, Calendar, List, Grid, ChevronDown } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [viewMode, setViewMode] = useState('board')
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'onhold', label: 'On Hold' }
  ]
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-surface-800 dark:text-surface-100">
            Project Dashboard
          </h1>
          <p className="text-surface-600 dark:text-surface-400 mt-1">
            Manage your projects and track progress
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" size={18} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="input pl-10 pr-4 py-2 w-full"
            />
          </div>
          
          <button className="btn btn-primary">
            <Plus size={18} className="mr-1" />
            <span>New Project</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="card p-4 mb-6">
            <h2 className="font-semibold text-lg mb-3 text-surface-800 dark:text-surface-100">
              Project Filters
            </h2>
            
            <div className="space-y-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeFilter === filter.id 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20'
                      : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="card p-4">
            <h2 className="font-semibold text-lg mb-3 text-surface-800 dark:text-surface-100">
              Project Stats
            </h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Active Projects</span>
                  <span className="text-sm font-medium">8</span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Completed Tasks</span>
                  <span className="text-sm font-medium">64%</span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Overdue Tasks</span>
                  <span className="text-sm font-medium">12%</span>
                </div>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setViewMode('board')}
                className={`p-2 rounded-lg ${
                  viewMode === 'board' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
                aria-label="Board view"
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-lg ${
                  viewMode === 'calendar' 
                    ? 'bg-primary text-white' 
                    : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                }`}
                aria-label="Calendar view"
              >
                <Calendar size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button className="btn btn-outline flex items-center gap-1">
                <Filter size={16} />
                <span>Filter</span>
                <ChevronDown size={16} />
              </button>
              
              <select className="input py-2 pl-3 pr-8 appearance-none bg-no-repeat bg-right" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundSize: "1.25rem", paddingRight: "2rem" }}>
                <option>Sort by: Latest</option>
                <option>Sort by: Oldest</option>
                <option>Sort by: Priority</option>
                <option>Sort by: Deadline</option>
              </select>
            </div>
          </div>
          
          <MainFeature />
        </div>
      </div>
    </div>
  )
}

export default Home