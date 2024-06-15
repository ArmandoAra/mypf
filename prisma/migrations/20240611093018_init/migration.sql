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
    "date" DATETIME NOT NULL,
    CONSTRAINT "Spend_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "Month" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Spend" ("amount", "date", "description", "id", "monthId", "service", "type") SELECT "amount", "date", "description", "id", "monthId", "service", "type" FROM "Spend";
DROP TABLE "Spend";
ALTER TABLE "new_Spend" RENAME TO "Spend";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
