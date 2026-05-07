"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  Home,
  ExternalLink,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResearchHubHeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export function ResearchHubHeader({ onMenuClick, title }: ResearchHubHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New project submitted",
      description: "Traditional Luhya Mourning Rituals project needs review",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Team member updated",
      description: "Dr. Stephen Asatsa profile was modified",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 3,
      title: "Media uploaded",
      description: "5 new images added to gallery",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="lg:hidden p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Page title */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                🧠🌿
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {title || "Research Hub Admin"}
                </h1>
                <p className="text-xs text-gray-500">HDLK-L Management</p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  "p-2",
                  searchOpen && "bg-gray-100"
                )}
              >
                <Search className="w-4 h-4" />
              </Button>
              
              {searchOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search projects, team members, activities..."
                      className="pl-10 pr-4"
                      autoFocus
                    />
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Press ESC to close
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions */}
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                asChild
              >
                <a href="/research-hub" target="_blank">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  View Site
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="text-xs bg-[#0F766E] text-white border-[#0F766E] hover:bg-[#0F766E]/90"
                asChild
              >
                <a href="/admin/research-hub/projects/new">
                  <Home className="w-3 h-3 mr-1" />
                  Quick Add
                </a>
              </Button>
            </div>

            {/* Dark mode toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={cn(
                  "p-2 relative",
                  notificationsOpen && "bg-gray-100"
                )}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {unreadCount} unread notifications
                    </p>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer",
                          !notification.read && "bg-blue-50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                            !notification.read ? "bg-blue-500" : "bg-gray-300"
                          )} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 border-t border-gray-200">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      Mark all as read
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className={cn(
                  "flex items-center gap-2 p-2",
                  userMenuOpen && "bg-gray-100"
                )}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#0F766E] to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  A
                </div>
                <span className="hidden sm:block text-sm">Admin</span>
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">Administrator</p>
                    <p className="text-xs text-gray-500">admin@hdlk-lab.org</p>
                  </div>
                  
                  <div className="py-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-3"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-3"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-3"
                    >
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help
                    </Button>
                  </div>

                  <div className="py-2 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start px-3 text-red-600 hover:text-red-700"
                      onClick={() => {
                        localStorage.removeItem('userSession');
                        localStorage.removeItem('authToken');
                        window.location.href = '/admin-signup';
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(searchOpen || notificationsOpen || userMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setSearchOpen(false);
            setNotificationsOpen(false);
            setUserMenuOpen(false);
          }}
        />
      )}
    </header>
  );
}
