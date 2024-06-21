import React from "react";
import { GoalForm } from "./_components/goal-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { api } from "~/trpc/server";
import GoalDisplay from "./_components/goal-display";
import NeedProfle from "./_components/need-profile";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  const profile = user?.profile ?? undefined;

  const goal =
    profile != null
      ? await api.goal.getByProfileId({ profileId: profile.id })
      : undefined;

  return (
    <>
      {profile ? (
        goal ? (
          <GoalDisplay goal={goal} />
        ) : (
          <GoalForm goal={goal} profileId={profile?.id} />
        )
      ) : (
        <NeedProfle />
      )}
    </>
  );
}
