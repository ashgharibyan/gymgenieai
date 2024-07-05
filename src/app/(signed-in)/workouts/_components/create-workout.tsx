"use client";

import { Container, Stack, Title } from "@mantine/core";
import { type Goal, type Profile } from "@prisma/client";
import React from "react";
import GenerateWorkoutButton from "./generate-workout-button";

type ProfileWithWorkoutPlan = Profile & {
  workoutPlan: {
    id: number;
  } | null;
};

export default function CreateWorkout(props: {
  profile: ProfileWithWorkoutPlan | undefined;
  goal: Goal | undefined;
}) {
  const { profile, goal } = props;

  return (
    <Container>
      <Stack align="center" mt="xl">
        <Title>No Workouts Yet</Title>
        <GenerateWorkoutButton profile={profile} goal={goal} update={false} />
      </Stack>
    </Container>
  );
}
