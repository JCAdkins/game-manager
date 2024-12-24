CREATE TABLE "Game" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"genre" varchar(50),
	"release_date" timestamp DEFAULT now(),
	"developer" varchar(100),
	"platform" varchar(50),
	"version" varchar(10),
	"play_count" integer DEFAULT 0,
	"high_score" integer DEFAULT 0,
	"screenshots" jsonb,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"username" varchar(32) NOT NULL,
	"password" varchar(64),
	"first-name" varchar(32),
	"last-name" varchar(32),
	"created_at" timestamp DEFAULT now(),
	"last_login" timestamp
);
--> statement-breakpoint
CREATE TABLE "UserGame" (
	"user_id" uuid NOT NULL,
	"game_id" uuid NOT NULL,
	"played_at" timestamp DEFAULT now(),
	"score" integer,
	"metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_user_id_User_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "UserGame" ADD CONSTRAINT "UserGame_game_id_Game_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."Game"("id") ON DELETE no action ON UPDATE no action;