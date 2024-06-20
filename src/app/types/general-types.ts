import { ActivityLevel, ExerciseExperience, Gender } from "@prisma/client";

export interface ProfileWithoutGoalType {
  age?: number;
  gender?: DisplayGender;
  height?: number;
  weight?: number;
  activityLevel?: DisplayActivityLevel;
  exerciseExperience?: DisplayExerciseExperience;
}

export const ActivityLevelOptions = [
  "Sedentary",
  "Lightly Active",
  "Moderately Active",
  "Very Active",
] as const;
export const GenderOptions = ["Male", "Female"] as const;
export const ExerciseExperienceOptions = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;
export type DisplayActivityLevel = (typeof ActivityLevelOptions)[number];
export type DisplayGender = (typeof GenderOptions)[number];
export type DisplayExerciseExperience =
  (typeof ExerciseExperienceOptions)[number];

export const ActivityLevelMapping: Record<DisplayActivityLevel, ActivityLevel> =
  {
    Sedentary: ActivityLevel.SEDENTARY,
    "Lightly Active": ActivityLevel.LIGHTLY_ACTIVE,
    "Moderately Active": ActivityLevel.MODERATELY_ACTIVE,
    "Very Active": ActivityLevel.VERY_ACTIVE,
  };

export const GenderMapping: Record<DisplayGender, Gender> = {
  Male: Gender.MALE,
  Female: Gender.FEMALE,
};

export const ExerciseExperienceMapping: Record<
  DisplayExerciseExperience,
  ExerciseExperience
> = {
  Beginner: ExerciseExperience.BEGINNER,
  Intermediate: ExerciseExperience.INTERMEDIATE,
  Advanced: ExerciseExperience.ADVANCED,
};
