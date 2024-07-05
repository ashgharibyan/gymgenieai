export const maxDuration = 60;

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

  const profile = user?.profile ?? undefined;
  const goal = profile?.goal ?? undefined;

  if (profile?.workoutPlan) {
    return (
      <WorkoutList
        profile={profile}
        goal={goal}
        workoutPlan={profile.workoutPlan}
      />
    );
  }

  return <CreateWorkout profile={profile} goal={goal} />;
}
