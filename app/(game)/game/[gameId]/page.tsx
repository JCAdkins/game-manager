import { getGameById } from "@/lib/db/queries";

export default async function GamePage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;

  const game = await getGameById(gameId);

  return (
    <div>
      <h1>Game: {game[0].title}</h1>
      {/* Replace the content below with the game logic or UI */}
      <p>Welcome to the game!</p>
    </div>
  );
}
