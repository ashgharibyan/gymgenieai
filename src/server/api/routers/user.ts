import { z } from "zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { UserCreateManyInputSchema } from "prisma/generated/zod";

const byUserId = async (userId: string) => {
  // Retrieve the user with the given ID
  const user = await db.user.findUnique({
    where: { id: userId },
  });
  return user;
};

export const userRouter = createTRPCRouter({
  userById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      // Retrieve the user with the given ID
      return byUserId(input.id);
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
