/*
  Warnings:

  - The primary key for the `Coin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Coin` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coinGeckoId]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[portfolioId,coinId]` on the table `PortfolioHolding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "PortfolioHolding" DROP CONSTRAINT "PortfolioHolding_coinId_fkey";

-- AlterTable
ALTER TABLE "Coin" DROP CONSTRAINT "Coin_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "Coin_coinGeckoId_key" ON "Coin"("coinGeckoId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioHolding_portfolioId_coinId_key" ON "PortfolioHolding"("portfolioId", "coinId");

-- AddForeignKey
ALTER TABLE "PortfolioHolding" ADD CONSTRAINT "PortfolioHolding_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("coinGeckoId") ON DELETE RESTRICT ON UPDATE CASCADE;
