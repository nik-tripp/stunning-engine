-- CreateTable
CREATE TABLE "KitShipment" (
    "id" SERIAL NOT NULL,
    "labelId" TEXT NOT NULL,
    "shippingTrackingCode" TEXT NOT NULL,

    CONSTRAINT "KitShipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KitShipment_labelId_key" ON "KitShipment"("labelId");

-- CreateIndex
CREATE UNIQUE INDEX "KitShipment_shippingTrackingCode_key" ON "KitShipment"("shippingTrackingCode");
