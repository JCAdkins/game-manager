import { UUID } from "crypto";

interface GameMetadata {
  title: string; // The name of the game
  id: UUID;
  description: string;
  genre: string;
  release_date: number;
  developer: string;
  platform: string;
  version: string;
  play_count: number;
  high_score: number;
  screenshots: [];
  created_at: number;
  updated_at: number;
}

export interface Game extends GameMetadata {
  start: () => void; // Start the game
  stop: () => void; // Stop the game
  render: (ctx: CanvasRenderingContext2D) => void; // Render the game on a canvas
  update: () => void; // Update game logic
}
