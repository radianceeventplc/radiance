import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { packageSchema } from "@/lib/validations";

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
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
    const item = await prisma.package.update({
      where: { id },
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

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("ADMIN_PACKAGE_UPDATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update package" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    await prisma.package.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ADMIN_PACKAGE_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not delete package" },
      { status: 500 }
    );
  }
}
