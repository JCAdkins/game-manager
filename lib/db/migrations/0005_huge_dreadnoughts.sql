-- Step 1: Create a new column of type text[]
ALTER TABLE "Game" ADD COLUMN "screenshots_temp" text[] DEFAULT ARRAY[]::text[];

-- Step 2: Migrate existing jsonb data into text[] format
UPDATE "Game"
SET "screenshots_temp" = (
  SELECT ARRAY(
    SELECT jsonb_array_elements_text("screenshots")  -- Converts jsonb array to text array
  )
);

-- Step 3: Drop the old jsonb column
ALTER TABLE "Game" DROP COLUMN "screenshots";

-- Step 4: Rename the new column to `screenshots`
ALTER TABLE "Game" RENAME COLUMN "screenshots_temp" TO "screenshots";
