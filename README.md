# CollabBoard - Productivity & Collaboration SaaS Web App

A modern, full-featured productivity and collaboration web application built with React, TypeScript, Tailwind CSS, and React Router.

## Features

- 🎨 **Modern UI/UX**: Beautiful gradients, glassmorphism effects, and smooth animations
- 📊 **Dashboard**: Analytics with charts using Recharts
- 📋 **Kanban Boards**: Drag-and-drop task management with @dnd-kit
- 👥 **Team Collaboration**: Workspace and team management
- 🔐 **Authentication**: Login/Sign-up with Google OAuth UI (mocked)
- 📈 **Analytics**: Task completion stats, productivity metrics
- ⚙️ **Settings**: Profile management and subscription plans
- 🌓 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Fully responsive design for all devices

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **React Router v7** - Navigation
- **Tailwind CSS v4** - Styling
- **Zustand** - State management
- **Framer Motion** - Animations
- **Recharts** - Charts and analytics
- **@dnd-kit** - Drag and drop
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
my-app/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Loader.tsx
│   │   └── Tooltip.tsx
│   ├── routes/              # Route pages
│   │   ├── index.tsx        # Landing page
│   │   ├── login.tsx        # Auth page
│   │   ├── dashboard.tsx    # Dashboard
│   │   ├── boards.tsx       # Boards list
│   │   ├── boards.$boardId.tsx  # Kanban board
│   │   ├── settings.tsx     # Settings
│   │   ├── admin.tsx        # Admin dashboard
│   │   └── team.tsx         # Team management
│   ├── store/               # Zustand store
│   │   └── useStore.ts
│   ├── lib/                 # Utilities
│   │   └── utils.ts
│   ├── root.tsx             # Root layout
│   ├── routes.ts            # Route configuration
│   └── app.css              # Global styles
├── public/                  # Static assets
└── package.json
```

## Usage

### Authentication

- Visit the landing page at `/`
- Click "Get Started Free" to go to the login page
- Sign up with email/password or use Google OAuth (mocked)
- All user data is stored in localStorage for demo purposes

### Creating Workspaces

1. After logging in, go to the Dashboard
2. Use the sidebar to create a new workspace
3. Select a workspace to work within it

### Creating Boards

1. Navigate to "Boards" from the sidebar
2. Click "New Board" button
3. Enter a board name
4. Default columns (To Do, In Progress, Done) will be created automatically

### Managing Tasks

1. Open a board from the boards list
2. Click "Add Task" on any column
3. Fill in task details (title, description, priority)
4. Drag and drop tasks between columns
5. Click on a task to edit or delete it

### Analytics

- View task statistics on the Dashboard
- See charts for task distribution, weekly activity, and priority breakdown

### Settings

- Update your profile information
- Manage subscription plans (Free, Pro, Enterprise)
- Configure notification preferences
- Update security settings

## Features in Detail

### Kanban Board

- Drag and drop tasks between columns
- Create, edit, and delete tasks
- Add custom columns with colors
- Real-time task management (simulated with state)

### Dashboard

- Task statistics (total, completed, in progress, overdue)
- Pie chart for task distribution
- Line chart for weekly activity
- Bar chart for priority breakdown
- Recent boards overview

### Dark Mode

- Toggle dark/light theme from the navbar
- Theme preference is saved in localStorage
- Smooth transitions between themes

## Mock Data

The app uses localStorage to persist:
- User authentication state
- Workspaces
- Boards
- Columns
- Tasks
- Theme preference

All data is client-side only for demo purposes. In a production app, this would connect to a backend API.

## License

MIT

## Credits

Built with modern React patterns and best practices. Designed for production-level SaaS applications.
