"use client";

import { FormEvent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Plus, Shield, ShieldOff, UserCog, KeyRound, Trash2, X } from "lucide-react";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-none bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
}

export function UserManagement() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState<string | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [formRole, setFormRole] = useState("STAFF");
  const [formIsActive, setFormIsActive] = useState(true);

  const isSuperAdmin = currentUserRole === "SUPER_ADMIN";

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/users");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load users");
      setUsers(result.data ?? []);

      // Get current user's role from API response
      if (result.currentUserRole) {
        setCurrentUserRole(result.currentUserRole);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function resetForm() {
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormConfirmPassword("");
    setFormRole("STAFF");
    setFormIsActive(true);
  }

  function openEdit(user: UserRecord) {
    setFormName(user.name);
    setFormEmail(user.email);
    setFormRole(user.role);
    setFormIsActive(user.isActive);
    setFormPassword("");
    setFormConfirmPassword("");
    setShowEditModal(user.id);
  }

  async function handleAddUser(event: FormEvent) {
    event.preventDefault();
    if (formPassword !== formConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          password: formPassword,
          role: formRole,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not create user");

      setNotice("User created successfully");
      setShowAddModal(false);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create user");
    } finally {
      setSaving(false);
    }
  }

  async function handleEditUser(event: FormEvent) {
    event.preventDefault();
    if (!showEditModal) return;

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const body: Record<string, unknown> = {
        name: formName,
        email: formEmail,
        role: formRole,
        isActive: formIsActive,
      };

      const response = await fetch(`/api/admin/users/${showEditModal}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update user");

      setNotice("User updated successfully");
      setShowEditModal(null);
      resetForm();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update user");
    } finally {
      setSaving(false);
    }
  }

  async function handleResetPassword(event: FormEvent) {
    event.preventDefault();
    if (!showPasswordModal) return;
    if (formPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/users/${showPasswordModal}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: formPassword }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not reset password");

      setNotice("Password updated successfully");
      setShowPasswordModal(null);
      setFormPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(user: UserRecord) {
    const action = user.isActive ? "disable" : "enable";
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !user.isActive }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || `Could not ${action} user`);
        return;
      }

      setNotice(`User ${action}d successfully`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : `Could not ${action} user`);
    }
  }

  async function handleDeleteUser(user: UserRecord) {
    if (!window.confirm(`Delete ${user.name}? This action cannot be undone.`)) return;

    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Could not delete user");
        return;
      }

      setNotice("User deleted successfully");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete user");
    }
  }

  const roleBadge = (role: string) => {
    const styles: Record<string, string> = {
      SUPER_ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
      ADMIN: "bg-blue-100 text-blue-700 border-blue-200",
      STAFF: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", styles[role] ?? styles.STAFF)}>
        {role === "SUPER_ADMIN" ? <Shield className="h-3 w-3" /> : <UserCog className="h-3 w-3" />}
        {role.replace("_", " ")}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[#bf8f38]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Users</h1>
          <p className="mt-1 text-gray-600">Manage admin accounts and permissions</p>
        </div>
        {isSuperAdmin && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38]"
          >
            <Plus className="h-4 w-4" />
            Add New Admin
          </button>
        )}
      </div>

      {(notice || error) && (
        <div
          className={cn(
            "rounded-none border px-4 py-3 text-sm",
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          )}
        >
          {error || notice}
          <button
            type="button"
            onClick={() => { setError(""); setNotice(""); }}
            className="ml-3 font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {!isSuperAdmin && (
        <div className="rounded-none border border-[#ecd398] bg-[#fdf6e8] px-4 py-3 text-sm text-[#a47a2a]">
          Only super admins can manage users. Contact your super admin for changes.
        </div>
      )}

      <div className="overflow-x-auto rounded-none border border-gray-200 bg-white">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-left text-gray-600">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
              {isSuperAdmin && <th className="px-4 py-3 text-right font-medium">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f7e8c4] text-sm font-semibold text-[#a47a2a]">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3">{roleBadge(user.role)}</td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      user.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    )}
                  >
                    {user.isActive ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                {isSuperAdmin && (
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(user)}
                        className="rounded border border-[#d9b665] p-1.5 text-[#a47a2a] hover:bg-[#fdf6e8]"
                        title="Edit user"
                      >
                        <UserCog className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormPassword("");
                          setShowPasswordModal(user.id);
                        }}
                        className="rounded border border-blue-200 p-1.5 text-blue-600 hover:bg-blue-50"
                        title="Reset password"
                      >
                        <KeyRound className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleActive(user)}
                        className={cn(
                          "rounded border p-1.5",
                          user.isActive
                            ? "border-[#ecd398] text-[#bf8f38] hover:bg-[#fdf6e8]"
                            : "border-green-200 text-green-600 hover:bg-green-50"
                        )}
                        title={user.isActive ? "Disable user" : "Enable user"}
                      >
                        {user.isActive ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user)}
                        className="rounded border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={isSuperAdmin ? 6 : 5} className="px-4 py-10 text-center text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <Modal title="Add New Admin" onClose={() => setShowAddModal(false)}>
          <form onSubmit={handleAddUser} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
              <span className="mt-1 block text-xs text-gray-500">Minimum 8 characters</span>
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
              <input
                type="password"
                value={formConfirmPassword}
                onChange={(e) => setFormConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Role
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
              </select>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Create User
            </button>
          </form>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <Modal title="Edit User" onClose={() => setShowEditModal(null)}>
          <form onSubmit={handleEditUser} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Role
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              >
                <option value="SUPER_ADMIN">Super Admin</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
              </select>
            </label>
            <label className="flex items-center justify-between gap-3 rounded-none border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
              Active
              <input
                type="checkbox"
                checked={formIsActive}
                onChange={(e) => setFormIsActive(e.target.checked)}
                className="h-4 w-4 accent-[#bf8f38]"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserCog className="h-4 w-4" />}
              Save Changes
            </button>
          </form>
        </Modal>
      )}

      {/* Password Reset Modal */}
      {showPasswordModal && (
        <Modal title="Reset Password" onClose={() => setShowPasswordModal(null)}>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              New Password
              <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-none border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#bf8f38] focus:ring-2 focus:ring-[#ecd398]"
              />
              <span className="mt-1 block text-xs text-gray-500">Minimum 8 characters</span>
            </label>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-[#bf8f38] px-4 py-2 text-sm font-semibold text-white hover:bg-[#bf8f38] disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              Update Password
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}