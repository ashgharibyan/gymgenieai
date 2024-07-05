"use client";

import React from "react";
import { type Goal, type Profile } from "@prisma/client";
import {
  Anchor,
  Box,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  activityLevelReverseMapping,
  exerciseExperienceReverseMapping,
} from "~/app/types/general-types";
import {
  locationPreferenceReverseMapping,
  primaryGoalReverseMapping,
  workoutDurationReverseMapping,
  workoutFrequencyReverseMapping,
} from "~/app/types/goal-types";

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

export default function Dashboard(props: {
  profile: Profile;
  goal: Goal;
  workoutPlan: WorkoutPlanWithWorkouts;
  username: string;
}) {
  const { profile, goal, workoutPlan, username } = props;

  return (
    <Box>
      <Group justify="space-between">
        <Title order={2}>Dashboard</Title>
        <Text>Welcome {username}</Text>
      </Group>
      <SimpleGrid cols={2} mt="lg">
        <Paper shadow="md" radius="lg" withBorder p="xl" bg="primary.3">
          <Group justify="space-between">
            <Title order={2} fw={900} c="white">
              Profile
            </Title>
            <Anchor href="/profile" c="white">
              View Profile
            </Anchor>
          </Group>
        </Paper>
        <Paper shadow="md" radius="lg" withBorder p="xl" bg="primary.4">
          <Group justify="space-between">
            <Title order={2} fw={900} c="white">
              Goal
            </Title>
            <Anchor href="/goal" c="white">
              View Goal
            </Anchor>
          </Group>
        </Paper>
      </SimpleGrid>
      <SimpleGrid cols={2} mt="lg">
        <Stack>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>Age: {profile.age} years old</Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>Weight: {profile.weight} lb</Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>Height: {profile.height} cm</Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>
                Activity Level:{" "}
                {activityLevelReverseMapping[profile.activityLevel]}
              </Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>
                Experience:{" "}
                {exerciseExperienceReverseMapping[profile.exerciseExperience]}
              </Title>
            </Stack>
          </Paper>
        </Stack>
        <Stack>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>
                Goal: {primaryGoalReverseMapping[goal.goalType]}
              </Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>
                Location Preference:{" "}
                {locationPreferenceReverseMapping[goal.locationPreference]}
              </Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>Target Weight: {goal.targetWeight} lbs</Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>
                Workout Duration:{" "}
                {workoutDurationReverseMapping[goal.workoutDuration]}
              </Title>
            </Stack>

            <Stack gap={0}>
              <Title order={4}>
                Workout Frequency:{" "}
                {workoutFrequencyReverseMapping[goal.workoutFrequency]}
              </Title>
            </Stack>
          </Paper>
        </Stack>
      </SimpleGrid>
      <Paper
        mt="xl"
        shadow="md"
        radius="lg"
        withBorder
        p="xl"
        bg="primary.5"
        c="white"
        fw={900}
        fz="h2"
      >
        <Group justify="space-between">
          <Title order={2} fw={900}>
            Workout Plan
          </Title>
          <Anchor href="/workouts" c="white">
            View Workout Plan
          </Anchor>
        </Group>
        <Stack>
          <SimpleGrid cols={2} mt="md">
            {workoutPlan.workouts.map((workout, idx) => (
              <Paper
                key={idx}
                shadow="md"
                radius="md"
                withBorder
                p="md"
                c="black"
              >
                <Title order={4}>
                  {workout.day}: {workout.workoutType}
                </Title>
              </Paper>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper>
    </Box>
  );
}
