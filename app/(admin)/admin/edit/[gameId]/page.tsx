import { getGameById } from "@/lib/db/queries";
import GameEditor from "@/components/game-editor";

export default async function AdminEditPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  // @ts-expect-error Next.js 15 requires params to be awaited, but TypeScript complains
  const { gameId } = await params;
  const game = await getGameById(gameId);

  if (!game) {
    return <p>Game not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Editing: {game[0].title}</h1>
      <GameEditor game={game[0]} />
    </div>
  );
}
