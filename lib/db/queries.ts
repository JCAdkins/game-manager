import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { and, /*asc, desc,*/ eq /*gt, gte*/ } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  user,
  type User,
  game,
  type Game,
  userGame,
  type UserGame,
} from "./schema";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.
const client = postgres(process.env.POSTGRES_URL!);
const db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(
  email: string,
  password: string,
  username: string,
  first_name: string,
  last_name: string
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);
  const created_at = new Date();
  const last_login = new Date();

  try {
    return await db.insert(user).values({
      email,
      password: hash,
      username,
      first_name,
      last_name,
      created_at,
      last_login,
    });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function getGameByTitleAndDev(
  title: string,
  developer: string
): Promise<Array<Game>> {
  try {
    return await db
      .select()
      .from(game)
      .where(and(eq(game.title, title), eq(game.developer, developer)));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function getGameById(id: string): Promise<Array<Game>> {
  try {
    return await db.select().from(game).where(eq(game.id, id));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createGame(
  title: string,
  description: string,
  genre: string,
  developer: string,
  platform: string,
  version: string,
  screenshots: string[]
) {
  try {
    return await db.insert(game).values({
      title,
      description,
      genre,
      developer,
      platform,
      version,
      screenshots,
    });
  } catch (error) {
    console.error("Failed to create game in database.");
    throw error;
  }
}

export async function getUserGame(
  userId: string,
  gameId: string
): Promise<Array<UserGame>> {
  try {
    return await db
      .select()
      .from(userGame)
      .where(and(eq(userGame.user_id, userId), eq(userGame.game_id, gameId)));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUserGame(
  user_id: string,
  game_id: string,
  score: number,
  metadata: JSON[]
) {
  try {
    return await db.insert(userGame).values({
      user_id,
      game_id,
      score,
      metadata,
    });
  } catch (error) {
    console.error("Failed to create game in database.");
    throw error;
  }
}
