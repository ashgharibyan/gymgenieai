"use client";

import {
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  NumberInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { type Goal } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LocationPreferenceMapping,
  LocationPreferenceOptions,
  PrimaryGoalMapping,
  PrimaryGoalOptions,
  WorkoutDurationMapping,
  WorkoutDurationOptions,
  WorkoutFrequencyMapping,
  WorkoutFrequencyOptions,
  locationPreferenceReverseMapping,
  primaryGoalReverseMapping,
  workoutDurationReverseMapping,
  workoutFrequencyReverseMapping,
  type GoalWithoutProgressType,
} from "~/app/types/goal-types";

import { api } from "~/trpc/react";

export function GoalForm(props: { goal?: Goal | null; profileId: number }) {
  const { goal } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<GoalWithoutProgressType>({
    mode: "uncontrolled",
    initialValues: {
      goalType: goal ? primaryGoalReverseMapping[goal.goalType] : undefined,
      targetWeight: goal?.targetWeight ?? undefined,
      workoutFrequency: goal
        ? workoutFrequencyReverseMapping[goal.workoutFrequency]
        : undefined,
      workoutDuration: goal
        ? workoutDurationReverseMapping[goal.workoutDuration]
        : undefined,
      locationPreference: goal
        ? locationPreferenceReverseMapping[goal.locationPreference]
        : undefined,
      profileId: props.profileId,
    },
  });

  const createGoal = api.goal.create.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      console.log("Successfully created goal with data", data);
      router.push("/dashboard");
    },
    onError: (err) => {
      setLoading(false);
      console.log("Error creating goal", err);
    },
  });

  const updateGoal = api.goal.update.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      console.log("Successfully updated goal with data", data);
      router.push("/dashboard");
    },
    onError: (err) => {
      setLoading(false);
      console.log("Error creating goal", err);
    },
  });

  const handleSubmit = (data: GoalWithoutProgressType) => {
    setLoading(true);

    console.log("data in handleSubmit", data);

    if (
      data.goalType == null ||
      data.targetWeight == null ||
      data.workoutFrequency == null ||
      data.workoutDuration == null ||
      data.locationPreference == null
    )
      return;

    const formattedData = {
      goalType: PrimaryGoalMapping[data.goalType],
      targetWeight: data.targetWeight,
      workoutFrequency: WorkoutFrequencyMapping[data.workoutFrequency],
      workoutDuration: WorkoutDurationMapping[data.workoutDuration],
      locationPreference: LocationPreferenceMapping[data.locationPreference],
      profileId: data.profileId,
    };

    console.log("formattedData", formattedData);
    if (goal) {
      updateGoal.mutate({
        ...formattedData,
        id: goal.id,
      });
    } else {
      createGoal.mutate({
        ...formattedData,
      });
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Container size="sm" pt="xl" mt="xl">
        <Title order={2}>
          {goal
            ? "Update Goal"
            : "Please fill in the information to create your goal."}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <Select
            label="Select Your Goal Type"
            placeholder="Select Your Goal Type"
            data={PrimaryGoalOptions}
            name="goalType"
            key={form.key("goalType")}
            {...form.getInputProps("goalType")}
          />
          <Select
            label="Location Preference"
            placeholder="Select Location Preference"
            data={LocationPreferenceOptions}
            name="locationPreference"
            key={form.key("locationPreference")}
            {...form.getInputProps("locationPreference")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <Select
            label="Workout Frequency"
            placeholder="Select Workout Frequency"
            data={WorkoutFrequencyOptions} // Assuming these are the options, adjust as needed
            name="workoutFrequency"
            key={form.key("workoutFrequency")}
            {...form.getInputProps("workoutFrequency")}
          />

          <Select
            label="Workout Duration"
            placeholder="Select Workout Duration"
            data={WorkoutDurationOptions}
            name="workoutDuration"
            key={form.key("workoutDuration")}
            {...form.getInputProps("workoutDuration")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 1 }} mt="xl">
          <NumberInput
            label="Target Weight"
            placeholder="Your target weight"
            name="targetWeight"
            clampBehavior="strict"
            key={form.key("targetWeight")}
            {...form.getInputProps("targetWeight")}
          />
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Button type="submit" size="md" loading={true}>
            {goal ? "Update Goal" : "Create Goal"}
          </Button>
        </Group>
      </Container>
    </form>
  );
}
