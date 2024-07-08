"use client";

import {
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
} from "@mantine/core";
import classes from "../_styles/header.module.css";
import NextImage from "next/image";
import logohorizontal from "../../../../public/images/logo-horizontal-text.png";
import { useDisclosure } from "@mantine/hooks";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/">
            <Image
              src={logohorizontal}
              alt="GymGenie"
              height={35}
              w="auto"
              fit="contain"
              component={NextImage}
            />
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>

            <Link href="/features" className={classes.link}>
              Features
            </Link>
            <Link href="/about" className={classes.link}>
              About
            </Link>
            <Link href="/?isContact=true" className={classes.link}>
              Contact
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Button variant="default" component={LoginLink}>
              Log in
            </Button>
            <Button component={RegisterLink}>Sign up</Button>
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link href="/" className={classes.link}>
            Home
          </Link>

          <Link href="/about" className={classes.link}>
            About
          </Link>
          <Link href="/features" className={classes.link}>
            Features
          </Link>
          <Link href="/?isContact=true" className={classes.link}>
            Contact
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            <Button variant="default" component={LoginLink}>
              Log in
            </Button>
            <Button component={RegisterLink}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
