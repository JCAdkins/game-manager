"use client";

import { useState, useEffect } from "react";
import { Game } from "@/lib/db/schema";
import { deepEqual } from "@/lib/utils"; // Utility function to compare objects
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import ImageUploader from "./image-uploader";
import GameMetadata from "./game-metadata";
import GameActions from "./game-actions";

export default function GameEditor({ game }: { game: Game }) {
  const [gameData, setGameData] = useState<Game>(game);
  const [isDirty, setIsDirty] = useState(false); // Track if changes were made
  const [editedFields, setEditedFields] = useState<Record<string, boolean>>({}); // Tracks edited fields

  // Store original game data for comparison
  const [originalGameData] = useState<Game>(game);

  // Check for changes on every gameData update
  useEffect(() => {
    setIsDirty(!deepEqual(originalGameData, gameData));
  }, [gameData, originalGameData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGameData((prev) => ({ ...prev, [name]: value }));
    setEditedFields((prev) => ({
      ...prev,
      [name]: value !== originalGameData[name as keyof Game],
    })); // Mark field as edited
  };

  return (
    <Card className="p-6 space-y-6 bg-foreground/5">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          type="text"
          name="title"
          value={gameData.title}
          onChange={handleChange}
          className={
            editedFields["title"] ? "border-2 border-chart-4 bg-chart-4/10" : ""
          }
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          name="description"
          value={gameData.description || ""}
          onChange={handleChange}
          className={
            editedFields["description"]
              ? "border-2 border-chart-4 bg-chart-4/10"
              : ""
          }
        />
      </div>

      {/* Developer & Platform */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="developer">Developer</Label>
          <Input
            id="developer"
            type="text"
            name="developer"
            value={gameData.developer || ""}
            onChange={handleChange}
            className={
              editedFields["developer"]
                ? "border-2 border-chart-4 bg-chart-4/10"
                : ""
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="platform">Platform</Label>
          <Input
            id="platform"
            type="text"
            name="platform"
            value={gameData.platform || ""}
            onChange={handleChange}
            className={
              editedFields["platform"]
                ? "border-2 border-chart-4 bg-chart-4/10"
                : ""
            }
          />
        </div>
      </div>

      {/* Genre & Version */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            type="text"
            name="genre"
            value={gameData.genre || ""}
            onChange={handleChange}
            className={
              editedFields["genre"]
                ? "border-2 border-chart-4 bg-chart-4/10"
                : ""
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="version">Version</Label>
          <Input
            id="version"
            type="text"
            name="version"
            value={gameData.version || ""}
            onChange={handleChange}
            className={
              editedFields["version"]
                ? "border-2 border-chart-4 bg-chart-4/10"
                : ""
            }
          />
        </div>
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
      <GameActions
        game={gameData}
        isDirty={isDirty}
        // setGameData={setGameData}
      />

      {/* Sidebar Editor (Sheet) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Advanced Settings</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Advanced Game Settings</SheetTitle>
          </SheetHeader>
          {/* You can add more advanced settings here */}
          <SheetFooter>
            <Button variant="default">Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Card>
  );
}
