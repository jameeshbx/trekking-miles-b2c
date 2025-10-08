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

interface Event {
  id: string;
  name: string;
  image: string;
  date: string;
  duration: string;
  location: string;
  meetingPoint: string;
  price: string;
  description: string;
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
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
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    date: "",
    duration: "",
    location: "",
    meetingPoint: "",
    price: "",
    description: "",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`/api/admin/events?${params}`);
      const data = await response.json();

      if (response.ok) {
        setEvents(data.events);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching events:", data.error);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [pagination.page, searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEvent
        ? `/api/admin/events/${editingEvent.id}`
        : "/api/admin/events";
      const method = editingEvent ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowForm(false);
        setEditingEvent(null);
        setFormData({
          name: "",
          image: "",
          date: "",
          duration: "",
          location: "",
          meetingPoint: "",
          price: "",
          description: "",
          status: "ACTIVE",
        });
        fetchEvents();
      } else {
        const error = await response.json();
        console.error("Error saving event:", error);
      }
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      image: event.image,
      date: event.date,
      duration: event.duration,
      location: event.location,
      meetingPoint: event.meetingPoint,
      price: event.price,
      description: event.description,
      status: event.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchEvents();
      } else {
        const error = await response.json();
        console.error("Error deleting event:", error);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const response = await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchEvents();
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
        <h1 className="text-3xl font-bold text-white">Events Management</h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditingEvent(null);
            setFormData({
              name: "",
              image: "",
              date: "",
              duration: "",
              location: "",
              meetingPoint: "",
              price: "",
              description: "",
              status: "ACTIVE",
            });
          }}
          className="bg-orange-600 hover:bg-orange-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
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
                  placeholder="Search events..."
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

      {/* Events Grid */}
      {loading ? (
        <div className="text-center py-8 text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-gray-900 border-gray-700">
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          event.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-white">
                      {event.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="space-y-1 text-sm text-gray-400 mb-3">
                      <p>
                        <strong>Date:</strong> {event.date}
                      </p>
                      <p>
                        <strong>Duration:</strong> {event.duration}
                      </p>
                      <p>
                        <strong>Location:</strong> {event.location}
                      </p>
                      <p>
                        <strong>Meeting Point:</strong> {event.meetingPoint}
                      </p>
                    </div>
                    <p className="text-orange-600 font-bold mb-3">
                      {event.price}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(event)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleStatusToggle(event.id, event.status)
                        }
                      >
                        {event.status === "ACTIVE" ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(event.id)}
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
                {editingEvent ? "Edit Event" : "Add Event"}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-gray-300">
                      Date
                    </Label>
                    <Input
                      id="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-gray-300">
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location" className="text-gray-300">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="meetingPoint" className="text-gray-300">
                      Meeting Point
                    </Label>
                    <Input
                      id="meetingPoint"
                      value={formData.meetingPoint}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meetingPoint: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {editingEvent ? "Update" : "Create"}
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
