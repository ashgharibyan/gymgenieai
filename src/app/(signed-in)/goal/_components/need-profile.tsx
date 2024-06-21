"use client";
import { Anchor, Button, Center, Stack, Text, rem } from "@mantine/core";
import React from "react";

export default function NeedProfle() {
  return (
    <Center h={300}>
      <Stack justify="center" align="center">
        <Text ta="center" size={rem(42)} fw={700}>
          Please{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            create a profile{" "}
          </Text>{" "}
          before setting a goal.
        </Text>
        <Anchor href="/profile">
          <Button radius="lg" size="xl" variant="gradient">
            Create Profile
          </Button>
        </Anchor>
      </Stack>
    </Center>
  );
}
