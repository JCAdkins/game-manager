"use client";

import { useState } from "react";
import { Game } from "@/lib/db/schema";

interface GameFormProps {
  game: Game;
  onUpdate: (updatedGame: Game) => void;
}

export const GameForm = ({ game, onUpdate }: GameFormProps) => {
  const [formData, setFormData] = useState(game);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call API to update game
    onUpdate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description ? formData.description : ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Genre</label>
        <input
          type="text"
          name="genre"
          value={formData.genre ? formData.genre : ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Developer</label>
        <input
          type="text"
          name="developer"
          value={formData.developer ? formData.developer : ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Version</label>
        <input
          type="text"
          name="version"
          value={formData.version ? formData.version : ""}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="inactive"
          checked={formData.active ? true : false}
          onChange={(e) =>
            setFormData({ ...formData, active: e.target.checked })
          }
          className="w-4 h-4"
        />
        <label className="text-sm">Mark as Inactive</label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
};
