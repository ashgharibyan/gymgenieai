import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { UserCreateManyInputSchema } from "prisma/generated/zod";

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      // Retrieve the user with the given ID
      return await db.user.findUnique({
        where: { id: input.id },
      });
    }),
  getByIdWithProfile: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return await db.user.findUnique({
        where: { id: input.id },
        include: {
          profile: {
            include: {
              goal: true,
              workoutPlan: {
                include: {
                  workouts: {
                    include: {
                      exercises: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  userCreate: publicProcedure
    .input(UserCreateManyInputSchema)
    .mutation(async (opts) => {
      const { input } = opts;

      // Create a new user in the database
      const user = await db.user.create({ data: input });
      return user;
    }),
});
