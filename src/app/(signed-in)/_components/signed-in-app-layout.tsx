"use client";

import { AppShell, Burger, Group, Image } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import gymgenielogo from "../../../../public/images/logo-horizontal-text.png";
import NextImage from "next/image";
import { Navbar } from "./navbar";

export function SignedInAppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image
            src={gymgenielogo}
            alt="GymGenie"
            height={35}
            w="auto"
            fit="contain"
            pl="sm"
            component={NextImage}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
