import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import LogOutButton from "../_components/log-out-button";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <h1>Dashboard {user?.email}</h1>
      <LogOutButton />
    </div>
  );
}
