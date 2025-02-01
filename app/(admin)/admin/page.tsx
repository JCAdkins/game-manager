"use server";

import { GameCard } from "@/components/game-card";
// import { auth } from "../../(auth)/auth";
import { CardContainer } from "@/components/card-container";
import { getAllGames } from "@/lib/db/queries";
import { Suspense } from "react";

const AdminDashboard = async () => {
  // const session = await auth();

  // if (!session || session.user?.role !== "admin") {
  //   return null;
  // }

  const LoadingSkeleton = () => {
    return (
      <>
        {[...Array(6)].map((_, ind) => (
          <div
            key={ind}
            className="h-44 w-64 bg-foreground/10 animate-pulse rounded-lg"
          />
        ))}
      </>
    );
  };

  const GameList = async () => {
    const list = await getAllGames(); // Fetch games from database

    return (
      <CardContainer>
        {list.map((game, ind) => (
          <GameCard
            key={game.id}
            grow_on_hover
            img_border
            className="bg-foreground/5 transition-transform duration-100 ease-in-out will-change-transform text-foreground/50 shadow-customYP hover:shadow-customGI hover:cursor-pointer"
            game={game}
          />
        ))}
      </CardContainer>
    );
  };

  const list = await getAllGames();

  return (
    <div className="w-full h-full mx-auto">
      <h2 className="sticky top-0 bg-accent text-foreground/50 text-center p-2 z-50">
        This is the admin dashboard.
      </h2>
      <CardContainer>
        <Suspense fallback={<LoadingSkeleton />}>
          <GameList />
        </Suspense>
      </CardContainer>
    </div>
  );
};

export default AdminDashboard;
