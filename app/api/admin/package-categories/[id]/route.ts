import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { packageCategorySchema } from "@/lib/validations";

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
    const validation = packageCategorySchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid category";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = validation.data;
    const category = await prisma.packageCategory.update({
      where: { id },
      data: {
        name: data.name,
        nameAm: data.nameAm ?? null,
        slug: data.slug,
        description: nullable(data.description),
        coverImage: nullable(data.coverImage),
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
      include: { _count: { select: { packages: true } } },
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("ADMIN_PACKAGE_CATEGORY_UPDATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not update category" },
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
    await prisma.packageCategory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ADMIN_PACKAGE_CATEGORY_DELETE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not delete category. Move or delete packages in this category first." },
      { status: 500 }
    );
  }
}
