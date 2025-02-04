import { getGameById } from "@/lib/db/queries";
import GameEditor from "@/components/game-editor";

type Params = Promise<{ gameId: string }>;

export default async function AdminEditPage(props: { params: Params }) {
  /* Await is not currently needed for the app to work but it could change in the future.
    Right now await is just suppressing a warning that Next.js gives about the future change. */
  const params = await props.params;
  const gameId = params.gameId;
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
