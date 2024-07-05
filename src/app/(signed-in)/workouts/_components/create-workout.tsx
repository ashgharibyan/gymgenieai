"use client";

import { Container, Stack, Text, Title } from "@mantine/core";
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
      <Stack mt="md" gap="lg">
        <Title ta="center" order={2}>
          You don&apos;t have a workout plan.
        </Title>
        <Text ta="center">
          Please press &quot;Generate Workout Plan&quot; to generate a workout
          plan tailored for your profile and goal.
        </Text>
        <Stack gap="xs">
          <GenerateWorkoutButton profile={profile} goal={goal} update={false} />
          <Text ta="center" c="dimmed">
            This might take some time, as our Open AI powered system will
            generate your plan to fitness success. Please be patient.
          </Text>
        </Stack>
      </Stack>
    </Container>
  );
}
