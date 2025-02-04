import { formatDateToMMDDYYYY } from "@/lib/utils";
import { GameCardProps } from "./game-card";
import { useRouter } from "next/navigation";
import ImageViewer from "./image-viewer";

export const AdvancedGameCard = ({
  game,
  className,
  onClick,
  ...props
}: GameCardProps) => {
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

  const router = useRouter();

  return (
    <div className={className} {...props}>
      <div className="mb-4 p-2 rounded-lg w-full max-h-[66vh] max-w-[66vw] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-border scrollbar-track-muted">
        <ImageViewer images={screenshots as string[]} />
        <div className="md:flex md:flex-row md:items-center md:gap-2 pb-2 pt-4">
          <div className="w-full h-[1px] bg-background" />
          <h2 className="md:text-nowrap">Basic Info</h2>
          <div className="w-full h-[1px] bg-background" />
        </div>
        <div className="flex flex-col gap-2">
          <p>Title: {title}</p>
          <p>Description: {description}</p>
          <p>Genre: {genre}</p>
          <p>Developer: {developer}</p>
          <p>Version: {version}</p>
          <p>
            Released:{" "}
            {formatDateToMMDDYYYY(
              release_date
                ? release_date.toDateString()
                : new Date().toDateString()
            )}
          </p>
        </div>
        <div className="md:flex md:flex-row md:items-center md:gap-2 py-2">
          <div className="w-full h-[1px] bg-background" />
          <h2 className="md:text-nowrap">Game Stats</h2>
          <div className="w-full h-[1px] bg-background"></div>
        </div>
        <p>Plays: {play_count}</p>

        <p>High Score: {high_score}</p>
        <p>Total Playtime: 10:43:31.45</p>
      </div>
      <div className="flex w-full justify-evenly">
        <button
          className="px-5 py-1 rounded-lg bg-background text-foreground border-1 border-background hover:bg-background/70"
          onClick={() => router.push(`/admin/edit/${id}`)}
        >
          {" "}
          Edit{" "}
        </button>
        <button
          className="px-3 py-1 rounded-lg bg-background text-foreground border-1 border-background hover:bg-background/70"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};
