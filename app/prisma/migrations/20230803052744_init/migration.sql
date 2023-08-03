-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "floorSale" JSONB NOT NULL,
    "floorSaleChange" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColectionsSet" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ColectionsSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ColectionsSetToCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_ColectionsSetToCollection_AB_unique" ON "_ColectionsSetToCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_ColectionsSetToCollection_B_index" ON "_ColectionsSetToCollection"("B");

-- AddForeignKey
ALTER TABLE "_ColectionsSetToCollection" ADD CONSTRAINT "_ColectionsSetToCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "ColectionsSet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColectionsSetToCollection" ADD CONSTRAINT "_ColectionsSetToCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
