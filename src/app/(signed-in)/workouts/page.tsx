import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
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
  const goal = profile
    ? await api.goal.getByProfileId({ profileId: profile?.id })
    : undefined;

  const workouts =
    profile && goal
      ? await api.openai.generateWorkout({
          profile: profile,
          goal: goal,
        })
      : undefined;

  console.log(workouts);
  return (
    <div>
      <h1>Workouts </h1>
    </div>
  );
}
