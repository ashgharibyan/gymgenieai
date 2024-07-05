"use client";
import { useState } from "react";
import {
  Stepper,
  Button,
  Group,
  Container,
  Box,
  Center,
  Title,
  Stack,
  Text,
  Flex,
} from "@mantine/core";

export default function NewUserStepper(props: {
  noProfile: boolean;
  noGoal: boolean;
}) {
  const { noProfile, noGoal } = props;
  const [active, setActive] = useState(noProfile ? 0 : noGoal ? 1 : 2);

  return (
    <Container>
      <Stepper
        active={active}
        onStepClick={setActive}
        allowNextStepsSelect={false}
      >
        <Stepper.Step label="First step" description="Create a Profile">
          <Stack mt="xl" flex={1}>
            <Title order={3}>Step 1: Create a Profile</Title>
            <Text>
              Create a profile to get started with your fitness journey.
            </Text>
            <Text>
              You will be prompted to input your personal information, such as
              your age, gender, weight, height, activity level, and exercise
              experience. This information will be used to generate a workout
              plan tailored to your
            </Text>
            <Text c="dimmed">
              <strong>Note:</strong> You can always update your profile
              information later.
            </Text>
          </Stack>
          <Button
            fullWidth
            mt="lg"
            component="a"
            href="/profile"
            flex={1}
            radius="lg"
            size="md"
          >
            Create Profile
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Set a Goal">
          <Stack mt="xl" flex={1}>
            <Title order={3}>Step 2: Set a Goal</Title>
            <Text>
              Set a goal to be able to generate a workout plan tailored to your
              needs.
            </Text>
            <Text>
              You will be prompted to input your primary goal, target weight,
              workout frequency, workout duration, and location preference. This
              information will be used to generate a workout plan tailored to
              your needs.
            </Text>
            <Text c="dimmed">
              <strong>Note:</strong> You can always update your goal later.
            </Text>
          </Stack>
          <Button
            fullWidth
            mt="lg"
            component="a"
            href="/goal"
            flex={1}
            radius="lg"
            size="md"
          >
            Set a Goal
          </Button>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Generate a Workout Plan">
          <Stack mt="xl" flex={1}>
            <Title order={3}>Final Step: Generate a Workout Plan</Title>
            <Text>
              You are now ready to generate a workout plan tailored to your
              needs.
            </Text>
            <Text>
              Please go to &quot;Workouts&quot; section to generate your workout
              plan. We are using a machine learning model to generate the
              workout plan for you. The plan will be tailored to your needs and
              preferences.
            </Text>
            <Text c="dimmed">
              <strong>Note:</strong> You can always regenerate a new workout
              plan.
            </Text>
          </Stack>
          <Button
            fullWidth
            mt="lg"
            component="a"
            href="/workouts"
            flex={1}
            radius="lg"
            size="md"
          >
            Go to Workouts Section
          </Button>
        </Stepper.Step>
      </Stepper>
    </Container>
  );
}
