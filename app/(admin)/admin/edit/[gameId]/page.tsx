import { getGameById } from "@/lib/db/queries";
import GameEditor from "@/components/game-editor";
import { notFound } from "next/navigation";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const game = await getGameById(gameId);

  if (!game || game.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl text-center font-bold mb-4">
        Editing: {game[0].title}
      </h1>
      <GameEditor game={game[0]} />
    </div>
  );
}
