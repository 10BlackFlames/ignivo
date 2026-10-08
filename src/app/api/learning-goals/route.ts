import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      subject,
      goal,
      dailyStudyTime,
      studyDays,
      currentLevel,
    } = body;

    if (
      !subject ||
      !goal ||
      !dailyStudyTime ||
      !studyDays ||
      !currentLevel
    ) {
      return Response.json(
        {
          success: false,
          message: "All learning goal fields are required.",
        },
        { status: 400 }
      );
    }

    // Temporary test user.
    // We will replace this with the authenticated user later.
    const user = await prisma.user.upsert({
      where: {
        email: "test@ignivo.local",
      },
      update: {},
      create: {
        email: "test@ignivo.local",
        name: "Test Student",
      },
    });

    const learningGoal = await prisma.learningGoal.create({
      data: {
        subject,
        goal,
        dailyStudyTime,
        studyDays,
        currentLevel,
        userId: user.id,
      },
    });

    return Response.json(
      {
        success: true,
        message: "Learning goal created successfully.",
        learningGoal,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Learning goal creation error:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to create learning goal.",
      },
      { status: 500 }
    );
  }
}