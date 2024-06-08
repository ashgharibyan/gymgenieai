"use client";

import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "../_styles/hero.module.css";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

export function Hero() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 30%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          AI-Powered Fitness: Your Path to a Healthier You
        </Title>
        <Text className={classes.description} size="xl" mt="xl">
          Customized workout and meal plans designed to help you achieve your
          health goals effortlessly.
        </Text>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
          component={LoginLink}
        >
          Get started
        </Button>
      </Container>
    </div>
  );
}
