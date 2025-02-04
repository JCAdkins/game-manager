"use client";

import { useState } from "react";
import { Game } from "@/lib/db/schema";
import ImageUploader from "./image-uploader";
import GameMetadata from "./game-metadata";
import GameActions from "./game-actions";

export default function GameEditor({ game }: { game: Game }) {
  const [gameData, setGameData] = useState<Game>(game);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGameData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-bold text-center">Edit Game</h2>

      {/* Title */}
      <label className="block">
        <span className="text-sm">Title:</span>
        <input
          type="text"
          name="title"
          value={gameData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      {/* Description */}
      <label className="block">
        <span className="text-sm">Description:</span>
        <textarea
          name="description"
          value={gameData.description || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </label>

      {/* Developer & Platform */}
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm">Developer:</span>
          <input
            type="text"
            name="developer"
            value={gameData.developer || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-sm">Platform:</span>
          <input
            type="text"
            name="platform"
            value={gameData.platform || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
      </div>

      {/* Genre & Version */}
      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm">Genre:</span>
          <input
            type="text"
            name="genre"
            value={gameData.genre || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block">
          <span className="text-sm">Version:</span>
          <input
            type="text"
            name="version"
            value={gameData.version || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
      </div>

      {/* Screenshots */}
      <ImageUploader
        images={gameData.screenshots as string[]}
        setImages={(imgs) =>
          setGameData((prev) => ({ ...prev, screenshots: imgs }))
        }
      />

      {/* Game Metadata (Stats) */}
      <GameMetadata game={gameData} setGameData={setGameData} />

      {/* Game Actions (Save, Delete, Deactivate) */}
      <GameActions game={gameData} />
    </div>
  );
}
