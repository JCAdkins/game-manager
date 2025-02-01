import Image from "next/image";
import { Card } from "@/components/ui/card";
import { UserGame } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

export const GameItemCard = ({
  user_game,
  img_border,
  className,
}: {
  user_game: UserGame;
  img_border?: boolean;
  className?: string;
}) => {
  return (
    <Card
      className={className}
      header={user_game.game_title}
      footer={`Score: ${user_game.score}`}
    >
      <div className="relative w-full h-32">
        <Image
          src={user_game.game_image!}
          alt={user_game.game_title}
          layout="fill"
          objectFit="cover"
          className={cn(
            "max-w-[200px] max-h-[150px]",
            img_border ? "border-2 border-border rounded-md" : ""
          )}
        />
      </div>
    </Card>
  );
};
