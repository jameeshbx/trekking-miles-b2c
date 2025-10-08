"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface Trek {
  id: string;
  name: string;
  image: string;
  date: string;
  duration: string;
  distance: string;
  price: string;
  meetingPoint: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function SPTreks() {
  const { data: session } = useSession();
  const [treks, setTreks] = useState<Trek[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTrek, setEditingTrek] = useState<Trek | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    date: "",
    duration: "",
    distance: "",
    price: "",
    meetingPoint: "",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchTreks();
  }, []);

  const fetchTreks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sp/treks");
      if (response.ok) {
        const data = await response.json();
        setTreks(data);
      }
    } catch (error) {
      console.error("Error fetching treks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTrek
        ? `/api/sp/treks/${editingTrek.id}`
        : "/api/sp/treks";

      const method = editingTrek ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingTrek(null);
        setFormData({
          name: "",
          image: "",
          date: "",
          duration: "",
          distance: "",
          price: "",
          meetingPoint: "",
          description: "",
          status: "ACTIVE",
        });
        fetchTreks();
      }
    } catch (error) {
      console.error("Error saving trek:", error);
    }
  };

  const handleEdit = (trek: Trek) => {
    setEditingTrek(trek);
    setFormData({
      name: trek.name,
      image: trek.image,
      date: trek.date,
      duration: trek.duration,
      distance: trek.distance,
      price: trek.price,
      meetingPoint: trek.meetingPoint,
      description: trek.description,
      status: trek.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this trek?")) {
      try {
        const response = await fetch(`/api/sp/treks/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchTreks();
        }
      } catch (error) {
        console.error("Error deleting trek:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "INACTIVE":
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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">My Treks</h1>
            <p className="mt-2 text-gray-300">
              Manage your treks and their details
            </p>
          </div>
          <button
            onClick={() => {
              setEditingTrek(null);
              setFormData({
                name: "",
                image: "",
                date: "",
                duration: "",
                distance: "",
                price: "",
                meetingPoint: "",
                description: "",
                status: "ACTIVE",
              });
              setShowModal(true);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Trek
          </button>
        </div>
      </div>

      {/* Treks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {treks.map((trek) => (
          <div
            key={trek.id}
            className="bg-gray-900 rounded-lg shadow border border-gray-700 overflow-hidden"
          >
            <div className="relative">
              <img
                src={trek.image}
                alt={trek.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    trek.status
                  )}`}
                >
                  {trek.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {trek.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {trek.description}
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  {trek.date}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {trek.duration}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  {trek.distance}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <svg
                    className="w-4 h-4 mr-2"
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
                  {trek.meetingPoint}
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-orange-600 font-semibold">
                  {trek.price}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(trek)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(trek.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {treks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
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
          <h3 className="text-lg font-medium text-white mb-2">No treks yet</h3>
          <p className="text-gray-400 mb-4">
            Get started by adding your first trek
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Trek
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingTrek ? "Edit Trek" : "Add Trek"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Dec 15, 2024"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="2 days"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Distance
                </label>
                <input
                  type="text"
                  value={formData.distance}
                  onChange={(e) =>
                    setFormData({ ...formData, distance: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="12 km"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meeting Point
                </label>
                <input
                  type="text"
                  value={formData.meetingPoint}
                  onChange={(e) =>
                    setFormData({ ...formData, meetingPoint: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="₹2,500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {editingTrek ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
