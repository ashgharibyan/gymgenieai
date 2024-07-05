"use client";

import { Alert, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type Goal, type Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { set } from "zod";
import { api } from "~/trpc/react";

export type ProfileWithWorkoutPlan = Profile & {
  workoutPlan: {
    id: number;
  } | null;
};

export default function GenerateWorkoutButton(props: {
  profile: ProfileWithWorkoutPlan | undefined;
  goal: Goal | undefined;
  update: boolean;
}) {
  const { profile, goal, update } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);

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
      setLoading(false);
      router.refresh();
    },
    onError: (error) => {
      setLoading(false);
      console.error("Error creating workout plan", error);
    },
  });
  const updateWorkoutPlan = api.workoutPlan.update.useMutation({
    onSuccess: () => {
      setLoading(false);
      console.log("Workout plan updated");
      router.push("/workouts");
      router.refresh();
    },
    onError: (error) => {
      setLoading(false);
      console.error("Error creating workout plan", error);
    },
  });

  const handleCreateWorkouts = async () => {
    setErrors(null);
    setLoading(true);
    if (!profile || !goal) {
      console.log("Profile or Goal is undefined");
      if (!profile) {
        setErrors("Please create a profile first.");
      } else {
        setErrors("Please set a goal first.");
      }
      setLoading(false);
      return;
    }

    const workouts = await generateWorkouts?.refetch();

    if (!workouts?.data) {
      console.log("Workouts are undefined");
      return;
    }

    if (update && profile?.workoutPlan) {
      updateWorkoutPlan.mutate({
        workoutPlanId: profile?.workoutPlan.id,
        profileId: profile.id,
        workouts: workouts.data.workouts,
      });
    } else {
      createWorkoutPlan.mutate({
        profileId: profile.id,
        workouts: workouts.data.workouts,
      });
    }
  };

  return (
    <>
      <Button
        onClick={handleCreateWorkouts}
        loading={loading}
        disabled={errors ? true : false}
      >
        {update ? "Generate New Workouts" : "Generate Workouts"}
      </Button>
      {/* errors */}
      {errors && (
        <Alert mt="md" color="red">
          {errors}
        </Alert>
      )}
    </>
  );
}
