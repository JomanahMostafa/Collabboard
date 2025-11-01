import { motion } from 'framer-motion';
import { Users, UserPlus, Mail } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

// Mock team members
const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Product Manager',
    email: 'john@example.com',
    avatar: null,
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    role: 'Frontend Developer',
    email: 'jane@example.com',
    avatar: null,
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Backend Developer',
    email: 'mike@example.com',
    avatar: null,
    status: 'away',
  },
];

export function meta() {
  return [{ title: 'Team | CollabBoard' }];
}

export default function Team() {
  const { isAuthenticated } = useStore();

  if (!isAuthenticated) {
    return null;
  }

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Team</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your team members</p>
            </div>
            <Button>
              <UserPlus className="w-5 h-5 mr-2" />
              Invite Member
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} variant="glass">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                      <span className="text-white font-bold text-lg">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
                    </div>
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

