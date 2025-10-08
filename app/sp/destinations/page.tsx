"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
  rating: number;
  price: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function SPDestinations() {
  const { data: session } = useSession();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    highlights: "",
    rating: "",
    price: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/sp/destinations");
      if (response.ok) {
        const data = await response.json();
        setDestinations(data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingDestination
        ? `/api/sp/destinations/${editingDestination.id}`
        : "/api/sp/destinations";

      const method = editingDestination ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          highlights: formData.highlights
            .split(",")
            .map((h) => h.trim())
            .filter((h) => h),
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingDestination(null);
        setFormData({
          name: "",
          image: "",
          description: "",
          highlights: "",
          rating: "",
          price: "",
          status: "ACTIVE",
        });
        fetchDestinations();
      }
    } catch (error) {
      console.error("Error saving destination:", error);
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      image: destination.image,
      description: destination.description,
      highlights: destination.highlights.join(", "),
      rating: destination.rating.toString(),
      price: destination.price,
      status: destination.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this destination?")) {
      try {
        const response = await fetch(`/api/sp/destinations/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          fetchDestinations();
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
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
            <h1 className="text-3xl font-bold text-white">My Destinations</h1>
            <p className="mt-2 text-gray-300">
              Manage your destinations and their details
            </p>
          </div>
          <button
            onClick={() => {
              setEditingDestination(null);
              setFormData({
                name: "",
                image: "",
                description: "",
                highlights: "",
                rating: "",
                price: "",
                status: "ACTIVE",
              });
              setShowModal(true);
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Destination
          </button>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="bg-gray-900 rounded-lg shadow border border-gray-700 overflow-hidden"
          >
            <div className="relative">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    destination.status
                  )}`}
                >
                  {destination.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                {destination.name}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {destination.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white ml-1">{destination.rating}</span>
                </div>
                <span className="text-orange-600 font-semibold">
                  {destination.price}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(destination)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(destination.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {destinations.length === 0 && (
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
          <h3 className="text-lg font-medium text-white mb-2">
            No destinations yet
          </h3>
          <p className="text-gray-400 mb-4">
            Get started by adding your first destination
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Add Destination
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4 border border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">
              {editingDestination ? "Edit Destination" : "Add Destination"}
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Highlights (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) =>
                    setFormData({ ...formData, highlights: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Beautiful views, Adventure activities, Local culture"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
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
                    placeholder="₹5,000"
                    required
                  />
                </div>
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
                  {editingDestination ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
