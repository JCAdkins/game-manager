"use client";

import React, { useState } from "react";
import { Card } from "./ui/card";
import { cn, formatDateToMMDDYYYY } from "@/lib/utils";
import { Game } from "@/lib/db/schema";
import { Modal } from "./ui/modal";
import { AdvancedGameCard } from "./advanced-game-card";
import { GameItem } from "./sidebar-history";

export interface GameCardProps {
  children?: React.ReactNode;
  game: Game;
  onClick?: () => void;
  className?: string;
  grow_on_hover?: boolean;
  img_border?: boolean;
}

export const GameCard = ({
  game,
  img_border = false,
  grow_on_hover = false,
  className,
  onClick,
  ...props
}: GameCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    play_count,
    release_date,
    id,
    title,
    screenshots,
    description,
    genre,
    developer,
    high_score,
    version,
  } = game;

  const footer = (
    <div className="flex w-full justify-between">
      <p>Plays: {play_count}</p>
      <p>
        Released:{" "}
        {formatDateToMMDDYYYY(
          release_date ? release_date.toDateString() : new Date().toDateString()
        )}
      </p>
    </div>
  );

  const handleClick = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Card
        id={id}
        header={title}
        footer={footer}
        onClick={() => setIsOpen(true)} // ✅ Handle click event
        className={cn(
          className,
          grow_on_hover &&
            "hover:scale-[1.05] transition-transform duration-300"
        )}
        {...props}
      >
        <div className="flex flex-row gap-2">
          <img
            src={screenshots[0]}
            alt="Game Image"
            className={`max-w-[100px] max-h-[75px] w-fit h-fit rounded-lg ${
              img_border ? "border-2 border-foreground/50" : ""
            }`}
          />
          <p className="flex flex-row max-w-[15ch]">{description}</p>
        </div>
      </Card>

      {/* ✅ Modal for editing game options */}
      {isOpen && (
        <Modal
          title="Game Statistics"
          description="View this game and manage settings and state."
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <AdvancedGameCard onClick={handleClick} game={game} />
        </Modal>
      )}
    </>
  );
};
