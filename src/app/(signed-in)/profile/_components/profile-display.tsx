"use client";

import {
  Box,
  Button,
  Flex,
  Group,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { type Profile } from "@prisma/client";
import React, { useState } from "react";
import { ProfileForm } from "./profile-form";
import { StatCard } from "./stat-card";
import {
  IconActivity,
  IconArrowUp,
  IconBarbell,
  IconCalendar,
  IconFriends,
  IconScaleOutline,
} from "@tabler/icons-react";
import {
  activityLevelReverseMapping,
  exerciseExperienceReverseMapping,
  genderReverseMapping,
} from "~/app/types/general-types";

export default function ProfileDisplay(props: { profile: Profile }) {
  const { profile } = props;
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const profileInfo = [
    {
      title: "Age",
      value: profile.age.toString() + " years old",
      icon: IconCalendar,
    },
    {
      title: "Gender",
      value: genderReverseMapping[profile.gender],
      icon: IconFriends,
    },
    {
      title: "Height",
      value: profile.height.toString() + " cm",
      icon: IconArrowUp,
    },
    {
      title: "Weight",
      value: profile.weight.toString() + " lb",
      icon: IconScaleOutline,
    },
    {
      title: "Activity Level",
      value: activityLevelReverseMapping[profile.activityLevel],
      icon: IconActivity,
    },
    {
      title: "Exercise Experience",
      value: exerciseExperienceReverseMapping[profile.exerciseExperience],
      icon: IconBarbell,
    },
  ];

  return (
    <Box>
      {openUpdateProfile ? (
        <ProfileForm profile={profile} />
      ) : (
        <Box mx="xl">
          <Group justify="space-between" align="center" mb="xl">
            <Flex direction="column">
              <Title order={1} fw={700}>
                Profile
              </Title>
              <Text c="dimmed">Your profile information</Text>
            </Flex>
            <Button onClick={() => setOpenUpdateProfile(true)}>
              Edit Profile
            </Button>
          </Group>
          <SimpleGrid mt="xl" cols={{ base: 1, sm: 2, md: 2 }} spacing="lg">
            {profileInfo.map((info) => (
              <StatCard
                key={info.title}
                title={info.title}
                value={info.value}
                icon={info.icon}
              />
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
}
