/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from "../trpc";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/prisma";

/**
 * Default selector for Post/Put/Patch.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const shipmentUpdateArgs = Prisma.validator<Prisma.KitShipmentSelect>()({
  labelId: true,
  shippingTrackingCode: true,
});

export const shipmentRouter = router({
  byId: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
    return prisma.kitShipment.findUnique({ where: input });
  }),
  byLabelId: publicProcedure
    .input(
      z.object({
        labelId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      return prisma.kitShipment.findUnique({
        where: input,
      });
    }),
  add: publicProcedure
    .input(
      z.object({
        labelId: z.string(),
        shippingTrackingCode: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return prisma.kitShipment.create({
        data: input,
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        labelId: z.string().optional(),
        shippingTrackingCode: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return prisma.kitShipment.update({
        where: { id },
        data,
      });
    }),
});
