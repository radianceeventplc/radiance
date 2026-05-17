import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { packageCategorySchema } from "@/lib/validations";

function nullable(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get("includeInactive") === "true";

    const categories = await prisma.packageCategory.findMany({
      where: includeInactive ? {} : { isActive: true },
      include: {
        _count: {
          select: {
            packages: {
              where: includeInactive ? {} : { isActive: true },
            },
          },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("ADMIN_PACKAGE_CATEGORIES_GET_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not load package categories" },
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
    const validation = packageCategorySchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0]?.message || "Invalid category";
      return NextResponse.json(
        { success: false, error: firstError },
        { status: 400 }
      );
    }

    const data = validation.data;
    const category = await prisma.packageCategory.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: nullable(data.description),
        coverImage: nullable(data.coverImage),
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
      include: { _count: { select: { packages: true } } },
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error("ADMIN_PACKAGE_CATEGORY_CREATE_ERROR", error);
    return NextResponse.json(
      { success: false, error: "Could not create category" },
      { status: 500 }
    );
  }
}
