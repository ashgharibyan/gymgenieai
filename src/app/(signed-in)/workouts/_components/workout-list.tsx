"use client";

import { Box, Title } from "@mantine/core";
import React from "react";
import WorkoutCard from "./workout-card";

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

export default function WorkoutList(props: {
  workoutPlan: WorkoutPlanWithWorkouts;
}) {
  const { workoutPlan } = props;
  return (
    <Box px="lg">
      <Title mb="xl"> Your Personalized Workout Plan</Title>
      {workoutPlan.workouts.map((workout) => (
        <WorkoutCard key={workout.id} workoutDay={workout} />
      ))}
    </Box>
  );
}
