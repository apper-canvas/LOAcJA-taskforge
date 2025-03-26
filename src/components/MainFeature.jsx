import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Calendar, CheckCircle, AlertCircle, MoreHorizontal, Plus, X, Edit2, Trash2, Users, MessageSquare, Paperclip } from 'lucide-react'
import { format } from 'date-fns'

// Sample project data
const initialProjects = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesign the company website with modern UI/UX principles",
    status: "in-progress",
    priority: "high",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    progress: 65,
    tasks: 12,
    completedTasks: 8,
    team: [
      { id: 1, name: "Alex Johnson", avatar: "AJ", color: "bg-primary" },
      { id: 2, name: "Maria Garcia", avatar: "MG", color: "bg-secondary" },
      { id: 3, name: "Sam Lee", avatar: "SL", color: "bg-accent" }
    ]
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Develop a cross-platform mobile application for customer engagement",
    status: "planning",
    priority: "medium",
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    progress: 25,
    tasks: 20,
    completedTasks: 5,
    team: [
      { id: 2, name: "Maria Garcia", avatar: "MG", color: "bg-secondary" },
      { id: 4, name: "David Kim", avatar: "DK", color: "bg-green-500" }
    ]
  },
  {
    id: 3,
    title: "Marketing Campaign",
    description: "Q3 digital marketing campaign for product launch",
    status: "completed",
    priority: "medium",
    dueDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    progress: 100,
    tasks: 15,
    completedTasks: 15,
    team: [
      { id: 1, name: "Alex Johnson", avatar: "AJ", color: "bg-primary" },
      { id: 5, name: "Emma Wilson", avatar: "EW", color: "bg-purple-500" }
    ]
  },
  {
    id: 4,
    title: "Database Migration",
    description: "Migrate legacy database to new cloud infrastructure",
    status: "on-hold",
    priority: "urgent",
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    progress: 40,
    tasks: 18,
    completedTasks: 7,
    team: [
      { id: 3, name: "Sam Lee", avatar: "SL", color: "bg-accent" },
      { id: 6, name: "James Brown", avatar: "JB", color: "bg-yellow-500" }
    ]
  }
];

const MainFeature = () => {
  const [projects, setProjects] = useState(initialProjects)
  const [selectedProject, setSelectedProject] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "planning",
    priority: "medium",
    dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
  })
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState({})

  const handleProjectClick = (project) => {
    setSelectedProject(project)
  }

  const closeProjectDetails = () => {
    setSelectedProject(null)
  }

  const openProjectForm = (project = null) => {
    if (project) {
      setFormData({
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        priority: project.priority,
        dueDate: format(new Date(project.dueDate), 'yyyy-MM-dd')
      })
      setIsEditing(true)
    } else {
      setFormData({
        title: "",
        description: "",
        status: "planning",
        priority: "medium",
        dueDate: format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
      })
      setIsEditing(false)
    }
    setIsFormOpen(true)
    setErrors({})
  }

  const closeProjectForm = () => {
    setIsFormOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required"
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required"
    }
    
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    if (isEditing) {
      // Update existing project
      setProjects(prev => prev.map(project => 
        project.id === formData.id 
          ? { 
              ...project, 
              title: formData.title,
              description: formData.description,
              status: formData.status,
              priority: formData.priority,
              dueDate: new Date(formData.dueDate)
            } 
          : project
      ))
    } else {
      // Add new project
      const newProject = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        dueDate: new Date(formData.dueDate),
        progress: 0,
        tasks: 0,
        completedTasks: 0,
        team: []
      }
      
      setProjects(prev => [...prev, newProject])
    }
    
    closeProjectForm()
  }

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(project => project.id !== id))
    if (selectedProject && selectedProject.id === id) {
      setSelectedProject(null)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'on-hold':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
      case 'urgent':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planning': return 'Planning'
      case 'in-progress': return 'In Progress'
      case 'completed': return 'Completed'
      case 'on-hold': return 'On Hold'
      default: return status
    }
  }

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 'low': return 'Low'
      case 'medium': return 'Medium'
      case 'high': return 'High'
      case 'urgent': return 'Urgent'
      default: return priority
    }
  }

  return (
    <div>
      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
            className="card cursor-pointer group"
            onClick={() => handleProjectClick(project)}
          >
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className={`badge ${getStatusBadgeClass(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                  <span className={`badge ml-2 ${getPriorityBadgeClass(project.priority)}`}>
                    {getPriorityLabel(project.priority)}
                  </span>
                </div>
                <button 
                  className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    openProjectForm(project);
                  }}
                >
                  <Edit2 size={14} />
                </button>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 text-surface-800 dark:text-surface-100 line-clamp-1">
                {project.title}
              </h3>
              
              <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-surface-600 dark:text-surface-400">Progress</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
                <div className="h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      project.progress === 100 
                        ? 'bg-green-500' 
                        : project.progress >= 70 
                          ? 'bg-primary' 
                          : project.progress >= 30 
                            ? 'bg-yellow-500' 
                            : 'bg-accent'
                    }`} 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {project.team.slice(0, 3).map(member => (
                      <div 
                        key={member.id}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white dark:border-surface-800 ${member.color}`}
                        title={member.name}
                      >
                        {member.avatar}
                      </div>
                    ))}
                    {project.team.length > 3 && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium bg-surface-200 dark:bg-surface-700 text-surface-600 dark:text-surface-400 border-2 border-white dark:border-surface-800">
                        +{project.team.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-surface-600 dark:text-surface-400">
                    <CheckCircle size={14} className="mr-1" />
                    <span className="text-xs">{project.completedTasks}/{project.tasks}</span>
                  </div>
                  
                  <div className="flex items-center text-surface-600 dark:text-surface-400">
                    <Calendar size={14} className="mr-1" />
                    <span className="text-xs">{format(new Date(project.dueDate), 'MMM d')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Add New Project Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
          className="card cursor-pointer group border-2 border-dashed border-surface-300 dark:border-surface-700 bg-transparent hover:bg-surface-50 dark:hover:bg-surface-800/50 flex items-center justify-center min-h-[220px]"
          onClick={() => openProjectForm()}
        >
          <div className="text-center p-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
              <Plus size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
              New Project
            </h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
              Create a new project
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-surface-800 dark:text-surface-100 mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className={`badge ${getStatusBadgeClass(selectedProject.status)}`}>
                        {getStatusLabel(selectedProject.status)}
                      </span>
                      <span className={`badge ${getPriorityBadgeClass(selectedProject.priority)}`}>
                        {getPriorityLabel(selectedProject.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      onClick={() => {
                        closeProjectDetails();
                        openProjectForm(selectedProject);
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors"
                      onClick={() => {
                        deleteProject(selectedProject.id);
                        closeProjectDetails();
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                      onClick={closeProjectDetails}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-surface-600 dark:text-surface-400">
                    {selectedProject.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="card p-4">
                    <h3 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-3">
                      Project Progress
                    </h3>
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-surface-600 dark:text-surface-400">Overall Completion</span>
                        <span className="text-xs font-medium">{selectedProject.progress}%</span>
                      </div>
                      <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            selectedProject.progress === 100 
                              ? 'bg-green-500' 
                              : selectedProject.progress >= 70 
                                ? 'bg-primary' 
                                : selectedProject.progress >= 30 
                                  ? 'bg-yellow-500' 
                                  : 'bg-accent'
                          }`} 
                          style={{ width: `${selectedProject.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center text-surface-600 dark:text-surface-400">
                        <CheckCircle size={14} className="mr-1" />
                        <span>Tasks: {selectedProject.completedTasks}/{selectedProject.tasks}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="card p-4">
                    <h3 className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-3">
                      Project Timeline
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-primary" />
                      <div>
                        <div className="text-sm font-medium">Due Date</div>
                        <div className="text-surface-600 dark:text-surface-400 text-sm">
                          {format(new Date(selectedProject.dueDate), 'MMMM d, yyyy')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-secondary" />
                      <div>
                        <div className="text-sm font-medium">Time Remaining</div>
                        <div className="text-surface-600 dark:text-surface-400 text-sm">
                          {new Date(selectedProject.dueDate) > new Date() 
                            ? `${Math.ceil((new Date(selectedProject.dueDate) - new Date()) / (1000 * 60 * 60 * 24))} days left` 
                            : 'Past due date'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-surface-800 dark:text-surface-100">
                    Team Members
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.team.map(member => (
                      <div 
                        key={member.id}
                        className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 rounded-full pl-1 pr-3 py-1"
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${member.color}`}>
                          {member.avatar}
                        </div>
                        <span className="text-sm">{member.name}</span>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-full pl-1 pr-3 py-1 transition-colors">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary">
                        <Plus size={14} />
                      </div>
                      <span className="text-sm">Add Member</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
                      Recent Activity
                    </h3>
                    <button className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          <span className="text-primary">Alex Johnson</span> commented on task <span className="text-surface-800 dark:text-surface-200">Update homepage design</span>
                        </div>
                        <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          2 hours ago
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                        <CheckCircle size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          <span className="text-primary">Maria Garcia</span> completed task <span className="text-surface-800 dark:text-surface-200">Create wireframes</span>
                        </div>
                        <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          Yesterday
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                        <Paperclip size={16} />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          <span className="text-primary">Sam Lee</span> added a file to <span className="text-surface-800 dark:text-surface-200">Design Assets</span>
                        </div>
                        <div className="text-xs text-surface-500 dark:text-surface-400 mt-1">
                          2 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Project Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={closeProjectForm}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-surface-800 dark:text-surface-100">
                    {isEditing ? 'Edit Project' : 'Create New Project'}
                  </h2>
                  <button 
                    className="p-2 rounded-full bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                    onClick={closeProjectForm}
                  >
                    <X size={16} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Project Title*
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`input ${errors.title ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Enter project title"
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Description*
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="3"
                        className={`input resize-none ${errors.description ? 'border-red-500 dark:border-red-500' : ''}`}
                        placeholder="Enter project description"
                      ></textarea>
                      {errors.description && (
                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Status
                        </label>
                        <select
                          id="status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="planning">Planning</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="on-hold">On Hold</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                          Priority
                        </label>
                        <select
                          id="priority"
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          className="input"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                        Due Date*
                      </label>
                      <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className={`input ${errors.dueDate ? 'border-red-500 dark:border-red-500' : ''}`}
                      />
                      {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                      )}
                    </div>
                    
                    <div className="pt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        className="btn btn-outline"
                        onClick={closeProjectForm}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                      >
                        {isEditing ? 'Update Project' : 'Create Project'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature