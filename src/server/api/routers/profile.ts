import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "~/server/db";
import { ProfileCreateWithoutUserInputSchema } from "prisma/generated/zod";

export const profileRouter = createTRPCRouter({
  create: protectedProcedure
    .input(ProfileCreateWithoutUserInputSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const profile = await db.profile.create({
        data: { ...input, userID: userId },
      });
      return profile;
    }),
  getByID: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      const { input } = opts;
      return await db.profile.findUnique({
        where: { id: input.id },
      });
    }),
});
