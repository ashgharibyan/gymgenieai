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

      type responseType =
        | {
            workoutPlan: {
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
        workoutPlan: [
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
    `;

      console.log("--------------------------");
      console.log(profile);
      console.log("--------------------------");
      console.log(goal);
      console.log("--------------------------");

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
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
        temperature: 0.2,
      });

      const content = response.choices[0]?.message.content;
      const obj: responseType =
        content && (JSON.parse(content) as responseType);
      return obj;
    }),
});
