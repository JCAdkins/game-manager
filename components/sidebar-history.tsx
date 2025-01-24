"use client";

import { isToday, isYesterday, subMonths, subWeeks } from "date-fns";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import type { User } from "next-auth";
import { memo, useEffect, useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";

import {
  // CheckCircleFillIcon,
  GlobeIcon,
  LockIcon,
  MoreHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GameCard,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { fetcher } from "@/lib/utils";
import { UserGame } from "@/lib/db/schema";

type GroupedGames = {
  today: UserGame[];
  yesterday: UserGame[];
  lastWeek: UserGame[];
  lastMonth: UserGame[];
  older: UserGame[];
};

const PureGameItem = ({
  user_game,
  game_images,
  isActive,
  onDelete,
  setOpenMobile,
}: {
  user_game: UserGame;
  game_images: string[];
  isActive: boolean;
  onDelete: (gameId: string) => void;
  setOpenMobile: (open: boolean) => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} size={"custom"}>
        <Link
          href={`/game/${user_game.game_id}`}
          onClick={() => setOpenMobile(false)}
        >
          <GameCard
            game_title={user_game.game_title}
            game_id={user_game.game_id}
            game_images={game_images}
            user_score={user_game.score}
          />
        </Link>
      </SidebarMenuButton>

      <DropdownMenu modal={true}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5"
            showOnHover={!isActive}
          >
            <MoreHorizontalIcon />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="cursor-pointer">
              <ShareIcon />
              <span>Share</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between"
                  onClick={() => {
                    console.log("Private drop down clicked.");
                    // setVisibilityType("private");
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <LockIcon size={12} />
                    <span>Private</span>
                  </div>
                  {/* {visibilityType === "private" ? (
                    <CheckCircleFillIcon />
                  ) : null} */}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer flex-row justify-between"
                  onClick={() => {
                    console.log("Public drop down clicked.");
                    // setVisibilityType("public");
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <GlobeIcon />
                    <span>Public</span>
                  </div>
                  {/* {visibilityType === "public" ? <CheckCircleFillIcon /> : null} */}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
            onSelect={() => onDelete(user_game.id)}
          >
            <TrashIcon />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};

export const GameItem = memo(PureGameItem, (prevProps, nextProps) => {
  if (prevProps.isActive !== nextProps.isActive) return false;
  return true;
});

export function SidebarHistory({ user }: { user: User | undefined }) {
  const { setOpenMobile } = useSidebar();
  const { id } = useParams();
  const pathname = usePathname();
  const {
    data: history,
    isLoading,
    mutate,
  } = useSWR<Array<UserGame>>(user ? `api/history` : null, fetcher, {
    fallbackData: [],
  });

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    const deletePromise = fetch(`/api/game?id=${deleteId}`, {
      method: "DELETE",
    });

    toast.promise(deletePromise, {
      loading: "Deleting game...",
      success: () => {
        mutate((history) => {
          if (history) {
            return history.filter((h) => h.id !== id);
          }
        });
        return "Game successfully deleted";
      },
      error: "Failed to delete game",
    });

    setShowDeleteDialog(false);

    if (deleteId === id) {
      router.push("/");
    }
  };

  if (!user) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
            <div>
              <Link href={`/login`} onClick={() => setOpenMobile(false)}>
                <strong className="text-blue-400">Login </strong>
              </Link>
              to save and revisit previous game history!
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
          Today
        </div>
        <SidebarGroupContent>
          <div className="flex flex-col">
            {[44, 32, 28, 64, 52].map((item) => (
              <div
                key={item}
                className="rounded-md h-8 flex gap-2 px-2 items-center"
              >
                <div
                  className="h-4 rounded-md flex-1 max-w-[--skeleton-width] bg-sidebar-accent-foreground/10"
                  style={
                    {
                      "--skeleton-width": `${item}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (history?.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <div className="text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
            <div>
              Your game history will appear here once you start playing!
            </div>
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  const groupGamesByDate = (games: UserGame[]): GroupedGames => {
    const now = new Date();
    const oneWeekAgo = subWeeks(now, 1);
    const oneMonthAgo = subMonths(now, 1);

    return games.reduce(
      (groups, game) => {
        const gameDate = new Date(game.played_at!);

        if (isToday(gameDate)) {
          groups.today.push(game);
        } else if (isYesterday(gameDate)) {
          groups.yesterday.push(game);
        } else if (gameDate > oneWeekAgo) {
          groups.lastWeek.push(game);
        } else if (gameDate > oneMonthAgo) {
          groups.lastMonth.push(game);
        } else {
          groups.older.push(game);
        }

        return groups;
      },
      {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        older: [],
      } as GroupedGames
    );
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {history &&
              (() => {
                const groupedGames = groupGamesByDate(history);

                return (
                  <>
                    {groupedGames.today.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
                          Today
                        </div>
                        {groupedGames.today.map((user_game, ind) => (
                          <div key={user_game.id}>
                            <GameItem
                              key={user_game.id}
                              user_game={user_game}
                              game_images={[
                                "https://media.istockphoto.com/id/2124781220/vector/mosaic-font-green-alphabet-letters-and-numbers.jpg?s=1024x1024&w=is&k=20&c=QdzVCQu_b42k6JrTfGoTpU-KCAPWRK9fb5S29aTpPxk=",
                              ]}
                              isActive={user_game.id === id}
                              onDelete={(gameId: any) => {
                                setDeleteId(gameId);
                                setShowDeleteDialog(true);
                              }}
                              setOpenMobile={setOpenMobile}
                            />
                            {ind < groupedGames.today.length - 1 && (
                              <SidebarSeparator />
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {groupedGames.yesterday.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs text-sidebar-foreground/50 mt-6">
                          Yesterday
                        </div>
                        {groupedGames.yesterday.map((user_game, ind) => (
                          <div key={user_game.id}>
                            <GameItem
                              key={user_game.id}
                              user_game={user_game}
                              game_images={[
                                "https://media.istockphoto.com/id/2124781220/vector/mosaic-font-green-alphabet-letters-and-numbers.jpg?s=1024x1024&w=is&k=20&c=QdzVCQu_b42k6JrTfGoTpU-KCAPWRK9fb5S29aTpPxk=",
                              ]}
                              isActive={user_game.id === id}
                              onDelete={(user_gameId: any) => {
                                setDeleteId(user_gameId);
                                setShowDeleteDialog(true);
                              }}
                              setOpenMobile={setOpenMobile}
                            />
                            {ind < groupedGames.yesterday.length - 1 && (
                              <SidebarSeparator />
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {groupedGames.lastWeek.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs text-sidebar-foreground/50 mt-6">
                          Last 7 days
                        </div>
                        {groupedGames.lastWeek.map((user_game, ind) => (
                          <div key={user_game.id}>
                            <GameItem
                              key={user_game.id}
                              user_game={user_game}
                              game_images={[
                                "https://media.istockphoto.com/id/2124781220/vector/mosaic-font-green-alphabet-letters-and-numbers.jpg?s=1024x1024&w=is&k=20&c=QdzVCQu_b42k6JrTfGoTpU-KCAPWRK9fb5S29aTpPxk=",
                              ]}
                              isActive={user_game.id === id}
                              onDelete={(gameId: any) => {
                                setDeleteId(gameId);
                                setShowDeleteDialog(true);
                              }}
                              setOpenMobile={setOpenMobile}
                            />
                            {ind < groupedGames.lastWeek.length - 1 && (
                              <SidebarSeparator />
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {groupedGames.lastMonth.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs text-sidebar-foreground/50 mt-6">
                          Last 30 days
                        </div>
                        {groupedGames.lastMonth.map((user_game, ind) => (
                          <div key={user_game.id}>
                            <GameItem
                              key={user_game.id}
                              user_game={user_game}
                              game_images={[
                                "https://media.istockphoto.com/id/2124781220/vector/mosaic-font-green-alphabet-letters-and-numbers.jpg?s=1024x1024&w=is&k=20&c=QdzVCQu_b42k6JrTfGoTpU-KCAPWRK9fb5S29aTpPxk=",
                              ]}
                              isActive={user_game.id === id}
                              onDelete={(gameId: any) => {
                                setDeleteId(gameId);
                                setShowDeleteDialog(true);
                              }}
                              setOpenMobile={setOpenMobile}
                            />
                            {ind < groupedGames.lastMonth.length - 1 && (
                              <SidebarSeparator />
                            )}
                          </div>
                        ))}
                      </>
                    )}

                    {groupedGames.older.length > 0 && (
                      <>
                        <div className="px-2 py-1 text-xs text-sidebar-foreground/50 mt-6">
                          Older
                        </div>
                        {groupedGames.older.map((user_game, ind) => (
                          <div key={user_game.id}>
                            <GameItem
                              key={user_game.id}
                              user_game={user_game}
                              game_images={[
                                "https://media.istockphoto.com/id/2124781220/vector/mosaic-font-green-alphabet-letters-and-numbers.jpg?s=1024x1024&w=is&k=20&c=QdzVCQu_b42k6JrTfGoTpU-KCAPWRK9fb5S29aTpPxk=",
                              ]}
                              isActive={user_game.id === id}
                              onDelete={(gameId: any) => {
                                setDeleteId(gameId);
                                setShowDeleteDialog(true);
                              }}
                              setOpenMobile={setOpenMobile}
                            />
                            {ind < groupedGames.lastMonth.length - 1 && (
                              <SidebarSeparator />
                            )}
                          </div>
                        ))}
                      </>
                    )}
                  </>
                );
              })()}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
