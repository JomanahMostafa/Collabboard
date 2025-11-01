import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Settings,
  Plus,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './Button';
import { Modal } from './Modal';
import { Input } from './Input';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: KanbanSquare, label: 'Boards', path: '/boards' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const { isAuthenticated } = useStore();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const { workspaces, currentWorkspaceId, setCurrentWorkspace, createWorkspace } = useStore();

  const currentWorkspace = workspaces.find((w) => w.id === currentWorkspaceId);

  const handleCreateWorkspace = () => {
    if (workspaceName.trim()) {
      createWorkspace(workspaceName.trim());
      setWorkspaceName('');
      setIsWorkspaceModalOpen(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-200 dark:border-slate-800"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? '80px' : '280px',
        }}
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-r border-gray-200/50 dark:border-slate-800/50 overflow-hidden transition-all duration-300 z-30 shadow-lg lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              {!isCollapsed && (
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Workspace
                </h3>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="ml-auto"
              >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </Button>
            </div>
            {!isCollapsed && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsWorkspaceModalOpen(true)}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Workspace
              </Button>
            )}
            {isCollapsed && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsWorkspaceModalOpen(true)}
                className="w-full p-2"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {workspaces.length > 0 && !isCollapsed && (
              <div className="mb-4">
                {workspaces.map((workspace) => (
                  <motion.button
                    key={workspace.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setCurrentWorkspace(workspace.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg mb-2 transition-all ${
                      currentWorkspaceId === workspace.id
                        ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'hover:bg-cyan-50 dark:hover:bg-cyan-950/20 text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="truncate">{workspace.name}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');

                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 4 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.aside>

      <Modal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        title="Create New Workspace"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Workspace Name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateWorkspace()}
          />
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsWorkspaceModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateWorkspace}>
              Create Workspace
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

