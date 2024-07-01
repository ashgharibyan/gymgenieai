"use client";

import { Button, Container, Title } from "@mantine/core";
import { type Goal, type Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";

export default function CreateWorkout(props: {
  profile: Profile | undefined;
  goal: Goal | undefined;
}) {
  const { profile, goal } = props;
  const router = useRouter();

  const generateWorkouts =
    profile && goal
      ? api.openai.generateWorkout.useQuery(
          {
            profile,
            goal,
          },
          {
            enabled: false,
          }
        )
      : undefined;

  const createWorkoutPlan = api.workoutPlan.create.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Error creating workout plan", error);
    },
  });

  const handleCreateWorkouts = async () => {
    if (!profile || !goal) {
      console.log("Profile or Goal is undefined");
      return;
    }

    const workouts = await generateWorkouts?.refetch();

    if (!workouts?.data) {
      console.log("Workouts are undefined");
      return;
    }
    createWorkoutPlan.mutate({
      profileId: profile.id,
      workouts: workouts.data.workouts,
    });

    console.log("Workouts", workouts.data);
  };

  return (
    <Container>
      <Title>No Workouts Generated Yet</Title>
      <Button onClick={handleCreateWorkouts}>Create Workout</Button>
    </Container>
  );
}
