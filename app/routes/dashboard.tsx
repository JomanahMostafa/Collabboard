import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import {
  Plus,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  KanbanSquare,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#06b6d4', '#14b8a6', '#10b981', '#f59e0b'];

export function meta() {
  return [{ title: 'Dashboard | CollabBoard' }];
}

export default function Dashboard() {
  const { user, isAuthenticated, boards, tasks, getTaskStats, createBoard, currentWorkspaceId } = useStore();
  const navigate = useNavigate();
  const stats = getTaskStats();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const recentBoards = boards
    .filter((b) => !currentWorkspaceId || b.workspaceId === currentWorkspaceId)
    .slice(0, 4);

  // Prepare chart data
  const taskDistributionData = [
    { name: 'Done', value: stats.completed, color: COLORS[2] },
    { name: 'In Progress', value: stats.inProgress, color: COLORS[1] },
    { name: 'To Do', value: stats.pending, color: COLORS[0] },
    { name: 'Overdue', value: stats.overdue, color: COLORS[3] },
  ].filter((item) => item.value > 0);

  const weeklyData = [
    { day: 'Mon', tasks: 12 },
    { day: 'Tue', tasks: 19 },
    { day: 'Wed', tasks: 15 },
    { day: 'Thu', tasks: 22 },
    { day: 'Fri', tasks: 18 },
    { day: 'Sat', tasks: 8 },
    { day: 'Sun', tasks: 5 },
  ];

  const priorityData = [
    { priority: 'High', count: tasks.filter((t) => t.priority === 'high').length },
    { priority: 'Medium', count: tasks.filter((t) => t.priority === 'medium').length },
    { priority: 'Low', count: tasks.filter((t) => t.priority === 'low').length },
  ];

  const handleCreateBoard = () => {
    if (!currentWorkspaceId) {
      alert('Please select or create a workspace first');
      return;
    }
    const title = prompt('Enter board name:');
    if (title) {
      createBoard(title, currentWorkspaceId);
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
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Here's what's happening with your projects today.
              </p>
            </div>
            <Button onClick={handleCreateBoard} className="w-full sm:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              New Board
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card variant="glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {stats.total}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                  <KanbanSquare className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {stats.completed}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.inProgress}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Overdue</p>
                  <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {stats.overdue}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card variant="glass">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Task Distribution
              </h3>
              {taskDistributionData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props: any) => {
                        const { name, percent } = props;
                        return `${name} ${((percent || 0) * 100).toFixed(0)}%`;
                      }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  No tasks yet
                </div>
              )}
            </Card>

            <Card variant="glass">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Weekly Activity
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis dataKey="day" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={{ fill: '#06b6d4', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Priority Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card variant="glass">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Tasks by Priority
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priorityData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300 dark:stroke-gray-700" />
                  <XAxis dataKey="priority" className="text-gray-600 dark:text-gray-400" />
                  <YAxis className="text-gray-600 dark:text-gray-400" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Recent Boards */}
            <Card variant="glass">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Recent Boards
                </h3>
                <Button variant="ghost" size="sm" onClick={() => navigate('/boards')}>
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              {recentBoards.length > 0 ? (
                <div className="space-y-3">
                  {recentBoards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => navigate(`/boards/${board.id}`)}
                      className="w-full text-left p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
                    >
                      <div className={`w-12 h-12 ${board.color.includes('violet') ? 'bg-gradient-to-br from-cyan-500 to-teal-500' : board.color} rounded-lg flex items-center justify-center shadow-lg`}>
                        <KanbanSquare className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-gray-100">{board.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tasks.filter((t) => t.boardId === board.id).length} tasks
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <KanbanSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No boards yet. Create one to get started!</p>
                </div>
              )}
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

