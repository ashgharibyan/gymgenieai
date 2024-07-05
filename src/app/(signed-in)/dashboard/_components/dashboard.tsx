"use client";

import React from "react";
import { WorkoutPlan, type Goal, type Profile } from "@prisma/client";
import {
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
      <SimpleGrid cols={3} mt="lg">
        <Paper
          shadow="md"
          radius="lg"
          withBorder
          p="xl"
          bg="primary.3"
          c="white"
          fw={900}
          fz="h2"
        >
          Profile
        </Paper>
        <Paper
          shadow="md"
          radius="lg"
          withBorder
          p="xl"
          bg="primary.4"
          c="white"
          fw={900}
          fz="h2"
        >
          Goal
        </Paper>
        <Paper
          shadow="md"
          radius="lg"
          withBorder
          p="xl"
          bg="primary.5"
          c="white"
          fw={900}
          fz="h2"
        >
          Workout Plan
        </Paper>
      </SimpleGrid>
      <SimpleGrid cols={3} mt="lg">
        <Stack>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>Age: {profile.age} years old</Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>Weight: {profile.weight} lb</Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>Height: {profile.height} cm</Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>
                Activity Level:{" "}
                {activityLevelReverseMapping[profile.activityLevel]}
              </Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
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
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>
                Location Preference:{" "}
                {locationPreferenceReverseMapping[goal.locationPreference]}
              </Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>Target Weight: {goal.targetWeight} lbs</Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>
                Workout Duration:{" "}
                {workoutDurationReverseMapping[goal.workoutDuration]}
              </Title>
            </Stack>
          </Paper>
          <Paper shadow="md" radius="lg" withBorder p="xl">
            <Stack gap={0}>
              <Title order={4}>
                Workout Frequency:{" "}
                {workoutFrequencyReverseMapping[goal.workoutFrequency]}
              </Title>
            </Stack>
          </Paper>
        </Stack>
        <Stack>
          {workoutPlan.workouts.map((workout, idx) => (
            <Paper
              key={idx}
              shadow="md"
              radius="lg"
              withBorder
              p="xl"
              bg={workout.workoutType === "Rest Day" ? "gray" : "white"}
            >
              <Stack gap={0}>
                <Title order={4}>
                  {workout.day}: {workout.workoutType}
                </Title>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </SimpleGrid>
    </Box>
  );
}
