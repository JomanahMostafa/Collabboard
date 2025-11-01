import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Bell, Lock, Trash2, Save } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['Up to 3 boards', '5 team members', 'Basic analytics'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: ['Unlimited boards', 'Unlimited team members', 'Advanced analytics', 'Priority support'],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Everything in Pro', 'Dedicated support', 'Custom onboarding', 'SSO & advanced security'],
  },
];

export function meta() {
  return [{ title: 'Settings | CollabBoard' }];
}

export default function Settings() {
  const { user, setUser, isAuthenticated } = useStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'notifications' | 'security'>('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleUpdateProfile = (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setUser({ ...user, name, email });
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 500);
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Password changed successfully!');
    }, 500);
  };

  const handleUpgradePlan = (planId: 'free' | 'pro' | 'enterprise') => {
    setUser({ ...user, plan: planId });
    alert(`Plan updated to ${planId}!`);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
  ];

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Settings</h1>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <Card variant="glass" className="p-2">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/30'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-950/20 hover:text-cyan-600 dark:hover:text-cyan-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </Card>
            </div>

            {/* Content */}
            <div className="flex-1">
              {activeTab === 'profile' && (
                <Card variant="glass">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Profile Settings
                  </h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="flex items-center gap-6 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <span className="text-white font-bold text-2xl">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <Button variant="secondary" type="button">
                        Change Avatar
                      </Button>
                    </div>
                    <Input
                      label="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="flex gap-3">
                      <Button type="submit" isLoading={isSaving}>
                        <Save className="w-5 h-5 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </Card>
              )}

              {activeTab === 'subscription' && (
                <Card variant="glass">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Subscription & Billing
                  </h2>
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Current Plan</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 rounded-lg font-medium">
                      {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        variant={plan.popular ? 'gradient' : 'default'}
                        className={`relative ${user.plan === plan.id ? 'ring-2 ring-cyan-500 shadow-xl' : ''}`}
                      >
                        {plan.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                            Popular
                          </span>
                        )}
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            {plan.name}
                          </h3>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                              {plan.price}
                            </span>
                            {plan.period && (
                              <span className="text-gray-600 dark:text-gray-400">{plan.period}</span>
                            )}
                          </div>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((feature) => (
                            <li key={feature} className="text-sm text-gray-700 dark:text-gray-300">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                        <Button
                          variant={user.plan === plan.id ? 'secondary' : 'primary'}
                          className="w-full"
                          onClick={() => handleUpgradePlan(plan.id as any)}
                          disabled={user.plan === plan.id}
                        >
                          {user.plan === plan.id ? 'Current Plan' : 'Upgrade'}
                        </Button>
                      </Card>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Payment Method
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <CreditCard className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              •••• •••• •••• 4242
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'notifications' && (
                <Card variant="glass">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Email notifications', description: 'Receive email updates about your tasks' },
                      { label: 'Push notifications', description: 'Get notified about important updates' },
                      { label: 'Weekly digest', description: 'Receive a weekly summary of your activity' },
                      { label: 'Team updates', description: 'Get notified when team members make changes' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-teal-500"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'security' && (
                <Card variant="glass">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                    Security Settings
                  </h2>
                  <form onSubmit={handleChangePassword} className="space-y-6">
                    <Input
                      label="Current Password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <div className="flex gap-3">
                      <Button type="submit" isLoading={isSaving}>
                        <Lock className="w-5 h-5 mr-2" />
                        Update Password
                      </Button>
                    </div>
                  </form>

                  <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
                      Danger Zone
                    </h3>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button variant="danger">
                        <Trash2 className="w-5 h-5 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

