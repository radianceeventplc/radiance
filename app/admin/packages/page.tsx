import Link from "next/link";
import { Metadata } from "next";
import { Package, Layers, Eye, PlusCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Packages | Admin | Radiance",
  description: "Manage service packages and categories",
};

export default function AdminPackagesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
        <p className="mt-2 text-gray-600">
          Manage your service packages, categories, pricing, and features.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/packages/view"
          className="group rounded-none border border-gray-200 bg-white p-6 transition hover:border-[#ecd398] hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-[#fdf6e8] text-[#bf8f38] group-hover:bg-[#f7e8c4]">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900">View Packages</h3>
          <p className="mt-1 text-sm text-gray-500">Browse all packages and their details</p>
        </Link>

        <Link
          href="/admin/packages/manage"
          className="group rounded-none border border-gray-200 bg-white p-6 transition hover:border-[#ecd398] hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-[#fdf6e8] text-[#bf8f38] group-hover:bg-[#f7e8c4]">
            <Package className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Manage Packages</h3>
          <p className="mt-1 text-sm text-gray-500">Create and edit packages, features, pricing</p>
        </Link>

        <Link
          href="/admin/packages/categories"
          className="group rounded-none border border-gray-200 bg-white p-6 transition hover:border-[#ecd398] hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-[#fdf6e8] text-[#bf8f38] group-hover:bg-[#f7e8c4]">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Categories</h3>
          <p className="mt-1 text-sm text-gray-500">Manage package categories and ordering</p>
        </Link>

        <Link
          href="/admin/packages/manage"
          className="group rounded-none border border-gray-200 bg-white p-6 transition hover:border-[#ecd398] hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-none bg-[#fdf6e8] text-[#bf8f38] group-hover:bg-[#f7e8c4]">
            <PlusCircle className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900">Add New Package</h3>
          <p className="mt-1 text-sm text-gray-500">Create a new service package</p>
        </Link>
      </div>
    </div>
  );
}
