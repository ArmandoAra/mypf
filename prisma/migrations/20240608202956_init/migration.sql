/*
  Warnings:

  - You are about to drop the column `netIncome` on the `MonthIncome` table. All the data in the column will be lost.
  - You are about to drop the column `umst` on the `MonthIncome` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MonthIncome" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brutIncome" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_MonthIncome" ("brutIncome", "createdAt", "id", "month", "updatedAt", "year") SELECT "brutIncome", "createdAt", "id", "month", "updatedAt", "year" FROM "MonthIncome";
DROP TABLE "MonthIncome";
ALTER TABLE "new_MonthIncome" RENAME TO "MonthIncome";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
