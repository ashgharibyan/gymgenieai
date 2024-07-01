import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { api } from "~/trpc/server";
import WorkoutList from "./_components/workout-list";
import CreateWorkout from "./_components/create-workout";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  console.log("IN WORKOUTS PAGE - kindeuser", kindeUser);
  console.log("IN WORKOUTS PAGE - user", user);

  const profile = user?.profile ?? undefined;
  console.log("IN WORKOUTS PAGE - profile", profile);
  const goal = profile?.goal ?? undefined;
  console.log("IN WORKOUTS PAGE - goal", goal);
  console.log("IN WORKOUTS PAGE - profile.workoutPlan", profile?.workoutPlan);

  if (profile?.workoutPlan) {
    return <WorkoutList workoutPlan={profile.workoutPlan} />;
  }

  return <CreateWorkout profile={profile} goal={goal} />;
}
