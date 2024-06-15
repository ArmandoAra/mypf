-- CreateTable
CREATE TABLE "MonthSpend" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "incomeId" INTEGER NOT NULL,
    CONSTRAINT "MonthSpend_incomeId_fkey" FOREIGN KEY ("incomeId") REFERENCES "MonthIncome" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MonthIncome" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "month" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "brutIncome" REAL NOT NULL,
    "netIncome" REAL NOT NULL,
    "umst" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
