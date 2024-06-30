import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

import OpenAI from "openai";
import { GoalSchema, ProfileSchema } from "prisma/generated/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
  organization: process.env.OPENAI_ORG_ID,
});

export const openaiRouter = createTRPCRouter({
  generateWorkout: protectedProcedure
    .input(z.object({ profile: ProfileSchema, goal: GoalSchema }))
    .query(async ({ input }) => {
      const { profile, goal } = input;

      console.log("PROFILE", profile);
      console.log("GOAL", goal);
      type responseType =
        | {
            workouts: {
              day: string;
              workoutType: string;
              exercises: {
                name: string;
                sets: number;
                reps: string;
              }[];
              notes: string;
            }[];
          }
        | null
        | undefined
        | "";

      const exampleJSON: responseType = {
        workouts: [
          {
            day: "day of the week",
            workoutType: "workout type",
            exercises: [
              {
                name: "Treadmill Running",
                sets: 1,
                reps: "30 minutes",
              },
              {
                name: "Elliptical Machine",
                sets: 1,
                reps: "15 minutes",
              },
            ],
            notes: "Start with a 5-minute warm-up walk.",
          },
        ],
      };

      const systemContent = `
            Generate a workout recommendation for a user based on their profile and goal. The response should be structured in a JSON format. Here are the details:

            **User Profile:**
            - Age: ${profile.age}
            - Gender: ${profile.gender}
            - Height: ${profile.height} (in cm)
            - Weight: ${profile.weight} (in kg)
            - Activity Level: ${profile.activityLevel}
            - Exercise Experience: ${profile.exerciseExperience}

            **User Goal:**
            - Goal Type: ${goal.goalType}
            - Target Weight: ${goal.targetWeight} (in kg)
            - Workout Frequency: ${goal.workoutFrequency}  a week
            - Workout Duration: ${goal.workoutDuration} per session
            - Location Preference: ${goal.locationPreference}

            Provide a detailed workout plan that includes the following information:
            1. Day of the week
            2. Type of workout (e.g., Cardio, Strength Training, Flexibility)
            3. Specific exercises (with exact gym exercise names)
            4. Number of sets and reps
            5. Any additional tips or notes

            Make sure to cover all the muscle areas split in the week (Back, Chest, Biceps, Triceps ...). Make sure that the total duration of those exercises are approximately the workout duration. Make sure you only split it to how many days are mentioned in the Workout Frequency by the user during the week. Do not give more days then the user mentioned in the Workout Frequency.

            If there are empty days, you can fill them with rest days and nothing else. If possible based on the schedule, put the rest days inbetween and not one after the other. DO NOT put the rest days one after the other. Make sure to include a warm-up and cool-down routine in each workout session. Make sure to include a variety of exercises to target different muscle groups. Make sure to include the number of sets and reps for each exercise. Make sure to include any additional tips or notes for the user. Make sure to include the type of workout for each day (e.g., Cardio, Strength Training, Flexibility, etc.). Make sure to include the exact gym exercise names for each exercise.
    `;

      console.log("IN OPENAI ROUTER");
      const response = await openai.chat.completions
        .create({
          model: "gpt-4o-2024-05-13",
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "You are a gym trainer. You are going to give a workout plan based on the user's details. Give the response in valid JSON format" +
                "The data schema should look like this: " +
                JSON.stringify(exampleJSON),
            },
            { role: "user", content: systemContent },
          ],
          temperature: 0.5,
        })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error(err);
          throw new Error("Error in chat completion");
        });

      const content = response.choices[0]?.message.content;
      const obj: responseType =
        content && (JSON.parse(content) as responseType);
      console.log("_____________________________");
      console.log("_____________________________");
      console.log("_____________________________");
      console.log("_____________________________");
      console.log(obj);
      return obj;
    }),
});
