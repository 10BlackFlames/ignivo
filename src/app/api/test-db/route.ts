import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const userCount = await prisma.user.count();

    return Response.json({
      success: true,
      message: "Ignivo database connection works.",
      userCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Database connection failed.",
      },
      { status: 500 }
    );
  }
}