import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Title } from "@mantine/core";
import React from "react";
import { api } from "~/trpc/server";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  const profile = user?.profile ?? undefined;
  const goal = profile?.goal ?? undefined;

  if (profile?.workoutPlan) {
    return (
      <>
        <Title order={1}>Workout Plan Exists</Title>
      </>
    );
  }

  const workouts =
    profile && goal
      ? await api.openai.generateWorkout({
          profile: profile,
          goal: goal,
        })
      : undefined;

  console.log(workouts);
  console.log("----------");
  console.log("type of workouts", typeof workouts);

  const workoutPlan =
    workouts && profile
      ? await api.workoutPlan.create({
          profileId: profile?.id,
          workouts: workouts.workouts,
        })
      : undefined;

  console.log(workoutPlan);
  return (
    <div>
      <h1>Workout Plan Doesnt Exist </h1>
    </div>
  );
}
