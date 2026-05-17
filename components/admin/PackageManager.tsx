"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Edit,
  Eye,
  EyeOff,
  Loader2,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { PackageCategoryRecord, PackageRecord } from "@/types";
import { cn } from "@/lib/utils";

type PackageDraft = {
  categoryId: string;
  name: string;
  shortDesc: string;
  description: string;
  price: string;
  priceLabel: string;
  features: string[];
  exclusions: string[];
  imageUrl: string;
  galleryImages: string;
  isPopular: boolean;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: string;
};

type CategoryDraft = {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  sortOrder: string;
  isActive: boolean;
};

const emptyPackage: PackageDraft = {
  categoryId: "",
  name: "",
  shortDesc: "",
  description: "",
  price: "",
  priceLabel: "",
  features: [""],
  exclusions: [""],
  imageUrl: "",
  galleryImages: "",
  isPopular: false,
  isFeatured: false,
  isActive: true,
  sortOrder: "0",
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

export function PackageManager() {
  const [packages, setPackages] = useState<PackageRecord[]>([]);
  const [categories, setCategories] = useState<PackageCategoryRecord[]>([]);
  const [packageDraft, setPackageDraft] = useState<PackageDraft>(emptyPackage);
  const [categoryDraft, setCategoryDraft] = useState<CategoryDraft>(emptyCategory);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeCategories = useMemo(
    () => categories.filter((category) => category.isActive),
    [categories]
  );

  async function load() {
    setLoading(true);
    setError("");
    try {
      const [packageResponse, categoryResponse] = await Promise.all([
        fetch("/api/admin/packages"),
        fetch("/api/admin/package-categories?includeInactive=true"),
      ]);
      const [packageResult, categoryResult] = await Promise.all([
        packageResponse.json(),
        categoryResponse.json(),
      ]);

      if (!packageResponse.ok) throw new Error(packageResult.error || "Could not load packages");
      if (!categoryResponse.ok) throw new Error(categoryResult.error || "Could not load categories");

      setPackages(packageResult.data ?? []);
      setCategories(categoryResult.data ?? []);
      if (!packageDraft.categoryId && categoryResult.data?.[0]?.id) {
        setPackageDraft((current) => ({ ...current, categoryId: categoryResult.data[0].id }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load package manager");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void Promise.resolve().then(load);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function editPackage(item: PackageRecord) {
    setEditingPackageId(item.id);
    setPackageDraft({
      categoryId: item.categoryId,
      name: item.name,
      shortDesc: item.shortDesc,
      description: item.description,
      price: item.price === null ? "" : String(item.price),
      priceLabel: item.priceLabel,
      features: item.features.length ? item.features : [""],
      exclusions: item.exclusions.length ? item.exclusions : [""],
      imageUrl: item.imageUrl ?? "",
      galleryImages: item.galleryImages.join("\n"),
      isPopular: item.isPopular,
      isFeatured: item.isFeatured,
      isActive: item.isActive,
      sortOrder: String(item.sortOrder),
    });
  }

  function editCategory(item: PackageCategoryRecord) {
    setEditingCategoryId(item.id);
    setCategoryDraft({
      name: item.name,
      slug: item.slug,
      description: item.description ?? "",
      coverImage: item.coverImage ?? "",
      sortOrder: String(item.sortOrder),
      isActive: item.isActive,
    });
  }

  async function savePackage(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...packageDraft,
        price: packageDraft.price.trim() ? Number(packageDraft.price) : null,
        sortOrder: Number(packageDraft.sortOrder) || 0,
        features: packageDraft.features.map((item) => item.trim()).filter(Boolean),
        exclusions: packageDraft.exclusions.map((item) => item.trim()).filter(Boolean),
        galleryImages: packageDraft.galleryImages
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      const response = await fetch(
        editingPackageId ? `/api/admin/packages/${editingPackageId}` : "/api/admin/packages",
        {
          method: editingPackageId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save package");

      setNotice(editingPackageId ? "Package updated." : "Package created.");
      setEditingPackageId(null);
      setPackageDraft({ ...emptyPackage, categoryId: activeCategories[0]?.id ?? "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save package");
    } finally {
      setSaving(false);
    }
  }

  async function saveCategory(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const payload = {
        ...categoryDraft,
        sortOrder: Number(categoryDraft.sortOrder) || 0,
      };
      const response = await fetch(
        editingCategoryId
          ? `/api/admin/package-categories/${editingCategoryId}`
          : "/api/admin/package-categories",
        {
          method: editingCategoryId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save category");

      setNotice(editingCategoryId ? "Category updated." : "Category created.");
      setEditingCategoryId(null);
      setCategoryDraft(emptyCategory);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save category");
    } finally {
      setSaving(false);
    }
  }

  async function removePackage(id: string) {
    if (!window.confirm("Delete this package?")) return;
    const response = await fetch(`/api/admin/packages/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Could not delete package");
      return;
    }
    setNotice("Package deleted.");
    await load();
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
            error ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700"
          )}
        >
          {error || notice}
        </div>
      )}

      <section className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <form onSubmit={saveCategory} className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingCategoryId ? "Edit Category" : "Create Category"}
            </h2>
            {editingCategoryId && (
              <button
                type="button"
                onClick={() => {
                  setEditingCategoryId(null);
                  setCategoryDraft(emptyCategory);
                }}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>
          <div className="space-y-4">
            <Field
              label="Category name"
              value={categoryDraft.name}
              onChange={(value) =>
                setCategoryDraft((current) => ({
                  ...current,
                  name: value,
                  slug: editingCategoryId ? current.slug : slugify(value),
                }))
              }
              required
            />
            <Field
              label="Slug"
              value={categoryDraft.slug}
              onChange={(value) => setCategoryDraft((current) => ({ ...current, slug: slugify(value) }))}
              required
            />
            <TextArea
              label="Description"
              value={categoryDraft.description}
              onChange={(value) => setCategoryDraft((current) => ({ ...current, description: value }))}
              rows={3}
            />
            <Field
              label="Cover image URL"
              value={categoryDraft.coverImage}
              onChange={(value) => setCategoryDraft((current) => ({ ...current, coverImage: value }))}
            />
            <Field
              label="Sort order"
              type="number"
              value={categoryDraft.sortOrder}
              onChange={(value) => setCategoryDraft((current) => ({ ...current, sortOrder: value }))}
            />
            <Toggle
              label="Active"
              checked={categoryDraft.isActive}
              onChange={(value) => setCategoryDraft((current) => ({ ...current, isActive: value }))}
            />
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
          <h2 className="mb-5 text-lg font-semibold text-gray-900">Categories</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">/{category.slug}</div>
                  </div>
                  <span className={cn("rounded-full px-2.5 py-1 text-xs", category.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600")}>
                    {category.isActive ? "Active" : "Hidden"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600">{category.description || "No description"}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                  <span>{category._count?.packages ?? 0} packages</span>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => editCategory(category)} className="text-amber-700 hover:underline">
                      Edit
                    </button>
                    <button type="button" onClick={() => removeCategory(category.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {categories.length === 0 && <p className="text-sm text-gray-600">Create a category to start adding packages.</p>}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[.9fr_1.1fr]">
        <form onSubmit={savePackage} className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingPackageId ? "Edit Package" : "Create Package"}
            </h2>
            {editingPackageId && (
              <button
                type="button"
                onClick={() => {
                  setEditingPackageId(null);
                  setPackageDraft({ ...emptyPackage, categoryId: activeCategories[0]?.id ?? "" });
                }}
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
              <select
                value={packageDraft.categoryId}
                onChange={(event) => setPackageDraft((current) => ({ ...current, categoryId: event.target.value }))}
                required
                className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <Field label="Package name" value={packageDraft.name} onChange={(value) => setPackageDraft((current) => ({ ...current, name: value }))} required />
            <TextArea label="Short description" value={packageDraft.shortDesc} onChange={(value) => setPackageDraft((current) => ({ ...current, shortDesc: value }))} rows={2} required />
            <TextArea label="Full description" value={packageDraft.description} onChange={(value) => setPackageDraft((current) => ({ ...current, description: value }))} rows={5} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Price" type="number" value={packageDraft.price} onChange={(value) => setPackageDraft((current) => ({ ...current, price: value }))} />
              <Field label="Price label" value={packageDraft.priceLabel} onChange={(value) => setPackageDraft((current) => ({ ...current, priceLabel: value }))} required />
            </div>
            <DynamicList title="Features" values={packageDraft.features} onChange={(values) => setPackageDraft((current) => ({ ...current, features: values }))} />
            <DynamicList title="Exclusions" values={packageDraft.exclusions} onChange={(values) => setPackageDraft((current) => ({ ...current, exclusions: values }))} />
            <Field label="Image URL" value={packageDraft.imageUrl} onChange={(value) => setPackageDraft((current) => ({ ...current, imageUrl: value }))} />
            <TextArea label="Gallery image URLs" value={packageDraft.galleryImages} onChange={(value) => setPackageDraft((current) => ({ ...current, galleryImages: value }))} rows={3} helper="One URL per line." />
            <Field label="Sort order" type="number" value={packageDraft.sortOrder} onChange={(value) => setPackageDraft((current) => ({ ...current, sortOrder: value }))} />
            <div className="grid gap-3 sm:grid-cols-3">
              <Toggle label="Popular" checked={packageDraft.isPopular} onChange={(value) => setPackageDraft((current) => ({ ...current, isPopular: value }))} />
              <Toggle label="Featured" checked={packageDraft.isFeatured} onChange={(value) => setPackageDraft((current) => ({ ...current, isFeatured: value }))} />
              <Toggle label="Active" checked={packageDraft.isActive} onChange={(value) => setPackageDraft((current) => ({ ...current, isActive: value }))} />
            </div>
            <button
              type="submit"
              disabled={saving || categories.length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              Save Package
            </button>
          </div>
        </form>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">Packages</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-gray-600">
                  <th className="px-3 py-3 font-medium">Thumbnail</th>
                  <th className="px-3 py-3 font-medium">Package Name</th>
                  <th className="px-3 py-3 font-medium">Category</th>
                  <th className="px-3 py-3 font-medium">Price</th>
                  <th className="px-3 py-3 font-medium">Popular</th>
                  <th className="px-3 py-3 font-medium">Active</th>
                  <th className="px-3 py-3 font-medium">Updated</th>
                  <th className="px-3 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {packages.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="px-3 py-3">
                      <div className="relative h-12 w-16 overflow-hidden rounded bg-gray-100">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt="" fill className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">No img</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="max-w-[220px] truncate text-xs text-gray-500">{item.shortDesc}</div>
                    </td>
                    <td className="px-3 py-3 text-gray-700">{item.category?.name ?? "Uncategorized"}</td>
                    <td className="px-3 py-3 text-gray-700">{item.priceLabel}</td>
                    <td className="px-3 py-3">{item.isPopular ? <Star className="h-4 w-4 fill-amber-500 text-amber-500" /> : "-"}</td>
                    <td className="px-3 py-3">{item.isActive ? <Eye className="h-4 w-4 text-green-600" /> : <EyeOff className="h-4 w-4 text-gray-400" />}</td>
                    <td className="px-3 py-3 text-gray-600">{new Date(item.updatedAt).toLocaleDateString()}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => editPackage(item)} className="rounded border border-amber-300 p-1.5 text-amber-700 hover:bg-amber-50" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button type="button" onClick={() => removePackage(item.id)} className="rounded border border-red-200 p-1.5 text-red-600 hover:bg-red-50" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {packages.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-gray-600">
                      No packages yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function DynamicList({
  title,
  values,
  onChange,
}: {
  title: string;
  values: string[];
  onChange: (values: string[]) => void;
}) {
  function move(index: number, direction: -1 | 1) {
    const next = [...values];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{title}</span>
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
      <div className="space-y-2">
        {values.map((value, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={value}
              onChange={(event) => onChange(values.map((item, i) => (i === index ? event.target.value : item)))}
              className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder={`${title.slice(0, -1)} ${index + 1}`}
            />
            <button type="button" onClick={() => move(index, -1)} className="rounded border border-gray-200 p-2 text-gray-500 hover:bg-gray-50" title="Move up">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => move(index, 1)} className="rounded border border-gray-200 p-2 text-gray-500 hover:bg-gray-50" title="Move down">
              <ArrowDown className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => onChange(values.filter((_, i) => i !== index))} className="rounded border border-red-200 p-2 text-red-600 hover:bg-red-50" title="Remove">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-amber-600"
      />
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  required,
  helper,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  required?: boolean;
  helper?: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        required={required}
        className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      />
      {helper && <span className="mt-1 block text-xs text-gray-500">{helper}</span>}
    </label>
  );
}
