import React from "react";
import { ProfileForm } from "./_components/profile-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { api } from "~/trpc/server";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  const user =
    kindeUser != null
      ? await api.user.getByIdWithProfile({ id: kindeUser.id })
      : undefined;

  return (
    <div>
      <h1>Profile </h1>
      {user?.profile ? (
        <>
          <h3>User has a profile. Here is the profile info</h3>
          <h3>{user.profile.age}</h3>
          <h3>{user.profile.height}</h3>
          <h3>{user.profile.weight}</h3>
          <h3>{user.profile.gender}</h3>
          <h3>{user.profile.activityLevel}</h3>
          <h3>{user.profile.exerciseExperience}</h3>
        </>
      ) : (
        <ProfileForm />
      )}
    </div>
  );
}
