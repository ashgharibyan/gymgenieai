export const maxDuration = 60;

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { api } from "~/trpc/server";
import NewUserStepper from "./_components/new-user-stepper";
import Dashboard from "./_components/dashboard";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  const profile = user?.profile ?? undefined;
  const goal = profile?.goal ?? undefined;

  // if there is no profle
  if (
    profile === undefined ||
    goal === undefined ||
    profile.workoutPlan === null
  ) {
    return (
      <NewUserStepper
        noProfile={profile ? false : true}
        noGoal={goal ? false : true}
      />
    );
  }

  return (
    <Dashboard
      profile={profile}
      goal={goal}
      workoutPlan={profile.workoutPlan}
      username={kindeUser?.given_name ?? "User"}
    />
  );
}
