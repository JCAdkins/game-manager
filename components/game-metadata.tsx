import { Game } from "@/lib/db/schema";

export default function GameMetadata({
  game,
  setGameData,
}: {
  game: Game;
  setGameData: (game: Game) => void;
}) {
  return (
    <div className="space-y-2">
      <span className="text-sm">Game Stats:</span>

      <label className="block">
        <span className="text-sm">Play Count:</span>
        <input
          type="number"
          value={game.play_count ? game.play_count : "0"}
          onChange={(e) =>
            setGameData({ ...game, play_count: parseInt(e.target.value) })
          }
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="block">
        <span className="text-sm">High Score:</span>
        <input
          type="number"
          value={game.high_score ? game.high_score : "0"}
          onChange={(e) =>
            setGameData({ ...game, high_score: parseInt(e.target.value) })
          }
          className="w-full p-2 border rounded"
        />
      </label>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={game.active}
          onChange={() => setGameData({ ...game, active: !game.active })}
        />
        <span>Active</span>
      </label>
    </div>
  );
}
