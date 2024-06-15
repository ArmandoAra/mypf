/*
  Warnings:

  - You are about to drop the column `date` on the `Spend` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monthId" INTEGER NOT NULL,
    "service" TEXT,
    "amount" REAL,
    "type" TEXT,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Spend_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spend" ("amount", "description", "id", "monthId", "service", "type") SELECT "amount", "description", "id", "monthId", "service", "type" FROM "Spend";
DROP TABLE "Spend";
ALTER TABLE "new_Spend" RENAME TO "Spend";
CREATE INDEX "Spend_monthId_idx" ON "Spend"("monthId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
