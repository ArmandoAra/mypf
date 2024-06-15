/*
  Warnings:

  - You are about to drop the `MonthIncome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthSpend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MonthIncome";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MonthSpend";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Year" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Month" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "yearId" INTEGER NOT NULL,
    "month" TEXT NOT NULL,
    "brutIncome" REAL NOT NULL,
    CONSTRAINT "Month_yearId_fkey" FOREIGN KEY ("yearId") REFERENCES "Year" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Spend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monthId" INTEGER NOT NULL,
    "service" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "Spend_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
