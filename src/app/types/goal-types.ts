import {
  LocationPreference,
  PrimaryGoal,
  type Prisma,
  WorkoutDuration,
  WorkoutFrequency,
} from "@prisma/client";

export type GoalWithoutProgressAndProfile = Prisma.GoalGetPayload<{
  include: { profile: false; progress: false };
}>;

export interface GoalWithoutProgressType {
  goalType?: PrimaryGoalOptionsType;
  targetWeight?: number;
  workoutFrequency?: WorkoutFrequencyOptionsType;
  workoutDuration?: WorkoutDurationOptionsType;
  locationPreference?: LocationPreferenceOptionsType;
  profileId: number;
}
// Define options
export const WorkoutDurationOptions = [
  "Thirty Minutes",
  "Forty Five Minutes",
  "Sixty Minutes",
  "Ninety Minutes",
] as const;

export const PrimaryGoalOptions = [
  "Weight Loss",
  "Weight Gain",
  "Muscle Gain",
  "Improve Endurance",
  "Increase Flexibility",
] as const;

export const LocationPreferenceOptions = ["Home", "Gym"] as const;

export const GoalStatusOptions = ["Active", "Completed"] as const;

// Define type mappings
export type WorkoutDurationOptionsType =
  (typeof WorkoutDurationOptions)[number];
export type PrimaryGoalOptionsType = (typeof PrimaryGoalOptions)[number];
export type LocationPreferenceOptionsType =
  (typeof LocationPreferenceOptions)[number];
export type GoalStatusOptionsType = (typeof GoalStatusOptions)[number];

// Mapping functions
export const WorkoutDurationMapping: Record<
  WorkoutDurationOptionsType,
  WorkoutDuration
> = {
  "Thirty Minutes": WorkoutDuration.THIRTY_MINUTES,
  "Forty Five Minutes": WorkoutDuration.FORTY_FIVE_MINUTES,
  "Sixty Minutes": WorkoutDuration.SIXTY_MINUTES,
  "Ninety Minutes": WorkoutDuration.NINETY_MINUTES,
};

export const workoutDurationReverseMapping: Record<
  WorkoutDuration,
  WorkoutDurationOptionsType
> = {
  THIRTY_MINUTES: "Thirty Minutes",
  FORTY_FIVE_MINUTES: "Forty Five Minutes",
  SIXTY_MINUTES: "Sixty Minutes",
  NINETY_MINUTES: "Ninety Minutes",
};

export const PrimaryGoalMapping: Record<PrimaryGoalOptionsType, PrimaryGoal> = {
  "Weight Loss": PrimaryGoal.WEIGHT_LOSS,
  "Weight Gain": PrimaryGoal.WEIGHT_GAIN,
  "Muscle Gain": PrimaryGoal.MUSCLE_GAIN,
  "Improve Endurance": PrimaryGoal.IMPROVE_ENDURANCE,
  "Increase Flexibility": PrimaryGoal.INCREASE_FLEXIBILITY,
};

export const primaryGoalReverseMapping: Record<
  PrimaryGoal,
  PrimaryGoalOptionsType
> = {
  WEIGHT_LOSS: "Weight Loss",
  WEIGHT_GAIN: "Weight Gain",
  MUSCLE_GAIN: "Muscle Gain",
  IMPROVE_ENDURANCE: "Improve Endurance",
  INCREASE_FLEXIBILITY: "Increase Flexibility",
};

export const LocationPreferenceMapping: Record<
  LocationPreferenceOptionsType,
  LocationPreference
> = {
  Home: LocationPreference.HOME,
  Gym: LocationPreference.GYM,
};

export const locationPreferenceReverseMapping: Record<
  LocationPreference,
  LocationPreferenceOptionsType
> = {
  HOME: "Home",
  GYM: "Gym",
};

export const WorkoutFrequencyOptions = [
  "One Day",
  "Two Days",
  "Three Days",
  "Four Days",
  "Five Days",
  "Six Days",
  "Seven Days",
] as const;
export type WorkoutFrequencyOptionsType =
  (typeof WorkoutFrequencyOptions)[number];

export const WorkoutFrequencyMapping: Record<
  WorkoutFrequencyOptionsType,
  WorkoutFrequency
> = {
  "One Day": WorkoutFrequency.ONE_DAY,
  "Two Days": WorkoutFrequency.TWO_DAYS,
  "Three Days": WorkoutFrequency.THREE_DAYS,
  "Four Days": WorkoutFrequency.FOUR_DAYS,
  "Five Days": WorkoutFrequency.FIVE_DAYS,
  "Six Days": WorkoutFrequency.SIX_DAYS,
  "Seven Days": WorkoutFrequency.SEVEN_DAYS,
};

export const workoutFrequencyReverseMapping: Record<
  WorkoutFrequency,
  WorkoutFrequencyOptionsType
> = {
  ONE_DAY: "One Day",
  TWO_DAYS: "Two Days",
  THREE_DAYS: "Three Days",
  FOUR_DAYS: "Four Days",
  FIVE_DAYS: "Five Days",
  SIX_DAYS: "Six Days",
  SEVEN_DAYS: "Seven Days",
};
