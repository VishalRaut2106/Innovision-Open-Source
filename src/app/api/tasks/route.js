import { NextResponse } from "next/server";
import { adminDb, FieldValue } from "@/lib/firebase-admin";
import { getServerSession } from "@/lib/auth-server";

async function completeChapter(chapter, roadmapId, user) {
  const docRef = adminDb
    .collection("users")
    .doc(user.email)
    .collection("roadmaps")
    .doc(roadmapId);
  const docSnap = await docRef.get();
  if (docSnap.exists) {
    const roadmap = docSnap.data();
    const updatedChapters = roadmap.chapters.map((ch) =>
      ch.chapterNumber == chapter ? { ...ch, completed: true } : ch
    );
    const completedChapters = updatedChapters.filter((ch) => ch.completed);

    // Award 50 XP for chapter completion in gamification stats
    try {
      const statsRef = adminDb.collection("gamification").doc(user.email);
      await adminDb.runTransaction(async (transaction) => {
        const statsDoc = await transaction.get(statsRef);
        const xpGained = 50;
        let stats = statsDoc.exists
          ? statsDoc.data()
          : {
              xp: 0,
              level: 1,
              streak: 1,
              badges: [],
              rank: 0,
              achievements: [],
              lastActive: new Date().toISOString(),
            };

        const newXP = (stats.xp || 0) + xpGained;
        const newLevel = Math.floor(newXP / 500) + 1;

        // Check for badges
        const currentBadges = stats.badges || [];
        const newBadges = [...currentBadges];

        // First course badge - awarded on first chapter completion
        if (!currentBadges.includes("first_course")) {
          newBadges.push("first_course");
        }

        // Check streak badges
        const streak = stats.streak || 1;
        if (streak >= 7 && !currentBadges.includes("week_streak")) {
          newBadges.push("week_streak");
        }
        if (streak >= 30 && !currentBadges.includes("month_streak")) {
          newBadges.push("month_streak");
        }

        transaction.set(
          statsRef,
          {
            ...stats,
            xp: newXP,
            level: newLevel,
            badges: newBadges,
            lastActive: new Date().toISOString(),
            achievements: [
              ...(stats.achievements || []),
              {
                title: "Chapter Complete!",
                description: "You completed a chapter",
                xp: xpGained,
                timestamp: new Date().toISOString(),
              },
            ],
          },
          { merge: true }
        );
      });
    } catch (xpError) {
      console.error("Failed to award chapter completion XP:", xpError);
    }

    const allDone = completedChapters.length === updatedChapters.length;
    if (allDone) {
      await docRef.update({ completed: true });
    }
    await docRef.update({ chapters: updatedChapters });
    return allDone;
  }
  return false;
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { task, roadmap, chapter, isCorrect, userAnswer } = body;

    // Validate required fields — use explicit null/undefined checks so falsy
    // values like 0 (chapter 0) or "" are not incorrectly rejected.
    const missing = [];
    if (!task) missing.push("task");
    if (!roadmap) missing.push("roadmap");
    if (chapter === undefined || chapter === null || chapter === "") missing.push("chapter");
    if (isCorrect === undefined || isCorrect === null) missing.push("isCorrect");
    if (userAnswer === undefined || userAnswer === null) missing.push("userAnswer");

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Normalise chapter to string for Firestore doc ID
    const chapterStr = String(chapter);

    const taskRef = adminDb
      .collection("users")
      .doc(session.user.email)
      .collection("roadmaps")
      .doc(roadmap)
      .collection("chapters")
      .doc(chapterStr)
      .collection("tasks")
      .doc("task");

    const allTasksSnap = await taskRef.get();
    let allTasks = allTasksSnap.exists ? Object.values(allTasksSnap.data()) : [];

    if (allTasks.length === 0) {
      return NextResponse.json(
        { error: "No tasks found for this chapter. Please refresh and try again." },
        { status: 404 }
      );
    }

    // Find the task — try by `id` first, fall back to question text trim-match
    let taskIndex = -1;
    if (task.id !== undefined && task.id !== null) {
      taskIndex = allTasks.findIndex((e) => e.id === task.id);
    }
    if (taskIndex === -1) {
      // Fallback: match by trimmed question text
      const normalise = (s) => (s || "").trim().toLowerCase();
      taskIndex = allTasks.findIndex(
        (e) => normalise(e.question) === normalise(task.question)
      );
    }

    if (taskIndex === -1) {
      return NextResponse.json(
        { error: "Task not found. Please refresh the page and try again." },
        { status: 404 }
      );
    }

    // Idempotent: already answered — return success so client can continue
    if (allTasks[taskIndex].isAnswered) {
      return NextResponse.json({
        message: "Task already answered",
        courseCompleted: false,
        courseId: roadmap,
      });
    }

    allTasks[taskIndex] = {
      ...task,
      isAnswered: true,
      isCorrect,
      userAnswer,
    };

    const date = new Date();
    const month = date.getMonth();

    if (isCorrect) {
      let points = 2;
      if (task.type === "match-the-following") {
        points = Array.isArray(isCorrect)
          ? isCorrect.filter((e) => e).length * 2
          : 2;
      }

      // Update legacy user XP — don't throw if this fails
      try {
        await adminDb
          .collection("users")
          .doc(session.user.email)
          .update({
            xp: FieldValue.increment(points),
            [`xptrack.${month}`]: FieldValue.increment(points),
          });
      } catch (xpUpdateError) {
        console.error("Failed to update legacy user XP:", xpUpdateError);
      }

      // Award XP in gamification stats
      try {
        const statsRef = adminDb.collection("gamification").doc(session.user.email);
        await adminDb.runTransaction(async (transaction) => {
          const statsDoc = await transaction.get(statsRef);
          const xpGained = points;
          let stats = statsDoc.exists
            ? statsDoc.data()
            : {
                xp: 0,
                level: 1,
                streak: 1,
                badges: [],
                rank: 0,
                achievements: [],
                lastActive: new Date().toISOString(),
              };

          const newXP = (stats.xp || 0) + xpGained;
          const newLevel = Math.floor(newXP / 500) + 1;

          const currentBadges = stats.badges || [];
          const newBadges = [...currentBadges];

          if (!currentBadges.includes("perfect_score")) {
            newBadges.push("perfect_score");
          }

          const hour = new Date().getHours();
          if (hour >= 0 && hour < 4 && !currentBadges.includes("night_owl")) {
            newBadges.push("night_owl");
          }
          if (hour >= 4 && hour < 6 && !currentBadges.includes("early_bird")) {
            newBadges.push("early_bird");
          }

          transaction.set(
            statsRef,
            {
              ...stats,
              xp: newXP,
              level: newLevel,
              badges: newBadges,
              lastActive: new Date().toISOString(),
              achievements: [
                ...(stats.achievements || []),
                {
                  title: "Correct Answer!",
                  description: "You answered correctly",
                  xp: xpGained,
                  timestamp: new Date().toISOString(),
                },
              ],
            },
            { merge: true }
          );
        });
      } catch (xpError) {
        console.error("Failed to award task XP:", xpError);
        // Non-fatal: task submission itself should still succeed
      }
    }

    // Save updated tasks
    await taskRef.set({ ...allTasks });

    // Check if all tasks answered → mark chapter complete
    const completedTasks = allTasks.filter((t) => t.isAnswered);
    let courseCompleted = false;
    if (completedTasks.length === allTasks.length) {
      courseCompleted = await completeChapter(chapterStr, roadmap, session.user);
    }

    return NextResponse.json(
      {
        message: "Task updated successfully",
        courseCompleted,
        courseId: roadmap,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Tasks API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
