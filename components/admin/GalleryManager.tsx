"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  Check,
  ImagePlus,
  Loader2,
  RefreshCw,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import {
  GalleryImageDto,
  formatGalleryCategory,
  galleryCategoryValues,
} from "@/lib/gallery";

type GalleryResponse = {
  success: boolean;
  data?: GalleryImageDto[] | GalleryImageDto;
  error?: string;
};

const emptyForm = {
  title: "",
  description: "",
  category: "WEDDINGS",
  sortOrder: "0",
  isFeatured: false,
  isBeforeAfter: false,
};

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  function loadImages() {
    setLoading(true);
    setError("");

    fetch("/api/gallery")
      .then((response) => response.json() as Promise<GalleryResponse>)
      .then((payload) => {
        if (!payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.error || "Failed to load gallery");
        }

        setImages(payload.data);
      })
      .catch((loadError: Error) => setError(loadError.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    let ignore = false;

    fetch("/api/gallery")
      .then((response) => response.json() as Promise<GalleryResponse>)
      .then((payload) => {
        if (!payload.success || !Array.isArray(payload.data)) {
          throw new Error(payload.error || "Failed to load gallery");
        }

        if (!ignore) {
          setImages(payload.data);
        }
      })
      .catch((loadError: Error) => {
        if (!ignore) {
          setError(loadError.message);
        }
      })
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  function updateForm(
    key: keyof typeof emptyForm,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void
  ) {
    setter(event.target.files?.[0] ?? null);
  }

  function resetUpload() {
    setForm(emptyForm);
    setMainFile(null);
    setBeforeFile(null);
    setAfterFile(null);
  }

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("sortOrder", form.sortOrder);
      formData.append("isFeatured", String(form.isFeatured));
      formData.append("isBeforeAfter", String(form.isBeforeAfter));

      if (mainFile) formData.append("file", mainFile);
      if (beforeFile) formData.append("beforeFile", beforeFile);
      if (afterFile) formData.append("afterFile", afterFile);

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as GalleryResponse;

      if (!payload.success) {
        throw new Error(payload.error || "Upload failed");
      }

      setMessage("Gallery image uploaded.");
      setModalOpen(false);
      resetUpload();
      loadImages();
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed"
      );
    } finally {
      setSaving(false);
    }
  }

  async function updateImage(id: string, body: Record<string, unknown>) {
    setError("");
    setMessage("");

    const response = await fetch(`/api/gallery/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = (await response.json()) as GalleryResponse;

    if (!payload.success || !payload.data || Array.isArray(payload.data)) {
      throw new Error(payload.error || "Update failed");
    }

    setImages((current) =>
      current.map((image) =>
        image.id === id ? (payload.data as GalleryImageDto) : image
      )
    );
    setMessage("Gallery image updated.");
  }

  async function deleteImage(id: string) {
    const confirmed = window.confirm("Delete this gallery image?");
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });
      const payload = (await response.json()) as GalleryResponse;

      if (!payload.success) {
        throw new Error(payload.error || "Delete failed");
      }

      setImages((current) => current.filter((image) => image.id !== id));
      setMessage("Gallery image deleted.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Delete failed"
      );
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#bf8f38]/70">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload portfolio images and manage their public gallery order.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={loadImages}
            className="inline-flex items-center gap-2 border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#bf8f38] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#bf8f38]"
          >
            <Upload className="h-4 w-4" />
            Upload
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden border border-gray-200 bg-white">
        {loading ? (
          <div className="flex min-h-72 items-center justify-center text-gray-600">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading gallery...
          </div>
        ) : images.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-6 text-center text-gray-600">
            <ImagePlus className="h-10 w-10 text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              No gallery images
            </h2>
            <p className="mt-2 max-w-md text-sm">
              Upload your first image to start building the public gallery.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-gray-200 text-xs uppercase tracking-[0.14em] text-gray-500">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Sort</th>
                  <th className="px-4 py-3">Featured</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {images.map((image) => (
                  <tr key={image.id} className="text-gray-700">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-20 overflow-hidden bg-gray-100">
                          <Image
                            src={image.imageUrl}
                            alt={image.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {image.title}
                          </div>
                          {image.description && (
                            <div className="mt-1 line-clamp-1 max-w-xs text-xs text-gray-600">
                              {image.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {formatGalleryCategory(image.category)}
                    </td>
                    <td className="px-4 py-4">
                      <input
                        type="number"
                        defaultValue={image.sortOrder}
                        className="w-20 border border-gray-200 bg-white px-2 py-1 text-gray-900 outline-none focus:border-[#bf8f38]"
                        onBlur={(event) => {
                          const value = Number(event.target.value);
                          if (value !== image.sortOrder) {
                            updateImage(image.id, { sortOrder: value }).catch(
                              (updateError: Error) => setError(updateError.message)
                            );
                          }
                        }}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          updateImage(image.id, {
                            isFeatured: !image.isFeatured,
                          }).catch((updateError: Error) =>
                            setError(updateError.message)
                          )
                        }
                        className={`inline-flex h-9 w-9 items-center justify-center border transition ${
                          image.isFeatured
                            ? "border-[#bf8f38]/40 bg-[#fdf6e8] text-[#a47a2a]"
                            : "border-gray-200 text-gray-500 hover:text-gray-900"
                        }`}
                        aria-label="Toggle featured"
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      {image.isBeforeAfter ? "Before / After" : "Single image"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => deleteImage(image.id)}
                          className="inline-flex h-9 w-9 items-center justify-center border border-red-200 text-red-700 transition hover:bg-red-50"
                          aria-label="Delete image"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-4 py-8">
          <form
            onSubmit={handleUpload}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-gray-200 bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Upload Gallery Image
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Add a public portfolio image or a before/after comparison.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="grid h-10 w-10 place-items-center border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                aria-label="Close upload modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  Title
                </span>
                <input
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  required
                  className="w-full border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#bf8f38]"
                />
              </label>

              <label>
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category
                </span>
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateForm("category", event.target.value)
                  }
                  className="w-full border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#bf8f38]"
                >
                  {galleryCategoryValues.map((category) => (
                    <option key={category} value={category}>
                      {formatGalleryCategory(category)}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  Sort order
                </span>
                <input
                  type="number"
                  value={form.sortOrder}
                  onChange={(event) =>
                    updateForm("sortOrder", event.target.value)
                  }
                  className="w-full border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#bf8f38]"
                />
              </label>

              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-gray-300">
                  Description
                </span>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateForm("description", event.target.value)
                  }
                  rows={3}
                  className="w-full resize-none border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none focus:border-[#bf8f38]"
                />
              </label>

              <label className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(event) =>
                    updateForm("isFeatured", event.target.checked)
                  }
                  className="h-4 w-4 accent-[#bf8f38]"
                />
                Featured
              </label>

              <label className="flex items-center gap-3 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isBeforeAfter}
                  onChange={(event) =>
                    updateForm("isBeforeAfter", event.target.checked)
                  }
                  className="h-4 w-4 accent-[#bf8f38]"
                />
                Before / After
              </label>

              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-gray-700">
                  Main image
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  required
                  onChange={(event) => handleFileChange(event, setMainFile)}
                  className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:border-0 file:bg-[#bf8f38] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
                />
              </label>

              {form.isBeforeAfter && (
                <>
                  <label>
                    <span className="mb-1.5 block text-sm font-medium text-gray-700">
                      Before image
                    </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        required
                        onChange={(event) =>
                          handleFileChange(event, setBeforeFile)
                        }
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-900"
                      />
                  </label>
                  <label>
                    <span className="mb-1.5 block text-sm font-medium text-gray-700">
                      After image
                    </span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        required
                        onChange={(event) => handleFileChange(event, setAfterFile)}
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-900"
                      />
                  </label>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 bg-[#bf8f38] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#bf8f38] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
