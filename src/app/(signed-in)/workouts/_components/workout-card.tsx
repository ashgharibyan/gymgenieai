"use client";

import { Blockquote, Card, Flex, Group, Title } from "@mantine/core";
import { IconCalendarWeek, IconInfoCircle } from "@tabler/icons-react";
import React from "react";
import ExercisesCard from "./exercises-card";

type WorkoutDayWithExercises = {
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
};

export default function WorkoutCard(props: {
  workoutDay: WorkoutDayWithExercises;
}) {
  const { workoutDay } = props;

  if (workoutDay.workoutType === "Rest Day") {
    return (
      <Card shadow="md" p={0} mb="md" bg="gray">
        <Group justify="space-between" p="md">
          <Flex justify="center" align="center" gap="md">
            <IconCalendarWeek size={24} />
            <Title order={3}>{workoutDay.day}</Title>
          </Flex>
          <Title order={4}>{workoutDay.workoutType}</Title>
        </Group>
      </Card>
    );
  }

  return (
    <Card shadow="md" mb="md" p={0}>
      <Group justify="space-between" bg="primary.5" p="md">
        <Flex justify="center" align="center" gap="md">
          <IconCalendarWeek size={24} color="white" />
          <Title order={3} c="white">
            {workoutDay.day}
          </Title>
        </Flex>
        <Title order={4} c="white">
          {workoutDay.workoutType}
        </Title>
      </Group>
      <ExercisesCard exercises={workoutDay.exercises} />
      <Blockquote color="blue" icon={<IconInfoCircle />} m="xl">
        {workoutDay.notes}
      </Blockquote>
    </Card>
  );
}
