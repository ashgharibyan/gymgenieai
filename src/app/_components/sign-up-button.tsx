"use client";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@mantine/core";

export default function SignUpButton() {
  return (
    <Button component={RegisterLink} size="md">
      Sign Up
    </Button>
  );
}
