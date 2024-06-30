import { profile } from "console";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { db } from "~/server/db";

export const workoutPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        profileId: z.number(),
        workouts: z.array(
          z.object({
            day: z.string(),
            workoutType: z.string(),
            exercises: z.array(
              z.object({
                name: z.string(),
                sets: z.number(),
                reps: z.string(),
              })
            ),
            notes: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userID = ctx.session.user.id;

      const workoutDays = input.workouts;

      const workouts = {
        workouts: {
          create: workoutDays.map((workout) => ({
            day: workout.day,
            workoutType: workout.workoutType,
            exercises: {
              create: workout.exercises.map((exercise) => ({
                name: exercise.name,
                sets: exercise.sets,
                reps: exercise.reps,
              })),
            },
            notes: workout.notes,
          })),
        },
      };

      const workoutPlan = await db.workoutPlan.create({
        data: {
          ...workouts,
          profileId: input.profileId,
        },
        include: {
          workouts: {
            include: {
              exercises: true,
            },
          },
        },
      });

      return workoutPlan;
    }),
});
