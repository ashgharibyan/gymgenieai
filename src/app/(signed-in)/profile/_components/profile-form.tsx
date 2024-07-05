"use client";

import {
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  NumberInput,
  Select,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { type Profile } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ActivityLevelMapping,
  ActivityLevelOptions,
  ExerciseExperienceMapping,
  ExerciseExperienceOptions,
  GenderMapping,
  GenderOptions,
  activityLevelReverseMapping,
  exerciseExperienceReverseMapping,
  genderReverseMapping,
  type ProfileWithoutGoalType,
} from "~/app/types/general-types";
import { api } from "~/trpc/react";

export function ProfileForm(props: { profile?: Profile | undefined }) {
  const { profile } = props;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileWithoutGoalType>({
    mode: "uncontrolled",
    initialValues: {
      age: profile?.age ?? undefined,
      gender: profile?.gender
        ? genderReverseMapping[profile.gender]
        : undefined,
      height: profile?.height ?? undefined,
      weight: profile?.weight ?? undefined,
      activityLevel: profile?.activityLevel
        ? activityLevelReverseMapping[profile.activityLevel]
        : undefined,
      exerciseExperience: profile?.exerciseExperience
        ? exerciseExperienceReverseMapping[profile.exerciseExperience]
        : undefined,
    },
    validate: {
      age: isNotEmpty("Please enter your age"),
      gender: isNotEmpty("Please select your gender"),
      height: isNotEmpty("Please enter your height"),
      weight: isNotEmpty("Please enter your weight"),
      activityLevel: isNotEmpty("Please select your activity level"),
      exerciseExperience: isNotEmpty("Please select your exercise experience"),
    },
  });

  const createProfile = api.profile.create.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      console.log("Successfully created profile with data", data);
      router.push("/dashboard");
    },
    onError: (err) => {
      setLoading(false);
      console.log("Error creating profile", err);
    },
  });

  const updateProfile = api.profile.update.useMutation({
    onSuccess: (data) => {
      setLoading(false);
      console.log("Successfully updated profile with data", data);
      router.push("/dashboard");
    },
    onError: (err) => {
      setLoading(false);

      console.log("Error creating profile", err);
    },
  });

  const handleSubmit = (data: ProfileWithoutGoalType) => {
    setLoading(true);
    console.log("data in handleSubmit", data);

    if (
      data.age == null ||
      data.gender == null ||
      data.height == null ||
      data.weight == null ||
      data.activityLevel == null ||
      data.exerciseExperience == null
    )
      return;

    if (profile) {
      updateProfile.mutate({
        id: profile.id,
        input: {
          age: data.age,
          height: data.height,
          weight: data.weight,
          activityLevel: ActivityLevelMapping[data.activityLevel],
          gender: GenderMapping[data.gender],
          exerciseExperience:
            ExerciseExperienceMapping[data.exerciseExperience],
        },
      });
    } else {
      createProfile.mutate({
        age: data.age,
        height: data.height,
        weight: data.weight,
        activityLevel: ActivityLevelMapping[data.activityLevel],
        gender: GenderMapping[data.gender],
        exerciseExperience: ExerciseExperienceMapping[data.exerciseExperience],
      });
    }
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Container size="sm" pt="xl" mt="xl">
        <Title order={2}>
          {profile
            ? "Update Profile"
            : "Please fill in the information to create your profile."}
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <NumberInput
            label="Age"
            placeholder="Age"
            name="age"
            clampBehavior="strict"
            min={1}
            max={100}
            key={form.key("age")}
            {...form.getInputProps("age")}
          />

          <Select
            label="Select Your Gender"
            placeholder="Select Your Gender"
            data={GenderOptions}
            name="gender"
            key={form.key("gender")}
            {...form.getInputProps("gender")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <NumberInput
            label="Height"
            placeholder="Height in cm"
            name="height"
            suffix=" cm"
            clampBehavior="strict"
            min={1}
            max={500}
            key={form.key("height")}
            {...form.getInputProps("height")}
          />
          <NumberInput
            label="Weight"
            placeholder="Weight in lb"
            name="weight"
            clampBehavior="strict"
            min={1}
            max={1000}
            suffix=" lb"
            key={form.key("weight")}
            {...form.getInputProps("weight")}
          />
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <Select
            label="Select your activity level"
            placeholder="Select your activity level"
            data={ActivityLevelOptions}
            name="activityLevel"
            key={form.key("activityLevel")}
            {...form.getInputProps("activityLevel")}
          />
          <Select
            label="Select your exercise experience"
            placeholder="Select your exercise experience"
            data={ExerciseExperienceOptions}
            name="exerciseExperience"
            key={form.key("exerciseExperience")}
            {...form.getInputProps("exerciseExperience")}
          />
        </SimpleGrid>

        <Group justify="center" mt="xl">
          <Button type="submit" size="md" loading={loading}>
            {profile ? "Update Profile" : "Create Profile"}
          </Button>
        </Group>
      </Container>
    </form>
  );
}
