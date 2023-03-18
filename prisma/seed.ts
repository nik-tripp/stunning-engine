/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';
import kitSample from './KITS_SHIPPING_DATA';

const prisma = new PrismaClient();

async function main() {
  for (const sample of kitSample) {
    const dbFriendlySampleData = {
      labelId: sample.label_id,
      shippingTrackingCode: sample.shipping_tracking_code,
    };

    await prisma.kitShipment.upsert({
      where: {
        id: sample.id,
      },
      update: dbFriendlySampleData,
      create: dbFriendlySampleData,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
