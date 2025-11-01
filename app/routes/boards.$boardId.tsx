import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  Trash2,
  Edit2,
  Calendar,
  X,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Task } from '../store/useStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { Tooltip } from '../components/Tooltip';
import { formatDate } from '../lib/utils';

interface SortableColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
  onAddTask: () => void;
  onDeleteColumn: () => void;
}

function SortableColumn({ id, title, color, tasks, onAddTask, onDeleteColumn }: SortableColumnProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const columnTasks = tasks.filter((t: Task) => t.columnId === id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex-shrink-0 w-full sm:w-80 bg-gray-100 dark:bg-gray-800 rounded-xl p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">({columnTasks.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip content="Add Task">
            <Button variant="ghost" size="sm" onClick={onAddTask}>
              <Plus className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content="Delete Column">
            <Button variant="ghost" size="sm" onClick={onDeleteColumn}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
      <SortableContext items={columnTasks.map((t: Task) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3 min-h-[200px]">
          {columnTasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
}

function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
  });

  const { updateTask, deleteTask } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors: Record<'high' | 'medium' | 'low', string> = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-800 cursor-grab active:cursor-grabbing"
    >
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 flex-1">{task.title}</h4>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            {task.priority && (
              <div
                className={`w-2 h-2 rounded-full ${priorityColors[task.priority] || 'bg-gray-400'}`}
              />
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export function meta() {
  return [{ title: 'Board | CollabBoard' }];
}

export default function BoardPage() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const {
    boards,
    columns,
    tasks,
    updateTask,
    moveTask,
    createTask,
    createColumn,
    deleteColumn,
    reorderColumns,
  } = useStore();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [newColumnColor, setNewColumnColor] = useState('#06b6d4');

  const board = boards.find((b) => b.id === boardId);
  const boardColumns = columns
    .filter((c) => c.boardId === boardId)
    .sort((a, b) => a.order - b.order);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!board) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Card variant="glass">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Board not found</p>
          <Button onClick={() => navigate('/boards')}>Go Back</Button>
        </Card>
      </div>
    );
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // If dragging over a column
    if (boardColumns.some((col) => col.id === overId)) {
      const activeTask = tasks.find((t) => t.id === activeId);
      if (activeTask && activeTask.columnId !== overId) {
        moveTask(activeId, overId);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Handle column reordering
    const activeColumn = boardColumns.find((c) => c.id === activeId);
    const overColumn = boardColumns.find((c) => c.id === overId);

    if (activeColumn && overColumn) {
      const oldIndex = activeColumn.order;
      const newIndex = overColumn.order;

      const newColumns = [...boardColumns];
      newColumns.splice(oldIndex, 1);
      newColumns.splice(newIndex, 0, activeColumn);

      reorderColumns(newColumns.map((c) => c.id));
      return;
    }

    // Handle task movement
    const activeTask = tasks.find((t) => t.id === activeId);
    if (activeTask && activeTask.columnId !== overId) {
      moveTask(activeId, overId);
    }
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim() && selectedColumnId) {
      createTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription,
        columnId: selectedColumnId,
        boardId: board.id,
        priority: newTaskPriority,
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setSelectedColumnId(null);
      setIsTaskModalOpen(false);
    }
  };

  const handleCreateColumn = () => {
    if (newColumnTitle.trim()) {
      createColumn(newColumnTitle.trim(), board.id, newColumnColor);
      setNewColumnTitle('');
      setIsColumnModalOpen(false);
    }
  };

  const activeTask = activeId ? tasks.find((t) => t.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950">
      <Navbar />
      <Sidebar />
      <main className="ml-0 lg:ml-[280px] pt-16 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {board.title}
              </h1>
              {board.description && (
                <p className="text-gray-600 dark:text-gray-400">{board.description}</p>
              )}
            </div>
            <Button onClick={() => setIsColumnModalOpen(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Column
            </Button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <div className="flex gap-4 overflow-x-auto pb-4">
              <SortableContext items={boardColumns.map((c) => c.id)} strategy={verticalListSortingStrategy}>
                {boardColumns.map((column) => (
                  <SortableColumn
                    key={column.id}
                    id={column.id}
                    title={column.title}
                    color={column.color}
                    tasks={tasks}
                    onAddTask={() => {
                      setSelectedColumnId(column.id);
                      setIsTaskModalOpen(true);
                    }}
                    onDeleteColumn={() => deleteColumn(column.id)}
                  />
                ))}
              </SortableContext>
            </div>
            <DragOverlay>
              {activeTask ? (
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-xl border border-gray-200 dark:border-gray-800 w-64">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{activeTask.title}</h4>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </motion.div>
      </main>

      {/* Task Modal */}
      <Modal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        title="Create New Task"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setNewTaskPriority(priority)}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-all ${
                    newTaskPriority === priority
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                      : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-cyan-300'
                  }`}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsTaskModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTask} disabled={!newTaskTitle.trim()}>
              Create Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* Column Modal */}
      <Modal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        title="Create New Column"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="Column Title"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
            placeholder="Enter column title"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Color
            </label>
            <input
              type="color"
              value={newColumnColor}
              onChange={(e) => setNewColumnColor(e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsColumnModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateColumn} disabled={!newColumnTitle.trim()}>
              Create Column
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

