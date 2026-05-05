"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CheckCircle, Circle, AlertCircle, Target, Users } from "lucide-react";

interface Task {
  id: string;
  title: string;
  project: string;
  status: 'completed' | 'in-progress' | 'pending';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
  progress: number;
}

interface TaskDashboardProps {
  className?: string;
}

export function TaskDashboard({ className }: TaskDashboardProps) {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Complete data collection for Luhya mourning rituals study',
      project: 'Traditional Luhya mourning rituals',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-05-15',
      assignee: 'Dr. Stephen Asatsa',
      progress: 75
    },
    {
      id: '2',
      title: 'Submit manuscript to Cultural Evolution Society journal',
      project: 'Traditional Luhya mourning rituals',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-05-30',
      assignee: 'Dr. Elizabeth Shino',
      progress: 30
    },
    {
      id: '3',
      title: 'Develop training materials for mental health practitioners',
      project: 'Traditional Luhya mourning rituals',
      status: 'pending',
      priority: 'medium',
      dueDate: '2024-06-15',
      assignee: 'Research Team',
      progress: 20
    },
    {
      id: '4',
      title: 'Literature review on indigenous healing practices',
      project: 'Indigenous Psychology Research',
      status: 'completed',
      priority: 'low',
      dueDate: '2024-04-30',
      assignee: 'Graduate Assistants',
      progress: 100
    },
    {
      id: '5',
      title: 'Prepare conference presentation for ISSBD',
      project: 'Cross-cultural Psychology',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2024-05-20',
      assignee: 'Dr. Stephen Asatsa',
      progress: 60
    },
    {
      id: '6',
      title: 'Analyze survey data from community wellbeing study',
      project: 'Community Mental Health',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2024-05-25',
      assignee: 'Research Analyst',
      progress: 45
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in-progress':
        return Clock;
      case 'pending':
        return Circle;
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-orange-600 bg-orange-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const upcomingDeadlines = mockTasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return (
    <div className={className}>
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Task List - 70% */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Active Tasks & Progress</h3>
          </div>
          
          <div className="space-y-3">
            {mockTasks.map((task) => {
              const StatusIcon = getStatusIcon(task.status);
              return (
                <Card key={task.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="space-y-3">
                    {/* Task Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <StatusIcon className={`w-4 h-4 ${getStatusColor(task.status).split(' ')[0]}`} />
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <Badge className={getPriorityColor(task.priority)} variant="outline">
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{task.project}</span>
                          <span>•</span>
                          <span>{task.assignee}</span>
                          <span>•</span>
                          <span>{task.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Upcoming Deadlines - 30% */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Upcoming Deadlines</h3>
          </div>
          
          <Card className="p-4">
            <div className="space-y-3">
              {upcomingDeadlines.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{task.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{task.project}</span>
                      <span>•</span>
                      <span>{task.assignee}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{task.dueDate}</div>
                    <Badge className={`${getPriorityColor(task.priority)} text-xs mt-1`} variant="outline">
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Task Summary */}
          <Card className="p-4">
            <h4 className="font-semibold mb-3">Task Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tasks</span>
                <span className="font-medium">{mockTasks.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium text-blue-600">
                  {mockTasks.filter(t => t.status === 'in-progress').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="font-medium text-green-600">
                  {mockTasks.filter(t => t.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High Priority</span>
                <span className="font-medium text-red-600">
                  {mockTasks.filter(t => t.priority === 'high').length}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
