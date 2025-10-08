"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Role, UserStatus } from "@prisma/client";

interface User {
  id: string;
  name: string | null;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface UserManagementState {
  users: User[];
  pagination: Pagination;
  loading: boolean;
  search: string;
  roleFilter: string;
  statusFilter: string;
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedUser: User | null;
  error: string | null;
  success: string | null;
}

export default function UserManagementPage() {
  const { data: session } = useSession();
  const [state, setState] = useState<UserManagementState>({
    users: [],
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    loading: true,
    search: "",
    roleFilter: "",
    statusFilter: "",
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
    selectedUser: null,
    error: null,
    success: null,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "USER" as Role,
    status: "PENDING" as UserStatus,
    sendInvitation: false,
  });

  useEffect(() => {
    fetchUsers();
  }, [
    state.pagination.page,
    state.search,
    state.roleFilter,
    state.statusFilter,
  ]);

  const fetchUsers = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const params = new URLSearchParams({
        page: state.pagination.page.toString(),
        limit: state.pagination.limit.toString(),
        ...(state.search && { search: state.search }),
        ...(state.roleFilter && { role: state.roleFilter }),
        ...(state.statusFilter && { status: state.statusFilter }),
      });

      const response = await fetch(`/api/admin/users?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch users");
      }

      setState((prev) => ({
        ...prev,
        users: data.users,
        pagination: data.pagination,
        loading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch users",
      }));
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setState((prev) => ({ ...prev, error: null, success: null }));

      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create user");
      }

      setState((prev) => ({
        ...prev,
        showCreateModal: false,
        success: data.message,
        formData: {
          name: "",
          email: "",
          role: "USER",
          status: "PENDING",
          sendInvitation: false,
        },
      }));

      fetchUsers();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to create user",
      }));
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.selectedUser) return;

    try {
      setState((prev) => ({ ...prev, error: null, success: null }));

      const response = await fetch(
        `/api/admin/users/${state.selectedUser.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update user");
      }

      setState((prev) => ({
        ...prev,
        showEditModal: false,
        selectedUser: null,
        success: "User updated successfully",
        formData: {
          name: "",
          email: "",
          role: "USER",
          status: "PENDING",
          sendInvitation: false,
        },
      }));

      fetchUsers();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to update user",
      }));
    }
  };

  const handleDeleteUser = async () => {
    if (!state.selectedUser) return;

    try {
      setState((prev) => ({ ...prev, error: null, success: null }));

      const response = await fetch(
        `/api/admin/users/${state.selectedUser.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete user");
      }

      setState((prev) => ({
        ...prev,
        showDeleteModal: false,
        selectedUser: null,
        success: "User deleted successfully",
      }));

      fetchUsers();
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to delete user",
      }));
    }
  };

  const openEditModal = (user: User) => {
    setState((prev) => ({
      ...prev,
      selectedUser: user,
      showEditModal: true,
      formData: {
        name: user.name || "",
        email: user.email,
        role: user.role,
        status: user.status,
        sendInvitation: false,
      },
    }));
  };

  const openDeleteModal = (user: User) => {
    setState((prev) => ({
      ...prev,
      selectedUser: user,
      showDeleteModal: true,
    }));
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SUSPENDED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-700 text-gray-800";
    }
  };

  const getRoleColor = (role: Role) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "SERVICEPROVIDER":
        return "bg-blue-100 text-blue-800";
      case "USER":
        return "bg-gray-700 text-gray-800";
      default:
        return "bg-gray-700 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">User Management</h1>
          <p className="mt-2 text-gray-300">
            Manage users, roles, and permissions
          </p>
        </div>
        <button
          onClick={() =>
            setState((prev) => ({ ...prev, showCreateModal: true }))
          }
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Add User
        </button>
      </div>

      {/* Alerts */}
      {state.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.error}
        </div>
      )}
      {state.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {state.success}
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-900 p-6 rounded-lg shadow border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={state.search}
              onChange={(e) =>
                setState((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              value={state.roleFilter}
              onChange={(e) =>
                setState((prev) => ({ ...prev, roleFilter: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="USER">User</option>
              <option value="SERVICEPROVIDER">Service Provider</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={state.statusFilter}
              onChange={(e) =>
                setState((prev) => ({ ...prev, statusFilter: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  search: "",
                  roleFilter: "",
                  statusFilter: "",
                  pagination: { ...prev.pagination, page: 1 },
                }))
              }
              className="w-full bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-900 rounded-lg shadow overflow-hidden border border-gray-700">
        {state.loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {state.users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-800">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {user.name?.charAt(0) ||
                                  user.email.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {user.name || "No name"}
                            </div>
                            <div className="text-sm text-gray-400">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-orange-400 hover:text-orange-300"
                        >
                          Edit
                        </button>
                        {session?.user?.id !== user.id && (
                          <button
                            onClick={() => openDeleteModal(user)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {state.pagination.pages > 1 && (
              <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-t border-gray-700 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        pagination: {
                          ...prev.pagination,
                          page: Math.max(1, prev.pagination.page - 1),
                        },
                      }))
                    }
                    disabled={state.pagination.page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        pagination: {
                          ...prev.pagination,
                          page: Math.min(
                            prev.pagination.pages,
                            prev.pagination.page + 1
                          ),
                        },
                      }))
                    }
                    disabled={state.pagination.page === state.pagination.pages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-300">
                      Showing{" "}
                      <span className="font-medium text-white">
                        {(state.pagination.page - 1) * state.pagination.limit +
                          1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium text-white">
                        {Math.min(
                          state.pagination.page * state.pagination.limit,
                          state.pagination.total
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-white">
                        {state.pagination.total}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from(
                        { length: state.pagination.pages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <button
                          key={page}
                          onClick={() =>
                            setState((prev) => ({
                              ...prev,
                              pagination: { ...prev.pagination, page },
                            }))
                          }
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === state.pagination.page
                              ? "z-10 bg-orange-600 border-orange-500 text-white"
                              : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create User Modal */}
      {state.showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-gray-900">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-white mb-4">
                Create New User
              </h3>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value as Role,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="USER">User</option>
                    <option value="SERVICEPROVIDER">Service Provider</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as UserStatus,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sendInvitation"
                    checked={formData.sendInvitation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sendInvitation: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded"
                  />
                  <label
                    htmlFor="sendInvitation"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Send invitation email
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({ ...prev, showCreateModal: false }))
                    }
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {state.showEditModal && state.selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-gray-900">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-white mb-4">Edit User</h3>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value as Role,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="USER">User</option>
                    <option value="SERVICEPROVIDER">Service Provider</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as UserStatus,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="ACTIVE">Active</option>
                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="sendInvitationEdit"
                    checked={formData.sendInvitation}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sendInvitation: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-600 rounded"
                  />
                  <label
                    htmlFor="sendInvitationEdit"
                    className="ml-2 block text-sm text-gray-300"
                  >
                    Send updated credentials email
                  </label>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        showEditModal: false,
                        selectedUser: null,
                      }))
                    }
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-lg hover:bg-orange-700"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {state.showDeleteModal && state.selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border border-gray-700 w-96 shadow-lg rounded-md bg-gray-900">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-white mb-4">
                Delete User
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <strong>
                  {state.selectedUser.name || state.selectedUser.email}
                </strong>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() =>
                    setState((prev) => ({
                      ...prev,
                      showDeleteModal: false,
                      selectedUser: null,
                    }))
                  }
                  className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
