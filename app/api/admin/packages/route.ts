import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { packageSchema } from "@/lib/validations";

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const packages = await prisma.package.findMany({
      include: { category: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    });

    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error("ADMIN_PACKAGES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not load packages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = packageSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid package";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = validation.data;
    const item = await prisma.package.create({
      data: {
        categoryId: data.categoryId,
        name: data.name,
        nameAm: data.nameAm ?? null,
        shortDesc: data.shortDesc,
        shortDescAm: data.shortDescAm ?? null,
        description: data.description,
        price: data.price ?? null,
        priceLabel: data.priceLabel,
        features: data.features,
        exclusions: data.exclusions,
        imageUrl: nullable(data.imageUrl),
        galleryImages: data.galleryImages,
        isPopular: data.isPopular,
        isFeatured: data.isFeatured,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
      },
      include: { category: true },
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error("ADMIN_PACKAGE_CREATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not create package" },
      { status: 500 }
    );
  }
}
