"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Provider = {
  id: string;
  name: string | null;
  email: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  createdAt: string;
};

export default function AdminServiceProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    fetchProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (status) params.set("status", status);
      const res = await fetch(
        `/api/admin/service-providers?${params.toString()}`
      );
      if (res.ok) {
        const data = await res.json();
        setProviders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => providers, [providers]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Service Providers</h1>
          <p className="text-gray-300 mt-1">
            Search and filter all service providers
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchProviders}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchProviders()}
              placeholder="Name or email"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={fetchProviders}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-800/60">
                  <td className="px-4 py-3 text-white">{p.name || "—"}</td>
                  <td className="px-4 py-3 text-gray-300">{p.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : p.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/service-providers/${p.id}`}
                      className="text-orange-500 hover:text-orange-400"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-10 text-center text-gray-400"
                  >
                    No service providers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
