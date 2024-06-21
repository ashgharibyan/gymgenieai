"use client";

import {
  Box,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { type Goal } from "@prisma/client";
import React, { useState } from "react";
import { GoalForm } from "./goal-form";
import { StatCard } from "./stat-card";
import {
  IconClock,
  IconMapPin,
  IconRun,
  IconScaleOutline,
  IconTarget,
} from "@tabler/icons-react";
import {
  locationPreferenceReverseMapping,
  primaryGoalReverseMapping,
  workoutDurationReverseMapping,
  workoutFrequencyReverseMapping,
} from "~/app/types/goal-types";

export default function GoalDisplay(props: { goal: Goal }) {
  const { goal } = props;
  const [openUpdateGoal, setOpenUpdateGoal] = useState(false);
  const goalInfo = [
    {
      title: "Goal Type",
      value: primaryGoalReverseMapping[goal.goalType],
      icon: IconTarget,
    },
    {
      title: "Target Weight",
      value: goal.targetWeight.toString() + " lb",
      icon: IconScaleOutline,
    },
    {
      title: "Workout Frequency",
      value: workoutFrequencyReverseMapping[goal.workoutFrequency],
      icon: IconRun,
    },
    {
      title: "Workout Duration",
      value: workoutDurationReverseMapping[goal.workoutDuration],
      icon: IconClock,
    },
    {
      title: "Location Preference",
      value: locationPreferenceReverseMapping[goal.locationPreference],
      icon: IconMapPin,
    },
  ];
  return (
    <Box>
      {openUpdateGoal ? (
        <GoalForm goal={goal} profileId={goal.profileId} />
      ) : (
        <Box mx="xl">
          <Group justify="space-between" align="center" mb="xl">
            <Flex direction="column">
              <Title order={1} fw={700}>
                Current Goal
              </Title>
              <Text c="dimmed">Your goal information</Text>
            </Flex>
            <Button onClick={() => setOpenUpdateGoal(true)}>Edit Goal</Button>
          </Group>
          <SimpleGrid mt="xl" cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
            {goalInfo.map((info) => (
              <StatCard
                key={info.title}
                title={info.title}
                value={info.value}
                icon={info.icon}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}
