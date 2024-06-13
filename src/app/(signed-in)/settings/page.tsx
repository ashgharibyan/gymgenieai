import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";

export default async function Page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log("------------", user);
  return (
    <div>
      <h1>Settings </h1>
    </div>
  );
}
