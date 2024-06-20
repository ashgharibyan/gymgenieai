import React from "react";
import { ProfileForm } from "./_components/profile-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { api } from "~/trpc/server";
import ProfileDisplay from "./_components/profile-display";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  const profile = user?.profile ?? undefined;

  return (
    <>
      {profile ? (
        <ProfileDisplay profile={profile} />
      ) : (
        <ProfileForm profile={profile} />
      )}
    </>
  );
}
