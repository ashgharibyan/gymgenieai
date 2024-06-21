import { GoalCreateManyInputSchema } from "prisma/generated/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { z } from "zod";

export const goalRouter = createTRPCRouter({
  create: protectedProcedure
    .input(GoalCreateManyInputSchema)
    .mutation(async ({ input }) => {
      const goal = await db.goal.create({ data: input });
      return goal;
    }),

  update: protectedProcedure
    .input(GoalCreateManyInputSchema)
    .mutation(async ({ input }) => {
      const { id } = input;
      const goal = await db.goal.update({ where: { id }, data: input });
      return goal;
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input;

      const goal = await db.goal.findUnique({
        where: { id },
      });
      return goal;
    }),
  getByProfileId: protectedProcedure
    .input(z.object({ profileId: z.number() }))
    .query(async ({ input }) => {
      const { profileId } = input;

      const goal = await db.goal.findUnique({
        where: { profileId: profileId },
        include: { profile: true, progress: true },
      });
      return goal;
    }),
});
