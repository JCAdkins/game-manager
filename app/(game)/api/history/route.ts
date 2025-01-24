import { auth } from "@/app/(auth)/auth";
import { getUserGamesByUserId } from "@/lib/db/queries";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized!", { status: 401 });
  }

  // biome-ignore lint: Forbidden non-null assertion.
  const userGames = await getUserGamesByUserId({ id: session.user.id! });
  console.log(userGames);
  return Response.json(userGames);
}
