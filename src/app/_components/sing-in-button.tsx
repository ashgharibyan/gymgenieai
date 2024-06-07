"use client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@mantine/core";

export default function SignInButton() {
  return (
    <Button component={LoginLink} size="md">
      Sign In
    </Button>
  );
}
