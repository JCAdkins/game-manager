"use client";

import React from "react";
import { Card } from "./ui/card";
import { formatDateToMMDDYYYY } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const GameCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    game_title?: string;
    game_id?: string;
    game_images?: string[];
    game_plays?: number | null;
    game_description?: string;
    game_release?: Date;
    className?: string;
  }
>(
  (
    {
      game_title = "title",
      game_id = "id",
      game_images = ["Some url"],
      game_plays = 0,
      game_description = "description",
      game_release = new Date(),
      className,
      ...props
    },
    ref
  ) => {
    const footer = (
      <div className="flex w-full justify-between">
        <p>Plays: {game_plays}</p>
        <p>Released: {formatDateToMMDDYYYY(game_release.toDateString())}</p>
      </div>
    );
    return (
      <Card
        ref={ref}
        id={game_id}
        header={game_title}
        footer={footer}
        className={className}
        {...props}
      >
        <div className="flex flex-row gap-2">
          <img
            src={game_images[0]}
            alt="Game Image"
            className="max-w-[100px] max-h-[75px] w-fit h-fit rounded-lg"
          />
          <p className="flex flex-row max-w-[15ch]">{game_description}</p>
        </div>
      </Card>
    );
  }
);
