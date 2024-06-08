"use client";

import { Container, Group, Anchor, Image } from "@mantine/core";
import classes from "../_styles/footer.module.css";
import logohorizontal from "../../../../public/images/logo-horizontal-text.png";
import NextImage from "next/image";
import Link from "next/link";

const links = [
  { link: "#", label: "About" },
  { link: "#", label: "Contact" },
  { link: "#", label: "Features" },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Link href="">
          <Image
            src={logohorizontal}
            alt="GymGenie"
            height={28}
            w="auto"
            fit="contain"
            component={NextImage}
          />
        </Link>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
