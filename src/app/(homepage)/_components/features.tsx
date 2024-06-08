"use client";

import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from "@mantine/core";
import {
  IconBarbell,
  IconToolsKitchen2,
  IconFileAnalytics,
} from "@tabler/icons-react";
import classes from "../_styles/features.module.css";

const mockdata = [
  {
    title: "Personalized Fitness Plans",
    description:
      "Tailored workouts to match your specific fitness goals. Stay motivated with adaptive plans that evolve as you progress",
    icon: IconBarbell,
  },
  {
    title: "Custom Meal Plans",
    description:
      "Receive meal plans that fit your dietary preferences and fitness objectives, ensuring balanced nutrition",
    icon: IconToolsKitchen2,
  },
  {
    title: "Progress Tracking and Insights",
    description:
      "Track your workouts, meals, and health metrics with detailed analytics to stay informed and make data-driven decisions",
    icon: IconFileAnalytics,
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl" my="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Discover the Power of Personalized Fitness
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Leverage AI-driven insights to achieve your health and fitness goals
        with ease.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
