import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Plus, KanbanSquare, Search } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { formatDate } from '../lib/utils';
import { useState } from 'react';

export function meta() {
  return [{ title: 'Boards | CollabBoard' }];
}

export default function Boards() {
  const navigate = useNavigate();
  const { boards, tasks, currentWorkspaceId, createBoard } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  const filteredBoards = boards
    .filter((b) => !currentWorkspaceId || b.workspaceId === currentWorkspaceId)
    .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCreateBoard = () => {
    if (!currentWorkspaceId) {
      alert('Please select or create a workspace first');
      return;
    }
    if (newBoardTitle.trim()) {
      createBoard(newBoardTitle.trim(), currentWorkspaceId);
      setNewBoardTitle('');
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-teal-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950">
      <Navbar />
      <Sidebar />
      <main className="ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Your Boards
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage your Kanban boards and projects
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="w-5 h-5 mr-2" />
              New Board
            </Button>
          </div>

          <div className="mb-6">
            <Input
              placeholder="Search boards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          {isCreating && (
            <Card variant="glass" className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Create New Board
              </h3>
              <div className="flex gap-3">
                <Input
                  placeholder="Board name"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateBoard()}
                  className="flex-1"
                />
                <Button onClick={handleCreateBoard}>Create</Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {filteredBoards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBoards.map((board) => {
                const boardTasks = tasks.filter((t) => t.boardId === board.id);
                return (
                  <motion.div
                    key={board.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -4 }}
                  >
                    <Card
                      variant="glass"
                      className="cursor-pointer h-full"
                      onClick={() => navigate(`/boards/${board.id}`)}
                    >
                      <div className={`w-full h-32 ${board.color} rounded-xl mb-4 flex items-center justify-center`}>
                        <KanbanSquare className="w-12 h-12 text-white opacity-80" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {board.title}
                      </h3>
                      {board.description && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {board.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <span>{boardTasks.length} tasks</span>
                        <span>{formatDate(board.updatedAt)}</span>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <Card variant="glass" className="text-center py-12">
              <KanbanSquare className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No boards found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery ? 'Try a different search term' : 'Create your first board to get started'}
              </p>
              {!searchQuery && (
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-5 h-5 mr-2" />
                  Create Board
                </Button>
              )}
            </Card>
          )}
        </motion.div>
      </main>
    </div>
  );
}

