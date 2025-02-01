import { getGameById } from "@/lib/db/queries";

export default async function AdminEditPage({
  params,
}: {
  params: { gameId: string };
}) {
  const { gameId } = await params;
  const game = await getGameById(gameId);

  return (
    <div>
      <h1>Game: {game[0].title}</h1>
      {/* Replace the content below with the game logic or UI */}
      <p>You are now editing the game {game[0].id}!</p>
    </div>
  );
}
