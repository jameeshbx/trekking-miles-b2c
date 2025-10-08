/*
  Warnings:

  - Added the required column `userId` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Trek` table without a default value. This is not possible if the table is not empty.

*/

-- First, add the columns as nullable
ALTER TABLE "Destination" ADD COLUMN     "userId" TEXT;
ALTER TABLE "Event" ADD COLUMN     "userId" TEXT;
ALTER TABLE "Trek" ADD COLUMN     "userId" TEXT;

-- Get the first admin user or create one if none exists
DO $$
DECLARE
    admin_user_id TEXT;
BEGIN
    -- Try to get the first admin user
    SELECT id INTO admin_user_id FROM "User" WHERE role = 'ADMIN' LIMIT 1;
    
    -- If no admin exists, create one
    IF admin_user_id IS NULL THEN
        INSERT INTO "User" (id, name, email, role, status, "createdAt", "updatedAt")
        VALUES (
            'admin-migration-user',
            'System Admin',
            'admin@trekkingmiles.com',
            'ADMIN',
            'ACTIVE',
            NOW(),
            NOW()
        );
        admin_user_id := 'admin-migration-user';
    END IF;
    
    -- Update existing records to use the admin user
    UPDATE "Destination" SET "userId" = admin_user_id WHERE "userId" IS NULL;
    UPDATE "Event" SET "userId" = admin_user_id WHERE "userId" IS NULL;
    UPDATE "Trek" SET "userId" = admin_user_id WHERE "userId" IS NULL;
END $$;

-- Now make the columns NOT NULL
ALTER TABLE "Destination" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "Event" ALTER COLUMN "userId" SET NOT NULL;
ALTER TABLE "Trek" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Destination" ADD CONSTRAINT "Destination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trek" ADD CONSTRAINT "Trek_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
