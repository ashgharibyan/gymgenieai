"use client";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@mantine/core";

export default function LogOutButton() {
  return (
    <Button component={LogoutLink} size="md">
      Log Out
    </Button>
  );
}
