import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) redirect("/");

  let dbUser = await api.user.getById({ id: user.id });

  if (!dbUser) {
    dbUser = await api.user.userCreate({
      id: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "", // Using nullish coalescing operator to provide a default empty string value
    });
  }
  redirect("/dashboard");
}
