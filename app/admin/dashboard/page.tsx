"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import UserManagement from "@/components/admin/UserManagement";
import UserAnalytics from "@/components/admin/UserAnalytics";

interface DashboardStats {
  users: {
    total: number;
    newThisMonth: number;
    active: number;
    verified: number;
    admins: number;
    serviceProviders: number;
    regularUsers: number;
    recent: Array<{
      id: string;
      name: string | null;
      email: string;
      role: string;
      status: string;
      createdAt: string;
    }>;
  };
  destinations: {
    total: number;
    active: number;
    newThisMonth: number;
    recent: Array<{
      id: string;
      name: string;
      rating: number;
      price: string;
      status: string;
      createdAt: string;
    }>;
  };
  events: {
    total: number;
    active: number;
    newThisMonth: number;
    recent: Array<{
      id: string;
      name: string;
      date: string;
      location: string;
      price: string;
      status: string;
      createdAt: string;
    }>;
  };
  treks: {
    total: number;
    active: number;
    newThisMonth: number;
    recent: Array<{
      id: string;
      name: string;
      date: string;
      distance: string;
      price: string;
      status: string;
      createdAt: string;
    }>;
  };
}

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/dashboard-stats");
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SUSPENDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Failed to load dashboard data</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-gray-300">
          Welcome back, {session?.user?.name || "Admin"}
        </p>
      </div>

      {/* Main Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Users Stats */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Total Users</p>
              <p className="text-2xl font-semibold text-white">
                {stats.users.total}
              </p>
              <p className="text-xs text-gray-400">
                +{stats.users.newThisMonth} this month
              </p>
            </div>
          </div>
        </div>

        {/* Destinations Stats */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Destinations</p>
              <p className="text-2xl font-semibold text-white">
                {stats.destinations.total}
              </p>
              <p className="text-xs text-gray-400">
                +{stats.destinations.newThisMonth} this month
              </p>
            </div>
          </div>
        </div>

        {/* Events Stats */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Events</p>
              <p className="text-2xl font-semibold text-white">
                {stats.events.total}
              </p>
              <p className="text-xs text-gray-400">
                +{stats.events.newThisMonth} this month
              </p>
            </div>
          </div>
        </div>

        {/* Treks Stats */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-300">Treks</p>
              <p className="text-2xl font-semibold text-white">
                {stats.treks.total}
              </p>
              <p className="text-xs text-gray-400">
                +{stats.treks.newThisMonth} this month
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Users Breakdown */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Users Breakdown
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Active</span>
              <span className="font-medium text-white">
                {stats.users.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Verified</span>
              <span className="font-medium text-white">
                {stats.users.verified}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Admins</span>
              <span className="font-medium text-white">
                {stats.users.admins}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Service Providers</span>
              <span className="font-medium text-white">
                {stats.users.serviceProviders}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Regular Users</span>
              <span className="font-medium text-white">
                {stats.users.regularUsers}
              </span>
            </div>
          </div>
        </div>

        {/* Destinations Breakdown */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            Destinations
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <span className="font-medium text-white">
                {stats.destinations.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Active</span>
              <span className="font-medium text-white">
                {stats.destinations.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">New This Month</span>
              <span className="font-medium text-white">
                {stats.destinations.newThisMonth}
              </span>
            </div>
          </div>
        </div>

        {/* Events Breakdown */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Events</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <span className="font-medium text-white">
                {stats.events.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Active</span>
              <span className="font-medium text-white">
                {stats.events.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">New This Month</span>
              <span className="font-medium text-white">
                {stats.events.newThisMonth}
              </span>
            </div>
          </div>
        </div>

        {/* Treks Breakdown */}
        <div className="bg-gray-900 rounded-lg shadow p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Treks</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Total</span>
              <span className="font-medium text-white">
                {stats.treks.total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">Active</span>
              <span className="font-medium text-white">
                {stats.treks.active}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-300">New This Month</span>
              <span className="font-medium text-white">
                {stats.treks.newThisMonth}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {/* Recent Users */}
        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Users</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.users.recent.slice(0, 5).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Destinations */}
        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">
              Recent Destinations
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.destinations.recent.slice(0, 5).map((destination) => (
                <div
                  key={destination.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {destination.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      ⭐ {destination.rating} • {destination.price}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      destination.status
                    )}`}
                  >
                    {destination.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Events</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.events.recent.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {event.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {event.location} • {event.price}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      event.status
                    )}`}
                  >
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Treks */}
        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Treks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.treks.recent.slice(0, 5).map((trek) => (
                <div
                  key={trek.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {trek.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {trek.distance} • {trek.price}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      trek.status
                    )}`}
                  >
                    {trek.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics and Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">
              User Management
            </h2>
          </div>
          <div className="p-6">
            <UserManagement />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg shadow border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/users"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-orange-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    Manage Users
                  </p>
                </div>
              </a>
              <a
                href="/admin/destinations"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-orange-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    Manage Destinations
                  </p>
                </div>
              </a>
              <a
                href="/admin/events"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-orange-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    Manage Events
                  </p>
                </div>
              </a>
              <a
                href="/admin/treks"
                className="block p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-orange-600 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <p className="text-sm font-medium text-gray-900">
                    Manage Treks
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
