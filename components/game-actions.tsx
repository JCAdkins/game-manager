import { Game } from "@/lib/db/schema";

export default function GameActions({ game }: { game: Game }) {
  const handleSave = () => console.log("Saving game:", game);
  const handleDelete = () => console.log("Deleting game:", game.id);
  const handleDeactivate = () => console.log("Deactivating game:", game.id);

  return (
    <div className="flex justify-between mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={handleDeactivate}
      >
        {game.active ? "Deactivate" : "Activate"}
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
