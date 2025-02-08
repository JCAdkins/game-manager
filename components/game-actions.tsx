"use client";

import { useState } from "react";
import { toast } from "sonner";
import DeleteGameDialog from "./delete-game-dialog";
import { Game } from "@/lib/db/schema";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function GameActions({
  game,
  isDirty,
}: // setGameData,
{
  game: Game;
  isDirty: boolean;
  // setGameData: (game: Game) => void;
}) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!isDirty) return; // ✅ Prevents unnecessary API calls

    try {
      // Ensure release_date and updated_at are properly formatted
      const formattedGameData = {
        ...game,
        release_date: game.release_date ?? new Date(),
        updated_at: new Date(), // Set updated timestamp
      };
      const response = await fetch(`/api/games/${game.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedGameData),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Game successfully saved.");
        router.refresh();
      } else {
        toast.error("Failed to save game:", result.error);
      }
    } catch (error) {
      toast.error("Error saving game:", error as any);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/games/${game.id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Game deleted successfully");
        router.push("/admin"); // ✅ Redirect after deletion
      } else {
        toast.error("Failed to delete game:", result.error);
      }
    } catch (error) {
      const err = error as string;
      console.log("error: ");
      console.log(error);
      toast.error("Error deleting game: " + err);
    }
  };

  return (
    <>
      <div className="flex justify-between mt-4">
        <Button
          variant="default"
          onClick={handleSave}
          disabled={!isDirty}
          className={`transition-opacity ${
            !isDirty ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Save Changes
        </Button>
        {/* <Button
          className="text-foreground px-4 py-2 rounded"
          onClick={() => setGameData({ ...game, active: !game.active })}
        >
          {game.active ? "Deactivate" : "Activate"}
        </Button> */}
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          Delete Game
        </Button>
      </div>
      {/* Delete Confirmation Modal */}
      <DeleteGameDialog
        open={isDeleteDialogOpen}
        setOpen={setIsDeleteDialogOpen}
        onConfirm={() => {
          handleDelete();
          setIsDeleteDialogOpen(false);
        }}
      />
    </>
  );
}
