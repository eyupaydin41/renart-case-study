-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "popularityScore" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "images" JSONB NOT NULL
);
