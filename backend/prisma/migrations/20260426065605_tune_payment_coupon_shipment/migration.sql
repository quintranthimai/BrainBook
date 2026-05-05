/*
  Warnings:

  - A unique constraint covering the columns `[couponId,userId]` on the table `CouponUsage` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalReference]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `status` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'FAILED');

-- DropIndex
DROP INDEX "Payment_externalReference_idx";

-- DropIndex
DROP INDEX "Payment_orderId_externalReference_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD';

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "status",
ADD COLUMN     "status" "ShipmentStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CouponUsage_couponId_userId_key" ON "CouponUsage"("couponId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_externalReference_key" ON "Payment"("externalReference");
