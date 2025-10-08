"use client";

interface MonthlyStats {
  month: string;
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
}

interface UserAnalyticsProps {
  monthlyStats: MonthlyStats[];
}

export default function UserAnalytics({ monthlyStats }: UserAnalyticsProps) {
  if (!monthlyStats || monthlyStats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monthlyStats.slice(0, 3).map((stat, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-600">{stat.month}</h3>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Total:</span>
                <span className="text-sm font-medium">{stat.totalUsers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">New:</span>
                <span className="text-sm font-medium text-green-600">
                  {stat.newUsers}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Active:</span>
                <span className="text-sm font-medium text-blue-600">
                  {stat.activeUsers}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
