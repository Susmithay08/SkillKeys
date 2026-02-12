import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getTypingSessions, getTypingStats } from '../api';
import { useTheme } from '../contexts/ThemeContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [sessions, setSessions] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sessionsResponse, statsResponse] = await Promise.all([
                getTypingSessions(),
                getTypingStats(),
            ]);
            setSessions(sessionsResponse.data);
            setStats(statsResponse.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            setLoading(false);
        }
    };

    const chartData = {
        labels: sessions
            .slice()
            .reverse()
            .map((session) => new Date(session.date).toLocaleDateString()),
        datasets: [
            {
                label: 'WPM',
                data: sessions.slice().reverse().map((session) => session.wpm),
                borderColor: colors.primary,
                backgroundColor: `${colors.primary}30`,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: colors.text,
                },
            },
            title: {
                display: true,
                text: 'WPM Progress Over Time',
                color: colors.text,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: colors.text,
                },
                grid: {
                    color: colors.border,
                },
            },
            x: {
                ticks: {
                    color: colors.text,
                },
                grid: {
                    color: colors.border,
                },
            },
        },
    };

    if (loading) {
        return (
            <div
                className="flex justify-center items-center min-h-screen"
                style={{ backgroundColor: colors.bg }}
            >
                <div className="text-2xl" style={{ color: colors.text }}>Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4" style={{ backgroundColor: colors.bg }}>
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8" style={{ color: colors.text }}>
                    Your Progress Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <p className="mb-2" style={{ color: colors.textSecondary }}>Average WPM</p>
                        <p className="text-4xl font-bold" style={{ color: colors.primary }}>
                            {stats?.average_wpm || 0}
                        </p>
                    </div>
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <p className="mb-2" style={{ color: colors.textSecondary }}>Best WPM</p>
                        <p className="text-4xl font-bold" style={{ color: colors.success }}>
                            {stats?.best_wpm || 0}
                        </p>
                    </div>
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <p className="mb-2" style={{ color: colors.textSecondary }}>Current Streak</p>
                        <p className="text-4xl font-bold" style={{ color: colors.secondary }}>
                            {stats?.current_streak || 0} days
                        </p>
                    </div>
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <p className="mb-2" style={{ color: colors.textSecondary }}>Total Sessions</p>
                        <p className="text-4xl font-bold" style={{ color: colors.secondary }}>
                            {stats?.total_sessions || 0}
                        </p>
                    </div>
                </div>

                {sessions.length > 0 ? (
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl mb-8"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <Line data={chartData} options={chartOptions} />
                    </div>
                ) : (
                    <div
                        className="glass-card p-6 rounded-lg shadow-xl mb-8 text-center"
                        style={{ backgroundColor: colors.card, borderColor: colors.border }}
                    >
                        <p className="text-lg" style={{ color: colors.textSecondary }}>
                            No sessions yet. Start a typing test to see your progress!
                        </p>
                    </div>
                )}

                <div
                    className="glass-card rounded-lg shadow-xl overflow-hidden"
                    style={{ backgroundColor: colors.card, borderColor: colors.border }}
                >
                    <div className="px-6 py-4 border-b" style={{ borderColor: colors.border }}>
                        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
                            Recent Sessions
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y" style={{ borderColor: colors.border }}>
                            <thead style={{ backgroundColor: `${colors.primary}20` }}>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.text }}>
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.text }}>
                                        WPM
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.text }}>
                                        Accuracy
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: colors.text }}>
                                        Errors
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y" style={{ borderColor: colors.border }}>
                                {sessions.map((session) => (
                                    <tr key={session.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                                            {new Date(session.date).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                                            {session.wpm.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                                            {session.accuracy.toFixed(2)}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: colors.text }}>
                                            {session.errors}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;