"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2, Plus, X } from "lucide-react";
import { PackageCategoryRecord } from "@/types";

type CategoryDraft = {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  sortOrder: string;
  isActive: boolean;
};

const emptyCategory: CategoryDraft = {
  name: "",
  slug: "",
  description: "",
  coverImage: "",
  sortOrder: "0",
  isActive: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AdminPackageCategoriesPage() {
  const [categories, setCategories] = useState<PackageCategoryRecord[]>([]);
  const [draft, setDraft] = useState<CategoryDraft>(emptyCategory);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/package-categories?includeInactive=true");
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load categories");
      setCategories(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function editCategory(item: PackageCategoryRecord) {
    setEditingId(item.id);
    setDraft({
      name: item.name,
      slug: item.slug,
      description: item.description ?? "",
      coverImage: item.coverImage ?? "",
      sortOrder: String(item.sortOrder),
      isActive: item.isActive,
    });
  }

  async function saveCategory(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...draft,
        sortOrder: Number(draft.sortOrder) || 0,
      };
      const response = await fetch(
        editingId
          ? `/api/admin/package-categories/${editingId}`
          : "/api/admin/package-categories",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save category");

      setNotice(editingId ? "Category updated." : "Category created.");
      setEditingId(null);
      setDraft(emptyCategory);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save category");
    } finally {
      setSaving(false);
    }
  }

  async function removeCategory(id: string) {
    if (!window.confirm("Delete this category? Packages must be moved first.")) return;
    const response = await fetch(`/api/admin/package-categories/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Could not delete category");
      return;
    }
    setNotice("Category deleted.");
    await load();
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {(notice || error) && (
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            error
              ? "border-red-200 bg-red-50 text-red-700"
              : "border-green-200 bg-green-50 text-green-700"
          )}
        >
          {error || notice}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <form onSubmit={saveCategory} className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingId ? "Edit Category" : "Create Category"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setDraft(emptyCategory);
                }}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Category name
              <input
                type="text"
                value={draft.name}
                onChange={(e) =>
                  setDraft((current) => ({
                    ...current,
                    name: e.target.value,
                    slug: editingId ? current.slug : slugify(e.target.value),
                  }))
                }
                required
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Slug
              <input
                type="text"
                value={draft.slug}
                onChange={(e) => setDraft((current) => ({ ...current, slug: slugify(e.target.value) }))}
                required
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((current) => ({ ...current, description: e.target.value }))}
                rows={3}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Cover image URL
              <input
                type="text"
                value={draft.coverImage}
                onChange={(e) => setDraft((current) => ({ ...current, coverImage: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="block text-sm font-medium text-gray-700">
              Sort order
              <input
                type="number"
                value={draft.sortOrder}
                onChange={(e) => setDraft((current) => ({ ...current, sortOrder: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              />
            </label>
            <label className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
              Active
              <input
                type="checkbox"
                checked={draft.isActive}
                onChange={(e) => setDraft((current) => ({ ...current, isActive: e.target.checked }))}
                className="h-4 w-4 accent-amber-600"
              />
            </label>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Save Category
            </button>
          </div>
        </form>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">All Categories</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">/{category.slug}</div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs",
                      category.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {category.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {category.description || "No description"}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{category._count?.packages ?? 0} packages</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => editCategory(category)}
                      className="text-amber-700 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-gray-600">
                No categories created yet. Use the form to create one.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}