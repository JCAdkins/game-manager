import { GameCard } from "@/components/game-card";
import { auth } from "../../(auth)/auth";

const AdminDashboard = async () => {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    return null;
  }

  const prop = {
    game_title: "Snake",
    game_id: "34209fec09-ab64",
    game_images: [
      "https://www.coolmathgames.com/sites/default/files/snake.png",
      "",
    ],
    user_score: null,
    game_description: "The classic arcade version of snake.",
  };

  const gamesList = [
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
    { ...prop },
  ];

  return (
    <div className="w-full h-full mx-auto">
      <h2 className="sticky top-0 bg-accent text-foreground/50 text-center p-2 z-50">
        This is the admin dashboard.
      </h2>
      <div className="w-full h-[1px] bg-background/50" />
      <div className="justify-evenly mt-10 flex flex-wrap items-center gap-x-8 gap-y-10 sm:gap-x-10 lg:mx-0 lg:max-w-none">
        {gamesList.map((game, ind) => {
          return (
            <div
              key={ind}
              className="shadow-customYP col-span-2 h-fit w-fit bg-opacity-0 object-contain lg:col-span-1 rounded-lg hover:shadow-customGI hover:cursor-pointer"
            >
              <GameCard
                className="bg-foreground/5  text-foreground/50"
                {...game}
              ></GameCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;
