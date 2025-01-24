// import { metadata } from "@/app/layout";
import type { InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  text,
  jsonb,
  timestamp,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull(),
  username: varchar("username", { length: 32 }).notNull(),
  password: varchar("password", { length: 64 }),
  first_name: varchar("first-name", { length: 32 }),
  last_name: varchar("last-name", { length: 32 }),
  role: varchar("role").notNull(),
  // profile_image: varchar("profile_picture", { length: 256 }),
  created_at: timestamp("created_at").defaultNow(),
  last_login: timestamp("last_login"),
});

export type User = InferSelectModel<typeof user>;

export const game = pgTable("Game", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  genre: varchar("genre", { length: 50 }),
  release_date: timestamp("release_date").defaultNow(),
  developer: varchar("developer", { length: 100 }),
  platform: varchar("platform", { length: 50 }),
  version: varchar("version", { length: 10 }),
  play_count: integer("play_count").default(0),
  high_score: integer("high_score").default(0),
  screenshots: jsonb("screenshots"), // Array of image URLs
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export type Game = InferSelectModel<typeof game>;

// Create the user_games relationship table
export const userGame = pgTable("UserGame", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => user.id), // foreign key to users table
  game_id: uuid("game_id")
    .notNull()
    .references(() => game.id), // foreign key to games table
  game_title: varchar("game_title", { length: 100 }).notNull(),
  played_at: timestamp("played_at").defaultNow(),
  score: integer("score"), // Optional: score tracking if you want
  metadata: jsonb("metadata"),
});

export type UserGame = InferSelectModel<typeof userGame>;
