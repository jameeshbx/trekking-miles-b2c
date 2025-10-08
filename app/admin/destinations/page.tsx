"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
  highlights: string[];
  rating: number;
  price: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    highlights: "",
    rating: "",
    price: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/destinations?${params}`);
      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching destinations:", data.error);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, [pagination.page, searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const highlightsArray = formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h);

      const destinationData = {
        ...formData,
        highlights: highlightsArray,
        rating: parseFloat(formData.rating),
      };

      const url = editingDestination
        ? `/api/admin/destinations/${editingDestination.id}`
        : "/api/admin/destinations";
      const method = editingDestination ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destinationData),
      });

      if (response.ok) {
        setShowForm(false);
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
      } else {
        const error = await response.json();
        console.error("Error saving destination:", error);
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
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      const response = await fetch(`/api/admin/destinations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDestinations();
      } else {
        const error = await response.json();
        console.error("Error deleting destination:", error);
      }
    } catch (error) {
      console.error("Error deleting destination:", error);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const response = await fetch(`/api/admin/destinations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchDestinations();
      } else {
        const error = await response.json();
        console.error("Error updating status:", error);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          Destinations Management
        </h1>
        <Button
          onClick={() => {
            setShowForm(true);
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
          }}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Destination
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6 bg-gray-900 border-gray-700">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Label htmlFor="search" className="text-gray-300">
                Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status" className="text-gray-300">
                Status
              </Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
              >
                <option value="">All</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid */}
      {loading ? (
        <div className="text-center py-8 text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {destinations.map((destination) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gray-900 border-gray-700">
                  <div className="relative">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          destination.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {destination.status}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-white">
                      {destination.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                      {destination.description}
                    </p>
                    <div className="flex items-center mb-2">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm text-white">
                        {destination.rating}
                      </span>
                    </div>
                    <p className="text-orange-600 font-bold mb-3">
                      {destination.price}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(destination)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusToggle(destination.id, destination.status)
                        }
                      >
                        {destination.status === "ACTIVE" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(destination.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-4 text-white">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={pagination.page === pagination.pages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">
                {editingDestination ? "Edit Destination" : "Add Destination"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="image" className="text-gray-300">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="highlights" className="text-gray-300">
                    Highlights (comma-separated)
                  </Label>
                  <Input
                    id="highlights"
                    value={formData.highlights}
                    onChange={(e) =>
                      setFormData({ ...formData, highlights: e.target.value })
                    }
                    placeholder="Beach Paradise, Colonial Heritage, Water Sports"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="rating" className="text-gray-300">
                      Rating
                    </Label>
                    <Input
                      id="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-gray-300">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-gray-300">
                      Status
                    </Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "ACTIVE" | "INACTIVE",
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    {editingDestination ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
