/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { shipmentRouter } from './shipment';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  shipment: shipmentRouter,
});

export type AppRouter = typeof appRouter;
