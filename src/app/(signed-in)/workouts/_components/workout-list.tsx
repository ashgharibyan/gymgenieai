"use client";

import { Box, Group, Title } from "@mantine/core";
import React from "react";
import WorkoutCard from "./workout-card";
import GenerateWorkoutButton from "./generate-workout-button";
import { type Goal, type Profile } from "@prisma/client";

type WorkoutPlanWithWorkouts = {
  id: number;
  profileId: number;
  workouts: {
    id: number;
    day: string;
    workoutType: string;
    exercises: {
      id: number;
      name: string;
      sets: number;
      reps: string;
    }[];
    notes: string;
  }[];
};
type ProfileWithWorkoutPlan = Profile & {
  workoutPlan: {
    id: number;
  } | null;
};
export default function WorkoutList(props: {
  workoutPlan: WorkoutPlanWithWorkouts;
  profile: ProfileWithWorkoutPlan | undefined;
  goal: Goal | undefined;
}) {
  const { workoutPlan, profile, goal } = props;
  return (
    <Box px="lg">
      <Group justify="space-between" align="center" mb="lg">
        <Title> Your Personalized Workout Plan</Title>
        <GenerateWorkoutButton profile={profile} goal={goal} update={true} />
      </Group>
      {workoutPlan.workouts.map((workout) => (
        <WorkoutCard key={workout.id} workoutDay={workout} />
      ))}
    </Box>
  );
}
