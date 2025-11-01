import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  boardId: string;
  assigneeId?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  boardId: string;
  order: number;
  color: string;
}

export interface Board {
  id: string;
  title: string;
  workspaceId: string;
  description?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  memberIds: string[];
  createdAt: string;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;

  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Workspaces
  workspaces: Workspace[];
  currentWorkspaceId: string | null;
  setCurrentWorkspace: (id: string | null) => void;
  createWorkspace: (name: string, description?: string) => void;
  
  // Boards
  boards: Board[];
  currentBoardId: string | null;
  setCurrentBoard: (id: string | null) => void;
  createBoard: (title: string, workspaceId: string, description?: string) => void;
  updateBoard: (id: string, updates: Partial<Board>) => void;
  deleteBoard: (id: string) => void;

  // Columns
  columns: Column[];
  createColumn: (title: string, boardId: string, color?: string) => void;
  updateColumn: (id: string, updates: Partial<Column>) => void;
  deleteColumn: (id: string) => void;
  reorderColumns: (columnIds: string[]) => void;

  // Tasks
  tasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newColumnId: string) => void;

  // Analytics
  getTaskStats: () => {
    total: number;
    completed: number;
    inProgress: number;
    pending: number;
    overdue: number;
  };
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email, password) => {
        // Mock login - in real app, this would be an API call
        const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        const user = storedUsers.find((u: User) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      signup: async (name, email, password) => {
        const newUser: User = {
          id: generateId(),
          name,
          email,
          plan: 'free',
          createdAt: new Date().toISOString(),
        };
        const storedUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        storedUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(storedUsers));
        set({ user: newUser, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, currentWorkspaceId: null, currentBoardId: null });
      },

      // Theme
      theme: 'light',
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          return { theme: newTheme };
        });
      },

      // Workspaces
      workspaces: [],
      currentWorkspaceId: null,
      setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),
      createWorkspace: (name, description) => {
        const user = get().user;
        if (!user) return;
        const workspace: Workspace = {
          id: generateId(),
          name,
          description,
          ownerId: user.id,
          memberIds: [user.id],
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ workspaces: [...state.workspaces, workspace] }));
      },

      // Boards
      boards: [],
      currentBoardId: null,
      setCurrentBoard: (id) => set({ currentBoardId: id }),
      createBoard: (title, workspaceId, description) => {
        const colors = ['bg-cyan-500', 'bg-teal-500', 'bg-emerald-500', 'bg-sky-500', 'bg-blue-500'];
        const board: Board = {
          id: generateId(),
          title,
          workspaceId,
          description,
          color: colors[Math.floor(Math.random() * colors.length)],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ boards: [...state.boards, board] }));
        
        // Create default columns
        const defaultColumns = [
          { title: 'To Do', color: '#06b6d4' },
          { title: 'In Progress', color: '#14b8a6' },
          { title: 'Done', color: '#10b981' },
        ];
        defaultColumns.forEach((col, index) => {
          get().createColumn(col.title, board.id, col.color);
        });
      },
      updateBoard: (id, updates) => {
        set((state) => ({
          boards: state.boards.map((b) => (b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b)),
        }));
      },
      deleteBoard: (id) => {
        set((state) => ({
          boards: state.boards.filter((b) => b.id !== id),
          columns: state.columns.filter((c) => c.boardId !== id),
          tasks: state.tasks.filter((t) => t.boardId !== id),
        }));
      },

      // Columns
      columns: [],
      createColumn: (title, boardId, color) => {
        const column: Column = {
          id: generateId(),
          title,
          boardId,
          order: get().columns.filter((c) => c.boardId === boardId).length,
          color: color || '#06b6d4',
        };
        set((state) => ({ columns: [...state.columns, column] }));
      },
      updateColumn: (id, updates) => {
        set((state) => ({
          columns: state.columns.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }));
      },
      deleteColumn: (id) => {
        set((state) => ({
          columns: state.columns.filter((c) => c.id !== id),
          tasks: state.tasks.filter((t) => t.columnId !== id),
        }));
      },
      reorderColumns: (columnIds) => {
        set((state) => ({
          columns: state.columns.map((col) => ({
            ...col,
            order: columnIds.indexOf(col.id),
          })),
        }));
      },

      // Tasks
      tasks: [],
      createTask: (task) => {
        const newTask: Task = {
          ...task,
          id: generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
      },
      moveTask: (taskId, newColumnId) => {
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === taskId ? { ...t, columnId: newColumnId, updatedAt: new Date().toISOString() } : t
          ),
        }));
      },

      // Analytics
      getTaskStats: () => {
        const { tasks, columns } = get();
        const doneColumn = columns.find((c) => c.title.toLowerCase().includes('done'));
        const inProgressColumn = columns.find((c) => c.title.toLowerCase().includes('progress'));
        
        const doneTasks = doneColumn ? tasks.filter((t) => t.columnId === doneColumn.id).length : 0;
        const inProgressTasks = inProgressColumn ? tasks.filter((t) => t.columnId === inProgressColumn.id).length : 0;
        const totalTasks = tasks.length;
        const pendingTasks = totalTasks - doneTasks - inProgressTasks;
        const overdueTasks = tasks.filter(
          (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.columnId !== doneColumn?.id
        ).length;

        return {
          total: totalTasks,
          completed: doneTasks,
          inProgress: inProgressTasks,
          pending: pendingTasks,
          overdue: overdueTasks,
        };
      },
    }),
    {
      name: 'collabboard-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        workspaces: state.workspaces,
        boards: state.boards,
        columns: state.columns,
        tasks: state.tasks,
      }),
    }
  )
);

