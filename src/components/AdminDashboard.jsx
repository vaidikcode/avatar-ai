import React, { useState, useEffect } from 'react';
import {
    Map,
    AlertTriangle,
    Heart,
    Settings,
    Bell,
    Users,
    Activity,
    TrendingDown,
    Clock,
    Shield,
    ChevronRight,
    Menu,
    X,
    Circle,
    MapPin,
} from 'lucide-react';

const AdminDashboard = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('map');

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Navigation items
    const navItems = [
        { id: 'map', icon: Map, label: 'Live Map' },
        { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
        { id: 'community', icon: Heart, label: 'Community Health' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    // Mock intervention data
    const interventions = [
        {
            id: 1,
            ward: 'Ward 7',
            type: 'Voice Activity Drop',
            detail: '40% drop in voice activity (Mrs. Sharma)',
            status: 'NGO Notified',
            severity: 'critical',
            time: '2 min ago',
        },
        {
            id: 2,
            ward: 'Ward 12',
            type: 'Missed Check-in',
            detail: 'No response for 48 hours (Mr. Patel)',
            status: 'Family Contacted',
            severity: 'critical',
            time: '15 min ago',
        },
        {
            id: 3,
            ward: 'Ward 3',
            type: 'Isolation Score Rising',
            detail: 'Weekly score increased by 25% (Mrs. Gupta)',
            status: 'Volunteer Assigned',
            severity: 'warning',
            time: '32 min ago',
        },
        {
            id: 4,
            ward: 'Ward 9',
            type: 'Sentiment Shift',
            detail: 'Negative sentiment detected (Mr. Singh)',
            status: 'Monitoring',
            severity: 'warning',
            time: '1 hour ago',
        },
        {
            id: 5,
            ward: 'Ward 5',
            type: 'Routine Check',
            detail: 'Weekly wellness call completed (Mrs. Das)',
            status: 'Resolved',
            severity: 'normal',
            time: '2 hours ago',
        },
        {
            id: 6,
            ward: 'Ward 2',
            type: 'New Registration',
            detail: 'Elder onboarded successfully (Mr. Kumar)',
            status: 'Active',
            severity: 'normal',
            time: '3 hours ago',
        },
    ];

    // Mock heatmap data points
    const heatmapPoints = [
        { x: 15, y: 25, status: 'critical', label: 'Ward 7' },
        { x: 35, y: 40, status: 'warning', label: 'Ward 12' },
        { x: 55, y: 20, status: 'normal', label: 'Ward 3' },
        { x: 75, y: 55, status: 'normal', label: 'Ward 5' },
        { x: 25, y: 65, status: 'warning', label: 'Ward 9' },
        { x: 60, y: 70, status: 'normal', label: 'Ward 2' },
        { x: 85, y: 30, status: 'normal', label: 'Ward 8' },
        { x: 45, y: 85, status: 'critical', label: 'Ward 11' },
        { x: 20, y: 45, status: 'normal', label: 'Ward 4' },
        { x: 70, y: 40, status: 'warning', label: 'Ward 6' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'critical':
                return 'bg-red-500';
            case 'warning':
                return 'bg-amber-500';
            case 'normal':
                return 'bg-emerald-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getSeverityBadge = (severity) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'warning':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'normal':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-slate-800 border-r border-slate-700
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg">CareChain</h1>
                                <p className="text-xs text-slate-400">Admin Portal</p>
                            </div>
                        </div>
                        <button
                            className="lg:hidden text-slate-400 hover:text-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveNav(item.id)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200
                ${activeNav === item.id
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                                }
              `}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                            {item.id === 'alerts' && (
                                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    3
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-700/50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-sm font-bold">AD</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-sm">Admin User</p>
                            <p className="text-xs text-slate-400">Super Admin</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 px-4 lg:px-8 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                className="lg:hidden text-slate-400 hover:text-white"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    National Social Immune System
                                </h1>
                                <p className="text-sm text-slate-400 hidden sm:block">Real-time Elder Wellness Monitoring</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 lg:gap-6">
                            {/* System Status Badge */}
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-emerald-400 font-medium text-sm">System Status: Monitoring</span>
                            </div>

                            {/* Clock */}
                            <div className="text-right hidden sm:block">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-mono text-lg font-bold">{formatTime(currentTime)}</span>
                                </div>
                                <p className="text-xs text-slate-500">{formatDate(currentTime)}</p>
                            </div>

                            {/* Notification Bell */}
                            <button className="relative p-2 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-colors">
                                <Bell className="w-5 h-5 text-slate-400" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
                                    3
                                </span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 h-full">
                        {/* Left Section - Map & Stats */}
                        <div className="xl:col-span-3 space-y-6">
                            {/* Heatmap Widget */}
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                            <MapPin className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-lg">Community Isolation Heatmap</h2>
                                            <p className="text-sm text-slate-400">Real-time ward status visualization</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Circle className="w-3 h-3 text-red-500 fill-red-500" />
                                            <span className="text-slate-400">Critical</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Circle className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            <span className="text-slate-400">Warning</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                                            <span className="text-slate-400">Normal</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Placeholder */}
                                <div className="relative h-64 sm:h-80 lg:h-96 bg-slate-900/50">
                                    {/* Grid pattern overlay */}
                                    <div
                                        className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                                            backgroundSize: '40px 40px',
                                        }}
                                    />

                                    {/* Heatmap Points */}
                                    {heatmapPoints.map((point, index) => (
                                        <div
                                            key={index}
                                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                                            style={{ left: `${point.x}%`, top: `${point.y}%` }}
                                        >
                                            {/* Glow effect */}
                                            <div
                                                className={`
                          absolute inset-0 rounded-full blur-xl opacity-50
                          ${getStatusColor(point.status)}
                        `}
                                                style={{ transform: 'scale(3)' }}
                                            />
                                            {/* Main dot */}
                                            <div
                                                className={`
                          relative w-6 h-6 rounded-full ${getStatusColor(point.status)}
                          flex items-center justify-center
                          shadow-lg transition-transform duration-200
                          group-hover:scale-150
                          ${point.status === 'critical' ? 'animate-pulse' : ''}
                        `}
                                            >
                                                <div className="w-2 h-2 rounded-full bg-white/80" />
                                            </div>
                                            {/* Tooltip */}
                                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-700 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                {point.label}
                                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Map label */}
                                    <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-slate-800/80 rounded-lg text-sm text-slate-400">
                                        India • National View
                                    </div>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Total Elders Monitored */}
                                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                                            <Users className="w-7 h-7 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-medium">Total Elders Monitored</p>
                                            <p className="text-3xl font-bold text-white">12,847</p>
                                            <p className="text-sm text-emerald-400 flex items-center gap-1">
                                                <TrendingDown className="w-3 h-3 rotate-180" />
                                                +142 this week
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Critical Alerts */}
                                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                                            <AlertTriangle className="w-7 h-7 text-red-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-medium">Critical Alerts (Today)</p>
                                            <p className="text-3xl font-bold text-white">23</p>
                                            <p className="text-sm text-red-400 flex items-center gap-1">
                                                <Activity className="w-3 h-3" />
                                                8 pending action
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Avg Isolation Score */}
                                <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                                            <Heart className="w-7 h-7 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-slate-400 font-medium">Avg. Isolation Score</p>
                                            <p className="text-3xl font-bold text-white">3.2</p>
                                            <p className="text-sm text-amber-400 flex items-center gap-1">
                                                <TrendingDown className="w-3 h-3" />
                                                -0.4 from last week
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Live Feed */}
                        <div className="xl:col-span-2">
                            <div className="bg-slate-800 rounded-2xl border border-slate-700 h-full flex flex-col">
                                <div className="px-6 py-4 border-b border-slate-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                            <Activity className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-lg">Incoming Interventions</h2>
                                            <p className="text-sm text-slate-400">Live activity feed</p>
                                        </div>
                                    </div>
                                    <span className="flex items-center gap-2 text-sm text-slate-400">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Live
                                    </span>
                                </div>

                                {/* Scrollable List */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[600px]">
                                    {interventions.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`
                        p-4 rounded-xl border transition-all duration-200 cursor-pointer
                        hover:bg-slate-700/50
                        ${item.severity === 'critical'
                                                    ? 'bg-red-500/5 border-red-500/30'
                                                    : item.severity === 'warning'
                                                        ? 'bg-amber-500/5 border-amber-500/30'
                                                        : 'bg-slate-700/30 border-slate-600'
                                                }
                      `}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="font-bold text-white">{item.ward}</span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${getSeverityBadge(
                                                                item.severity
                                                            )}`}
                                                        >
                                                            {item.severity === 'critical'
                                                                ? 'Critical'
                                                                : item.severity === 'warning'
                                                                    ? 'Warning'
                                                                    : 'Normal'}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-slate-300 font-medium mb-1">{item.type}</p>
                                                    <p className="text-sm text-slate-400">{item.detail}</p>
                                                    <div className="flex items-center gap-4 mt-3">
                                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {item.time}
                                                        </span>
                                                        <span className="text-xs text-cyan-400 font-medium">
                                                            Status: {item.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* View All Button */}
                                <div className="p-4 border-t border-slate-700">
                                    <button className="w-full py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-medium transition-colors flex items-center justify-center gap-2">
                                        View All Interventions
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
