import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Settings, User, LogOut, ChevronDown, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from './Button';
import { Input } from './Input';

export const Navbar = () => {
  const { user, isAuthenticated, logout, boards, tasks, columns } = useStore();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ type: 'board' | 'task'; id: string; title: string; boardId?: string }>>([]);

  // Search functionality
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const results: Array<{ type: 'board' | 'task'; id: string; title: string; boardId?: string }> = [];

    // Search boards
    boards.forEach((board) => {
      if (board.title.toLowerCase().includes(query)) {
        results.push({ type: 'board', id: board.id, title: board.title });
      }
    });

    // Search tasks
    tasks.forEach((task) => {
      if (
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query)
      ) {
        results.push({
          type: 'task',
          id: task.id,
          title: task.title,
          boardId: task.boardId,
        });
      }
    });

    setSearchResults(results.slice(0, 10)); // Limit to 10 results
  }, [searchQuery, boards, tasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      // Escape to close search
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  const handleSearchResultClick = (result: { type: 'board' | 'task'; id: string; boardId?: string }) => {
    if (result.type === 'board') {
      navigate(`/boards/${result.id}`);
    } else if (result.type === 'task' && result.boardId) {
      navigate(`/boards/${result.boardId}`);
    }
    setSearchOpen(false);
    setSearchQuery('');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl border-b border-gray-200/50 dark:border-slate-800/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30"
              >
                <span className="text-white font-bold text-lg">C</span>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                CollabBoard
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search-open"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full"
                >
                  <div className="relative">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search boards, tasks..."
                      icon={<Search className="w-4 h-4" />}
                      className="w-full pr-10"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setSearchOpen(false);
                          setSearchQuery('');
                        }
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 h-6 w-6 min-w-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Search Results Dropdown */}
                  {searchQuery && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 w-full bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden z-50 max-h-96 overflow-y-auto"
                    >
                      {searchResults.length > 0 ? (
                        <div className="p-2">
                          {searchResults.map((result) => (
                            <button
                              key={`${result.type}-${result.id}`}
                              onClick={() => handleSearchResultClick(result)}
                              className="w-full text-left px-4 py-3 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950/20 transition-colors flex items-center gap-3 group"
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                result.type === 'board'
                                  ? 'bg-gradient-to-br from-cyan-500 to-teal-500'
                                  : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                              }`}>
                                <Search className="w-4 h-4 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                  {result.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                  {result.type}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p>No results found</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.button
                  key="search-closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-700"
                  type="button"
                >
                  <Search className="w-4 h-4" />
                  <span className="flex-1 text-left">Search boards, tasks...</span>
                  <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded">
                    <span className="text-[10px]">⌘</span>K
                  </kbd>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Search Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {!searchOpen && (
              <>
                {/* Notifications */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNotificationOpen(!notificationOpen)}
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-0 right-0 w-2 h-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"
                    />
                  </Button>

                  <AnimatePresence>
                    {notificationOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setNotificationOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-slate-800/50 z-20 overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                          </div>
                          <div className="max-h-96 overflow-y-auto">
                            <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
                              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p>No new notifications</p>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* Settings */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/settings')}
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* User Menu */}
            <div className="relative ml-4 pl-4 border-l border-gray-200 dark:border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 group"
                type="button"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <span className="text-white font-medium text-sm">
                    {user?.name.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.name}
                </span>
                <motion.div
                  animate={{ rotate: userMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-gray-200/50 dark:border-slate-800/50 z-20 overflow-hidden"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-800">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {user?.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            navigate('/settings');
                            setUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 rounded-lg transition-colors flex items-center gap-2"
                          type="button"
                        >
                          <User className="w-4 h-4" />
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center gap-2"
                          type="button"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
