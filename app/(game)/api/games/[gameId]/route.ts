import { NextResponse } from "next/server";
import { db } from "@/lib/db/queries";
import { game } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Handle PUT request to update a game
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const body = await req.json();
    const { gameId } = await params;
    const fixedGame = {
      ...body,
      release_date: body.release_date
        ? new Date(body.release_date)
        : new Date(),
      updated_at: new Date(), // Always update timestamp
      created_at: new Date(body.created_at),
    };

    console.log("fixedGame: ");
    console.log(fixedGame);

    // Convert dates from string back to Date object before saving
    const updatedGame = await db
      .update(game)
      .set(fixedGame)
      .where(eq(game.id, gameId))
      .returning();

    return NextResponse.json({ success: true, data: updatedGame });
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  try {
    const { gameId } = await params;
    await db.delete(game).where(eq(game.id, gameId));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
