"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Brain,
  Plus,
  Search,
  Edit3,
  Trash2,
  Calendar,
  Clock,
  Target,
  CheckCircle,
  AlertCircle,
  User,
  Flag,
  MoreHorizontal,
  GripVertical,
  ChevronDown,
  Filter,
  Layout,
  List,
  Grid3x3,
  X,
  Save,
  Eye,
  Star,
  Timer,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  ArrowLeft,
  Move
} from "lucide-react";

interface ResearchTask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  assignedTo: string;
  projectId: string;
  projectTitle: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

interface ResearchTasksSectionProps {
  onNavigate?: (section: string) => void;
}

export function ResearchTasksSection({ onNavigate }: ResearchTasksSectionProps) {
  const [tasks, setTasks] = useState<ResearchTask[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [selectedTask, setSelectedTask] = useState<ResearchTask | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Load tasks data
  useEffect(() => {
    loadTasksData();
  }, []);

  const loadTasksData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      const mockTasks: ResearchTask[] = [
        {
          id: '1',
          title: 'Conduct literature review on indigenous healing practices',
          description: 'Comprehensive review of existing literature on traditional healing methods across African communities, focusing on psychological benefits and cultural significance.',
          status: 'in_progress',
          priority: 'high',
          dueDate: '2024-02-15',
          assignedTo: 'Dr. Jane Smith',
          projectId: '1',
          projectTitle: 'Luhya Mourning Rituals',
          progress: 65,
          estimatedHours: 40,
          actualHours: 26,
          tags: ['research', 'literature-review', 'indigenous'],
          createdAt: '2024-01-10T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z'
        },
        {
          id: '2',
          title: 'Develop interview protocol for community elders',
          description: 'Create structured interview questions and protocols for engaging with community elders and traditional healers.',
          status: 'todo',
          priority: 'high',
          dueDate: '2024-02-01',
          assignedTo: 'Prof. Michael Johnson',
          projectId: '1',
          projectTitle: 'Luhya Mourning Rituals',
          progress: 0,
          estimatedHours: 24,
          actualHours: 0,
          tags: ['methodology', 'interviews', 'protocol'],
          createdAt: '2024-01-12T09:00:00Z',
          updatedAt: '2024-01-12T09:00:00Z'
        },
        {
          id: '3',
          title: 'Analyze survey data from urban youth mental health study',
          description: 'Statistical analysis of collected survey data focusing on depression, anxiety, and stress indicators among urban youth.',
          status: 'in_progress',
          priority: 'medium',
          dueDate: '2024-01-30',
          assignedTo: 'Dr. Alice Kimani',
          projectId: '2',
          projectTitle: 'Youth Mental Health in Urban Kenya',
          progress: 40,
          estimatedHours: 32,
          actualHours: 18,
          tags: ['analysis', 'statistics', 'survey'],
          createdAt: '2024-01-08T11:30:00Z',
          updatedAt: '2024-01-22T16:20:00Z'
        },
        {
          id: '4',
          title: 'Write final report on indigenous knowledge validation',
          description: 'Compile and write comprehensive final report documenting validated indigenous healing practices and recommendations for integration.',
          status: 'completed',
          priority: 'medium',
          dueDate: '2024-01-15',
          assignedTo: 'Dr. Joseph Mwangi',
          projectId: '3',
          projectTitle: 'Indigenous Knowledge Systems',
          progress: 100,
          estimatedHours: 48,
          actualHours: 52,
          tags: ['writing', 'final-report', 'documentation'],
          createdAt: '2023-12-01T13:45:00Z',
          updatedAt: '2024-01-15T10:45:00Z',
          completedAt: '2024-01-15T10:45:00Z'
        },
        {
          id: '5',
          title: 'Design school-based intervention materials',
          description: 'Create culturally appropriate materials and resources for school-based mental health interventions targeting urban youth.',
          status: 'todo',
          priority: 'low',
          dueDate: '2024-03-01',
          assignedTo: 'Dr. Robert Ochieng',
          projectId: '2',
          projectTitle: 'Youth Mental Health in Urban Kenya',
          progress: 0,
          estimatedHours: 36,
          actualHours: 0,
          tags: ['design', 'intervention', 'materials'],
          createdAt: '2024-01-15T15:20:00Z',
          updatedAt: '2024-01-15T15:20:00Z'
        }
      ];

      const mockProjects = [
        { id: '1', title: 'Luhya Mourning Rituals' },
        { id: '2', title: 'Youth Mental Health in Urban Kenya' },
        { id: '3', title: 'Indigenous Knowledge Systems' }
      ];

      setTasks(mockTasks);
      setProjects(mockProjects);
    } catch (error) {
      console.error('Error loading tasks data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTask = async (task: ResearchTask) => {
    try {
      console.log('Saving task:', task);
      
      setTasks(prev => prev.map(t => 
        t.id === task.id 
          ? { ...task, updatedAt: new Date().toISOString() }
          : t
      ));
      
      setSelectedTask(null);
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const createTask = async (taskData: Partial<ResearchTask>) => {
    try {
      const newTask: ResearchTask = {
        id: Date.now().toString(),
        title: taskData.title || 'New Task',
        description: taskData.description || '',
        status: 'todo',
        priority: taskData.priority || 'medium',
        dueDate: taskData.dueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        assignedTo: taskData.assignedTo || 'Unassigned',
        projectId: taskData.projectId || '',
        projectTitle: taskData.projectTitle || '',
        progress: 0,
        estimatedHours: taskData.estimatedHours || 8,
        actualHours: 0,
        tags: taskData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTasks(prev => [...prev, newTask]);
      setSelectedTask(null);
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setTasks(prev => prev.filter(t => t.id !== id));
      setSelectedTask(null);
      setShowTaskModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: ResearchTask['status']) => {
    try {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: newStatus, 
              progress: newStatus === 'completed' ? 100 : newStatus === 'in_progress' ? 50 : 0,
              updatedAt: new Date().toISOString(),
              completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined
            }
          : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      urgent: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      todo: 'bg-slate-100 text-slate-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProject = selectedProject === 'all' || task.projectId === selectedProject;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesProject && matchesPriority;
  });

  const tasksByStatus = {
    todo: filteredTasks.filter(task => task.status === 'todo'),
    in_progress: filteredTasks.filter(task => task.status === 'in_progress'),
    completed: filteredTasks.filter(task => task.status === 'completed')
  };

  const getTaskStats = () => {
    const total = filteredTasks.length;
    const completed = filteredTasks.filter(t => t.status === 'completed').length;
    const inProgress = filteredTasks.filter(t => t.status === 'in_progress').length;
    const overdue = filteredTasks.filter(t => 
      t.status !== 'completed' && new Date(t.dueDate) < new Date()
    ).length;
    
    return { total, completed, inProgress, overdue };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading research tasks...</p>
        </div>
      </div>
    );
  }

  const stats = getTaskStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            Research Tasks
          </h1>
          <p className="text-slate-600 mt-1">Track progress and manage research milestones</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Calendar View
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setSelectedTask({
                id: 'new',
                title: '',
                description: '',
                status: 'todo',
                priority: 'medium',
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                assignedTo: '',
                projectId: '',
                projectTitle: '',
                progress: 0,
                estimatedHours: 8,
                actualHours: 0,
                tags: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              } as ResearchTask);
              setShowTaskModal(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Tasks</p>
              <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">In Progress</p>
              <p className="text-2xl font-bold text-slate-900">{stats.inProgress}</p>
            </div>
            <Timer className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Completed</p>
              <p className="text-2xl font-bold text-slate-900">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Overdue</p>
              <p className="text-2xl font-bold text-slate-900">{stats.overdue}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedPriority} onValueChange={setSelectedPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('kanban')}
            >
              <Layout className="w-4 h-4 mr-2" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>
      </Card>

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* To Do Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                To Do
                <Badge variant="secondary">{tasksByStatus.todo.length}</Badge>
              </h3>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              {tasksByStatus.todo.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}
                  onDelete={() => deleteTask(task.id)}
                  onStatusChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
                />
              ))}
              
              {tasksByStatus.todo.length === 0 && (
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <p>No tasks to do</p>
                </div>
              )}
            </div>
          </div>

          {/* In Progress Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                In Progress
                <Badge variant="secondary">{tasksByStatus.in_progress.length}</Badge>
              </h3>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              {tasksByStatus.in_progress.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}
                  onDelete={() => deleteTask(task.id)}
                  onStatusChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
                />
              ))}
              
              {tasksByStatus.in_progress.length === 0 && (
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <p>No tasks in progress</p>
                </div>
              )}
            </div>
          </div>

          {/* Completed Column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Completed
                <Badge variant="secondary">{tasksByStatus.completed.length}</Badge>
              </h3>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              {tasksByStatus.completed.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}
                  onDelete={() => deleteTask(task.id)}
                  onStatusChange={(newStatus) => updateTaskStatus(task.id, newStatus)}
                />
              ))}
              
              {tasksByStatus.completed.length === 0 && (
                <div className="text-center py-8 text-slate-500 border-2 border-dashed border-slate-200 rounded-lg">
                  <p>No completed tasks</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-slate-900">{task.title}</h3>
                    <Badge className={getPriorityColor(task.priority)} variant="outline">
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(task.status)} variant="outline">
                      {task.status === 'in_progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-slate-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {task.assignedTo}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {task.actualHours}h / {task.estimatedHours}h
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {task.projectTitle}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {task.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedTask(task);
                    setShowTaskModal(true);
                  }}>
                    <Edit3 className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)} className="text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Task Modal */}
      {showTaskModal && selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                {selectedTask.id === 'new' ? 'Create New Task' : 'Edit Task'}
              </h2>
              <Button variant="outline" onClick={() => {
                setShowTaskModal(false);
                setSelectedTask(null);
              }}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask(prev => prev ? {...prev, title: e.target.value} : null)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={selectedTask.status} onValueChange={(value) => setSelectedTask(prev => prev ? {...prev, status: value as any} : null)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={selectedTask.priority} onValueChange={(value) => setSelectedTask(prev => prev ? {...prev, priority: value as any} : null)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={selectedTask.assignedTo}
                    onChange={(e) => setSelectedTask(prev => prev ? {...prev, assignedTo: e.target.value} : null)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={selectedTask.dueDate}
                    onChange={(e) => setSelectedTask(prev => prev ? {...prev, dueDate: e.target.value} : null)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectId">Project</Label>
                  <Select value={selectedTask.projectId} onValueChange={(value) => {
                    const project = projects.find(p => p.id === value);
                    setSelectedTask(prev => prev ? {...prev, projectId: value, projectTitle: project?.title || ''} : null);
                  }}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>{project.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="estimatedHours">Estimated Hours</Label>
                  <Input
                    id="estimatedHours"
                    type="number"
                    value={selectedTask.estimatedHours}
                    onChange={(e) => setSelectedTask(prev => prev ? {...prev, estimatedHours: parseInt(e.target.value)} : null)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-6 border-t">
                <Button 
                  onClick={() => selectedTask.id === 'new' ? createTask(selectedTask) : saveTask(selectedTask)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {selectedTask.id === 'new' ? 'Create Task' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowTaskModal(false);
                  setSelectedTask(null);
                }}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Task Card Component for Kanban View
function TaskCard({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}: { 
  task: ResearchTask;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: ResearchTask['status']) => void;
}) {
  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-blue-100 text-blue-800 border-blue-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      urgent: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <Card className={`p-4 cursor-pointer hover:shadow-md transition-all ${isOverdue ? 'border-red-200 bg-red-50' : ''}`}>
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-medium text-slate-900 line-clamp-2 mb-2">{task.title}</h4>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getPriorityColor(task.priority)} variant="outline" className="text-xs">
                {task.priority}
              </Badge>
              {isOverdue && (
                <Badge variant="outline" className="text-xs text-red-600 border-red-200">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onEdit}>
              <Edit3 className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-600" onClick={onDelete}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 line-clamp-2">{task.description}</p>
        
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" />
            {task.assignedTo}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
        
        {task.projectTitle && (
          <div className="text-xs text-slate-600 bg-slate-100 rounded px-2 py-1">
            {task.projectTitle}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {task.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
          
          {task.status !== 'completed' && (
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 px-2 text-xs"
                onClick={() => onStatusChange(task.status === 'todo' ? 'in_progress' : 'completed')}
              >
                {task.status === 'todo' ? 'Start' : 'Complete'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
