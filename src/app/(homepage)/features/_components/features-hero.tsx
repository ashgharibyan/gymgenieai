"use client";

import React from "react";
import { Text, Title, Container, SimpleGrid, Button } from "@mantine/core";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import classes from "../_styles/features-hero.module.css";

export const MOCKDATA = [
  {
    title: "Secure Database",
    description:
      "Our database uses Prisma to ensures that your data is protected with the highest level of encryption, giving you peace of mind and confidence in our system.",
    background: "#ADD8E6",
  },
  {
    title: "User Registation",
    description:
      "Using Kinde registration users can easily register, create an account, sign in, and start experiencing the benefits of their own personalized AI GymGenie in just a few simple steps.",
    background: "#ADD8E6",
  },
  {
    title: "Integrated AI API",
    description:
      "Our platfrom integrates AI API to enable seamless interactions between humans and machines, revolutionizing nutrition and workouts.",
    background: "#ADD8E6",
  },
  {
    title: "Personalized Goal Tracking",
    description:
      "Set and achieve your goals with our personalized tracking system, tailored to your unique needs and objectives.",
    background: "#ADD8E6",
  },
  {
    title: "Personalized Workout Planning",
    description:
      "Get fit and healthy with our customized workout plans, designed to help you reach your fitness goals and maintain a balanced lifestyle provided by our AI which uses the data you provided.",
    background: "#ADD8E6",
  },
  {
    title: "Personalized Meal Planning",
    description:
      "Eat healthy and delicious meals with our personalized meal planning system, designed to follow your dietary needs and preferences provided by our AI which uses the data you provided.",
    background: "#ADD8E6",
  },
];

interface FeatureProps {
  title: React.ReactNode;
  description: React.ReactNode;
  background: string;
}

export function FeaturesGrid({ title, description, background }: FeatureProps) {
  return (
    <div
      className={classes.featureGrid}
      style={{ backgroundColor: background }}
    >
      <Text size="sm" mt="sm" mb={10} className={classes.title}>
        {title}
      </Text>
      <Text size="sm" c="sm" lh={2} className={classes.description}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesHero() {
  const features = MOCKDATA.map((feature, index) => (
    <FeaturesGrid {...feature} key={index} />
  ));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Features</Title>

      <Container size={700} p={0}>
        <Text size="sm" className={classes.description}>
          These features provide a quick explanation on what our features use to
          provide our users with a simple and seemless UI which contains all the
          features we listed below.
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: "xl", md: 70 }}
        verticalSpacing={{ base: "xl", md: 80 }}
      >
        {features}
      </SimpleGrid>

      <div style={{ textAlign: "center", marginTop: 40 }}>
        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
          component={LoginLink}
        >
          Get started
        </Button>
      </div>
    </Container>
  );
}
