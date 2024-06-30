import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','email','firstName','lastName']);

export const ProfileScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','age','gender','height','weight','activityLevel','exerciseExperience','userID']);

export const GoalScalarFieldEnumSchema = z.enum(['id','profileId','goalType','targetWeight','workoutFrequency','workoutDuration','locationPreference','createdAt','updatedAt']);

export const ProgressScalarFieldEnumSchema = z.enum(['id','goalId','progressWeight','createdAt','updatedAt']);

export const WorkoutPlanScalarFieldEnumSchema = z.enum(['id','profileId']);

export const WorkoutDayScalarFieldEnumSchema = z.enum(['id','day','workoutType','notes','WorkoutPlanId']);

export const ExerciseScalarFieldEnumSchema = z.enum(['id','name','sets','reps','workoutDayId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const GenderSchema = z.enum(['MALE','FEMALE']);

export type GenderType = `${z.infer<typeof GenderSchema>}`

export const PrimaryGoalSchema = z.enum(['WEIGHT_LOSS','WEIGHT_GAIN','MUSCLE_GAIN','IMPROVE_ENDURANCE','INCREASE_FLEXIBILITY']);

export type PrimaryGoalType = `${z.infer<typeof PrimaryGoalSchema>}`

export const ActivityLevelSchema = z.enum(['SEDENTARY','LIGHTLY_ACTIVE','MODERATELY_ACTIVE','VERY_ACTIVE']);

export type ActivityLevelType = `${z.infer<typeof ActivityLevelSchema>}`

export const ExerciseExperienceSchema = z.enum(['BEGINNER','INTERMEDIATE','ADVANCED']);

export type ExerciseExperienceType = `${z.infer<typeof ExerciseExperienceSchema>}`

export const WorkoutFrequencySchema = z.enum(['ONE_DAY','TWO_DAYS','THREE_DAYS','FOUR_DAYS','FIVE_DAYS','SIX_DAYS','SEVEN_DAYS']);

export type WorkoutFrequencyType = `${z.infer<typeof WorkoutFrequencySchema>}`

export const WorkoutDurationSchema = z.enum(['THIRTY_MINUTES','FORTY_FIVE_MINUTES','SIXTY_MINUTES','NINETY_MINUTES']);

export type WorkoutDurationType = `${z.infer<typeof WorkoutDurationSchema>}`

export const LocationPreferenceSchema = z.enum(['HOME','GYM']);

export type LocationPreferenceType = `${z.infer<typeof LocationPreferenceSchema>}`

export const GoalStatusSchema = z.enum(['ACTIVE','COMPLETED']);

export type GoalStatusType = `${z.infer<typeof GoalStatusSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROFILE SCHEMA
/////////////////////////////////////////

export const ProfileSchema = z.object({
  gender: GenderSchema,
  activityLevel: ActivityLevelSchema,
  exerciseExperience: ExerciseExperienceSchema,
  id: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  age: z.number().int(),
  height: z.number(),
  weight: z.number(),
  userID: z.string(),
})

export type Profile = z.infer<typeof ProfileSchema>

/////////////////////////////////////////
// GOAL SCHEMA
/////////////////////////////////////////

export const GoalSchema = z.object({
  goalType: PrimaryGoalSchema,
  workoutFrequency: WorkoutFrequencySchema,
  workoutDuration: WorkoutDurationSchema,
  locationPreference: LocationPreferenceSchema,
  id: z.number().int(),
  profileId: z.number().int(),
  targetWeight: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Goal = z.infer<typeof GoalSchema>

/////////////////////////////////////////
// PROGRESS SCHEMA
/////////////////////////////////////////

export const ProgressSchema = z.object({
  id: z.number().int(),
  goalId: z.number().int(),
  progressWeight: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Progress = z.infer<typeof ProgressSchema>

/////////////////////////////////////////
// WORKOUT PLAN SCHEMA
/////////////////////////////////////////

export const WorkoutPlanSchema = z.object({
  id: z.number().int(),
  profileId: z.number().int(),
})

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>

/////////////////////////////////////////
// WORKOUT DAY SCHEMA
/////////////////////////////////////////

export const WorkoutDaySchema = z.object({
  id: z.number().int(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  WorkoutPlanId: z.number().int(),
})

export type WorkoutDay = z.infer<typeof WorkoutDaySchema>

/////////////////////////////////////////
// EXERCISE SCHEMA
/////////////////////////////////////////

export const ExerciseSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  sets: z.number().int(),
  reps: z.string(),
  workoutDayId: z.number().int(),
})

export type Exercise = z.infer<typeof ExerciseSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  email: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
}).strict()

// PROFILE
//------------------------------------------------------

export const ProfileIncludeSchema: z.ZodType<Prisma.ProfileInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  workoutPlan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
}).strict()

export const ProfileArgsSchema: z.ZodType<Prisma.ProfileDefaultArgs> = z.object({
  select: z.lazy(() => ProfileSelectSchema).optional(),
  include: z.lazy(() => ProfileIncludeSchema).optional(),
}).strict();

export const ProfileSelectSchema: z.ZodType<Prisma.ProfileSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  age: z.boolean().optional(),
  gender: z.boolean().optional(),
  height: z.boolean().optional(),
  weight: z.boolean().optional(),
  activityLevel: z.boolean().optional(),
  exerciseExperience: z.boolean().optional(),
  userID: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
  workoutPlan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
}).strict()

// GOAL
//------------------------------------------------------

export const GoalIncludeSchema: z.ZodType<Prisma.GoalInclude> = z.object({
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const GoalArgsSchema: z.ZodType<Prisma.GoalDefaultArgs> = z.object({
  select: z.lazy(() => GoalSelectSchema).optional(),
  include: z.lazy(() => GoalIncludeSchema).optional(),
}).strict();

export const GoalCountOutputTypeArgsSchema: z.ZodType<Prisma.GoalCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => GoalCountOutputTypeSelectSchema).nullish(),
}).strict();

export const GoalCountOutputTypeSelectSchema: z.ZodType<Prisma.GoalCountOutputTypeSelect> = z.object({
  progress: z.boolean().optional(),
}).strict();

export const GoalSelectSchema: z.ZodType<Prisma.GoalSelect> = z.object({
  id: z.boolean().optional(),
  profileId: z.boolean().optional(),
  goalType: z.boolean().optional(),
  targetWeight: z.boolean().optional(),
  workoutFrequency: z.boolean().optional(),
  workoutDuration: z.boolean().optional(),
  locationPreference: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  progress: z.union([z.boolean(),z.lazy(() => ProgressFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => GoalCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROGRESS
//------------------------------------------------------

export const ProgressIncludeSchema: z.ZodType<Prisma.ProgressInclude> = z.object({
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
}).strict()

export const ProgressArgsSchema: z.ZodType<Prisma.ProgressDefaultArgs> = z.object({
  select: z.lazy(() => ProgressSelectSchema).optional(),
  include: z.lazy(() => ProgressIncludeSchema).optional(),
}).strict();

export const ProgressSelectSchema: z.ZodType<Prisma.ProgressSelect> = z.object({
  id: z.boolean().optional(),
  goalId: z.boolean().optional(),
  progressWeight: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  goal: z.union([z.boolean(),z.lazy(() => GoalArgsSchema)]).optional(),
}).strict()

// WORKOUT PLAN
//------------------------------------------------------

export const WorkoutPlanIncludeSchema: z.ZodType<Prisma.WorkoutPlanInclude> = z.object({
  workouts: z.union([z.boolean(),z.lazy(() => WorkoutDayFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkoutPlanArgsSchema: z.ZodType<Prisma.WorkoutPlanDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutPlanSelectSchema).optional(),
  include: z.lazy(() => WorkoutPlanIncludeSchema).optional(),
}).strict();

export const WorkoutPlanCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkoutPlanCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutPlanCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkoutPlanCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkoutPlanCountOutputTypeSelect> = z.object({
  workouts: z.boolean().optional(),
}).strict();

export const WorkoutPlanSelectSchema: z.ZodType<Prisma.WorkoutPlanSelect> = z.object({
  id: z.boolean().optional(),
  profileId: z.boolean().optional(),
  workouts: z.union([z.boolean(),z.lazy(() => WorkoutDayFindManyArgsSchema)]).optional(),
  profile: z.union([z.boolean(),z.lazy(() => ProfileArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutPlanCountOutputTypeArgsSchema)]).optional(),
}).strict()

// WORKOUT DAY
//------------------------------------------------------

export const WorkoutDayIncludeSchema: z.ZodType<Prisma.WorkoutDayInclude> = z.object({
  exercises: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  WorkoutPlan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const WorkoutDayArgsSchema: z.ZodType<Prisma.WorkoutDayDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutDaySelectSchema).optional(),
  include: z.lazy(() => WorkoutDayIncludeSchema).optional(),
}).strict();

export const WorkoutDayCountOutputTypeArgsSchema: z.ZodType<Prisma.WorkoutDayCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => WorkoutDayCountOutputTypeSelectSchema).nullish(),
}).strict();

export const WorkoutDayCountOutputTypeSelectSchema: z.ZodType<Prisma.WorkoutDayCountOutputTypeSelect> = z.object({
  exercises: z.boolean().optional(),
}).strict();

export const WorkoutDaySelectSchema: z.ZodType<Prisma.WorkoutDaySelect> = z.object({
  id: z.boolean().optional(),
  day: z.boolean().optional(),
  workoutType: z.boolean().optional(),
  notes: z.boolean().optional(),
  WorkoutPlanId: z.boolean().optional(),
  exercises: z.union([z.boolean(),z.lazy(() => ExerciseFindManyArgsSchema)]).optional(),
  WorkoutPlan: z.union([z.boolean(),z.lazy(() => WorkoutPlanArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => WorkoutDayCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EXERCISE
//------------------------------------------------------

export const ExerciseIncludeSchema: z.ZodType<Prisma.ExerciseInclude> = z.object({
  WorkoutDay: z.union([z.boolean(),z.lazy(() => WorkoutDayArgsSchema)]).optional(),
}).strict()

export const ExerciseArgsSchema: z.ZodType<Prisma.ExerciseDefaultArgs> = z.object({
  select: z.lazy(() => ExerciseSelectSchema).optional(),
  include: z.lazy(() => ExerciseIncludeSchema).optional(),
}).strict();

export const ExerciseSelectSchema: z.ZodType<Prisma.ExerciseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  sets: z.boolean().optional(),
  reps: z.boolean().optional(),
  workoutDayId: z.boolean().optional(),
  WorkoutDay: z.union([z.boolean(),z.lazy(() => WorkoutDayArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  firstName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileNullableRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional().nullable(),
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  lastName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProfileWhereInputSchema: z.ZodType<Prisma.ProfileWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  age: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  activityLevel: z.union([ z.lazy(() => EnumActivityLevelFilterSchema),z.lazy(() => ActivityLevelSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => EnumExerciseExperienceFilterSchema),z.lazy(() => ExerciseExperienceSchema) ]).optional(),
  userID: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  goal: z.union([ z.lazy(() => GoalNullableRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
  workoutPlan: z.union([ z.lazy(() => WorkoutPlanNullableRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProfileOrderByWithRelationInputSchema: z.ZodType<Prisma.ProfileOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  activityLevel: z.lazy(() => SortOrderSchema).optional(),
  exerciseExperience: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  goal: z.lazy(() => GoalOrderByWithRelationInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanOrderByWithRelationInputSchema).optional()
}).strict();

export const ProfileWhereUniqueInputSchema: z.ZodType<Prisma.ProfileWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    userID: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    userID: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  userID: z.string().optional(),
  AND: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileWhereInputSchema),z.lazy(() => ProfileWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  age: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  height: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  activityLevel: z.union([ z.lazy(() => EnumActivityLevelFilterSchema),z.lazy(() => ActivityLevelSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => EnumExerciseExperienceFilterSchema),z.lazy(() => ExerciseExperienceSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  goal: z.union([ z.lazy(() => GoalNullableRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional().nullable(),
  workoutPlan: z.union([ z.lazy(() => WorkoutPlanNullableRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProfileOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProfileOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  activityLevel: z.lazy(() => SortOrderSchema).optional(),
  exerciseExperience: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProfileCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProfileAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProfileMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProfileMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProfileSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProfileScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProfileScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema),z.lazy(() => ProfileScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  age: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  gender: z.union([ z.lazy(() => EnumGenderWithAggregatesFilterSchema),z.lazy(() => GenderSchema) ]).optional(),
  height: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  weight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  activityLevel: z.union([ z.lazy(() => EnumActivityLevelWithAggregatesFilterSchema),z.lazy(() => ActivityLevelSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => EnumExerciseExperienceWithAggregatesFilterSchema),z.lazy(() => ExerciseExperienceSchema) ]).optional(),
  userID: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const GoalWhereInputSchema: z.ZodType<Prisma.GoalWhereInput> = z.object({
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  goalType: z.union([ z.lazy(() => EnumPrimaryGoalFilterSchema),z.lazy(() => PrimaryGoalSchema) ]).optional(),
  targetWeight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => EnumWorkoutFrequencyFilterSchema),z.lazy(() => WorkoutFrequencySchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => EnumWorkoutDurationFilterSchema),z.lazy(() => WorkoutDurationSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => EnumLocationPreferenceFilterSchema),z.lazy(() => LocationPreferenceSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict();

export const GoalOrderByWithRelationInputSchema: z.ZodType<Prisma.GoalOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  goalType: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  workoutFrequency: z.lazy(() => SortOrderSchema).optional(),
  workoutDuration: z.lazy(() => SortOrderSchema).optional(),
  locationPreference: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional(),
  progress: z.lazy(() => ProgressOrderByRelationAggregateInputSchema).optional()
}).strict();

export const GoalWhereUniqueInputSchema: z.ZodType<Prisma.GoalWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    profileId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    profileId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  profileId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalWhereInputSchema),z.lazy(() => GoalWhereInputSchema).array() ]).optional(),
  goalType: z.union([ z.lazy(() => EnumPrimaryGoalFilterSchema),z.lazy(() => PrimaryGoalSchema) ]).optional(),
  targetWeight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => EnumWorkoutFrequencyFilterSchema),z.lazy(() => WorkoutFrequencySchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => EnumWorkoutDurationFilterSchema),z.lazy(() => WorkoutDurationSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => EnumLocationPreferenceFilterSchema),z.lazy(() => LocationPreferenceSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressListRelationFilterSchema).optional()
}).strict());

export const GoalOrderByWithAggregationInputSchema: z.ZodType<Prisma.GoalOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  goalType: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  workoutFrequency: z.lazy(() => SortOrderSchema).optional(),
  workoutDuration: z.lazy(() => SortOrderSchema).optional(),
  locationPreference: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => GoalCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => GoalAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => GoalMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => GoalMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => GoalSumOrderByAggregateInputSchema).optional()
}).strict();

export const GoalScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.GoalScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => GoalScalarWhereWithAggregatesInputSchema),z.lazy(() => GoalScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  goalType: z.union([ z.lazy(() => EnumPrimaryGoalWithAggregatesFilterSchema),z.lazy(() => PrimaryGoalSchema) ]).optional(),
  targetWeight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => EnumWorkoutFrequencyWithAggregatesFilterSchema),z.lazy(() => WorkoutFrequencySchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => EnumWorkoutDurationWithAggregatesFilterSchema),z.lazy(() => WorkoutDurationSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => EnumLocationPreferenceWithAggregatesFilterSchema),z.lazy(() => LocationPreferenceSchema) ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ProgressWhereInputSchema: z.ZodType<Prisma.ProgressWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  goalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  progressWeight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  goal: z.union([ z.lazy(() => GoalRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional(),
}).strict();

export const ProgressOrderByWithRelationInputSchema: z.ZodType<Prisma.ProgressOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  goal: z.lazy(() => GoalOrderByWithRelationInputSchema).optional()
}).strict();

export const ProgressWhereUniqueInputSchema: z.ZodType<Prisma.ProgressWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressWhereInputSchema),z.lazy(() => ProgressWhereInputSchema).array() ]).optional(),
  goalId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  progressWeight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  goal: z.union([ z.lazy(() => GoalRelationFilterSchema),z.lazy(() => GoalWhereInputSchema) ]).optional(),
}).strict());

export const ProgressOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProgressOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProgressCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ProgressAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProgressMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProgressMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ProgressSumOrderByAggregateInputSchema).optional()
}).strict();

export const ProgressScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProgressScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema),z.lazy(() => ProgressScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  goalId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  progressWeight: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const WorkoutPlanWhereInputSchema: z.ZodType<Prisma.WorkoutPlanWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  workouts: z.lazy(() => WorkoutDayListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutPlanOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  workouts: z.lazy(() => WorkoutDayOrderByRelationAggregateInputSchema).optional(),
  profile: z.lazy(() => ProfileOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkoutPlanWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutPlanWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    profileId: z.number().int()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    profileId: z.number().int(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  profileId: z.number().int().optional(),
  AND: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanWhereInputSchema),z.lazy(() => WorkoutPlanWhereInputSchema).array() ]).optional(),
  workouts: z.lazy(() => WorkoutDayListRelationFilterSchema).optional(),
  profile: z.union([ z.lazy(() => ProfileRelationFilterSchema),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
}).strict());

export const WorkoutPlanOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutPlanOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutPlanCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutPlanAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutPlanMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutPlanMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutPlanSumOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutPlanScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutPlanScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutPlanScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  profileId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const WorkoutDayWhereInputSchema: z.ZodType<Prisma.WorkoutDayWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  WorkoutPlanId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  exercises: z.lazy(() => ExerciseListRelationFilterSchema).optional(),
  WorkoutPlan: z.union([ z.lazy(() => WorkoutPlanRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
}).strict();

export const WorkoutDayOrderByWithRelationInputSchema: z.ZodType<Prisma.WorkoutDayOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  workoutType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional(),
  exercises: z.lazy(() => ExerciseOrderByRelationAggregateInputSchema).optional(),
  WorkoutPlan: z.lazy(() => WorkoutPlanOrderByWithRelationInputSchema).optional()
}).strict();

export const WorkoutDayWhereUniqueInputSchema: z.ZodType<Prisma.WorkoutDayWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayWhereInputSchema),z.lazy(() => WorkoutDayWhereInputSchema).array() ]).optional(),
  day: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  WorkoutPlanId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  exercises: z.lazy(() => ExerciseListRelationFilterSchema).optional(),
  WorkoutPlan: z.union([ z.lazy(() => WorkoutPlanRelationFilterSchema),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
}).strict());

export const WorkoutDayOrderByWithAggregationInputSchema: z.ZodType<Prisma.WorkoutDayOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  workoutType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => WorkoutDayCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => WorkoutDayAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => WorkoutDayMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => WorkoutDayMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => WorkoutDaySumOrderByAggregateInputSchema).optional()
}).strict();

export const WorkoutDayScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.WorkoutDayScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema),z.lazy(() => WorkoutDayScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workoutType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  WorkoutPlanId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ExerciseWhereInputSchema: z.ZodType<Prisma.ExerciseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutDayId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  WorkoutDay: z.union([ z.lazy(() => WorkoutDayRelationFilterSchema),z.lazy(() => WorkoutDayWhereInputSchema) ]).optional(),
}).strict();

export const ExerciseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional(),
  WorkoutDay: z.lazy(() => WorkoutDayOrderByWithRelationInputSchema).optional()
}).strict();

export const ExerciseWhereUniqueInputSchema: z.ZodType<Prisma.ExerciseWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseWhereInputSchema),z.lazy(() => ExerciseWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  reps: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutDayId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  WorkoutDay: z.union([ z.lazy(() => WorkoutDayRelationFilterSchema),z.lazy(() => WorkoutDayWhereInputSchema) ]).optional(),
}).strict());

export const ExerciseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExerciseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExerciseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExerciseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExerciseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExerciseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExerciseSumOrderByAggregateInputSchema).optional()
}).strict();

export const ExerciseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExerciseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExerciseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sets: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  workoutDayId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  profile: z.lazy(() => ProfileUncheckedCreateNestedOneWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUncheckedUpdateOneWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileCreateInputSchema: z.ZodType<Prisma.ProfileCreateInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  goal: z.lazy(() => GoalCreateNestedOneWithoutProfileInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  userID: z.string(),
  goal: z.lazy(() => GoalUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUpdateInputSchema: z.ZodType<Prisma.ProfileUpdateInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutProfileNestedInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  userID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileCreateManyInputSchema: z.ZodType<Prisma.ProfileCreateManyInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  userID: z.string()
}).strict();

export const ProfileUpdateManyMutationInputSchema: z.ZodType<Prisma.ProfileUpdateManyMutationInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  userID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalCreateInputSchema: z.ZodType<Prisma.GoalCreateInput> = z.object({
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutGoalInputSchema),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateInputSchema: z.ZodType<Prisma.GoalUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int(),
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUpdateInputSchema: z.ZodType<Prisma.GoalUpdateInput> = z.object({
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutGoalNestedInputSchema).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalCreateManyInputSchema: z.ZodType<Prisma.GoalCreateManyInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int(),
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GoalUpdateManyMutationInputSchema: z.ZodType<Prisma.GoalUpdateManyMutationInput> = z.object({
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalUncheckedUpdateManyInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateInputSchema: z.ZodType<Prisma.ProgressCreateInput> = z.object({
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  goal: z.lazy(() => GoalCreateNestedOneWithoutProgressInputSchema)
}).strict();

export const ProgressUncheckedCreateInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  goalId: z.number().int(),
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateInputSchema: z.ZodType<Prisma.ProgressUpdateInput> = z.object({
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUpdateOneRequiredWithoutProgressNestedInputSchema).optional()
}).strict();

export const ProgressUncheckedUpdateInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateManyInputSchema: z.ZodType<Prisma.ProgressCreateManyInput> = z.object({
  id: z.number().int().optional(),
  goalId: z.number().int(),
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateManyMutationInputSchema: z.ZodType<Prisma.ProgressUpdateManyMutationInput> = z.object({
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanCreateInputSchema: z.ZodType<Prisma.WorkoutPlanCreateInput> = z.object({
  workouts: z.lazy(() => WorkoutDayCreateNestedManyWithoutWorkoutPlanInputSchema).optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutWorkoutPlanInputSchema)
}).strict();

export const WorkoutPlanUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int(),
  workouts: z.lazy(() => WorkoutDayUncheckedCreateNestedManyWithoutWorkoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanUpdateInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateInput> = z.object({
  workouts: z.lazy(() => WorkoutDayUpdateManyWithoutWorkoutPlanNestedInputSchema).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutWorkoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanCreateManyInputSchema: z.ZodType<Prisma.WorkoutPlanCreateManyInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int()
}).strict();

export const WorkoutPlanUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyMutationInput> = z.object({
}).strict();

export const WorkoutPlanUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayCreateInputSchema: z.ZodType<Prisma.WorkoutDayCreateInput> = z.object({
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  exercises: z.lazy(() => ExerciseCreateNestedManyWithoutWorkoutDayInputSchema).optional(),
  WorkoutPlan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutWorkoutsInputSchema)
}).strict();

export const WorkoutDayUncheckedCreateInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  WorkoutPlanId: z.number().int(),
  exercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutWorkoutDayInputSchema).optional()
}).strict();

export const WorkoutDayUpdateInputSchema: z.ZodType<Prisma.WorkoutDayUpdateInput> = z.object({
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => ExerciseUpdateManyWithoutWorkoutDayNestedInputSchema).optional(),
  WorkoutPlan: z.lazy(() => WorkoutPlanUpdateOneRequiredWithoutWorkoutsNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  WorkoutPlanId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutWorkoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayCreateManyInputSchema: z.ZodType<Prisma.WorkoutDayCreateManyInput> = z.object({
  id: z.number().int().optional(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  WorkoutPlanId: z.number().int()
}).strict();

export const WorkoutDayUpdateManyMutationInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyMutationInput> = z.object({
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayUncheckedUpdateManyInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  WorkoutPlanId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateInputSchema: z.ZodType<Prisma.ExerciseCreateInput> = z.object({
  name: z.string(),
  sets: z.number().int(),
  reps: z.string(),
  WorkoutDay: z.lazy(() => WorkoutDayCreateNestedOneWithoutExercisesInputSchema)
}).strict();

export const ExerciseUncheckedCreateInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  sets: z.number().int(),
  reps: z.string(),
  workoutDayId: z.number().int()
}).strict();

export const ExerciseUpdateInputSchema: z.ZodType<Prisma.ExerciseUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  WorkoutDay: z.lazy(() => WorkoutDayUpdateOneRequiredWithoutExercisesNestedInputSchema).optional()
}).strict();

export const ExerciseUncheckedUpdateInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDayId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateManyInputSchema: z.ZodType<Prisma.ExerciseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  sets: z.number().int(),
  reps: z.string(),
  workoutDayId: z.number().int()
}).strict();

export const ExerciseUpdateManyMutationInputSchema: z.ZodType<Prisma.ExerciseUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDayId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const ProfileNullableRelationFilterSchema: z.ZodType<Prisma.ProfileNullableRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional().nullable()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const EnumGenderFilterSchema: z.ZodType<Prisma.EnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const EnumActivityLevelFilterSchema: z.ZodType<Prisma.EnumActivityLevelFilter> = z.object({
  equals: z.lazy(() => ActivityLevelSchema).optional(),
  in: z.lazy(() => ActivityLevelSchema).array().optional(),
  notIn: z.lazy(() => ActivityLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => NestedEnumActivityLevelFilterSchema) ]).optional(),
}).strict();

export const EnumExerciseExperienceFilterSchema: z.ZodType<Prisma.EnumExerciseExperienceFilter> = z.object({
  equals: z.lazy(() => ExerciseExperienceSchema).optional(),
  in: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  notIn: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => NestedEnumExerciseExperienceFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const GoalNullableRelationFilterSchema: z.ZodType<Prisma.GoalNullableRelationFilter> = z.object({
  is: z.lazy(() => GoalWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => GoalWhereInputSchema).optional().nullable()
}).strict();

export const WorkoutPlanNullableRelationFilterSchema: z.ZodType<Prisma.WorkoutPlanNullableRelationFilter> = z.object({
  is: z.lazy(() => WorkoutPlanWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => WorkoutPlanWhereInputSchema).optional().nullable()
}).strict();

export const ProfileCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  activityLevel: z.lazy(() => SortOrderSchema).optional(),
  exerciseExperience: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  activityLevel: z.lazy(() => SortOrderSchema).optional(),
  exerciseExperience: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional(),
  activityLevel: z.lazy(() => SortOrderSchema).optional(),
  exerciseExperience: z.lazy(() => SortOrderSchema).optional(),
  userID: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProfileSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  age: z.lazy(() => SortOrderSchema).optional(),
  height: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const EnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.EnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const EnumActivityLevelWithAggregatesFilterSchema: z.ZodType<Prisma.EnumActivityLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActivityLevelSchema).optional(),
  in: z.lazy(() => ActivityLevelSchema).array().optional(),
  notIn: z.lazy(() => ActivityLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => NestedEnumActivityLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActivityLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActivityLevelFilterSchema).optional()
}).strict();

export const EnumExerciseExperienceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumExerciseExperienceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ExerciseExperienceSchema).optional(),
  in: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  notIn: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => NestedEnumExerciseExperienceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExerciseExperienceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExerciseExperienceFilterSchema).optional()
}).strict();

export const EnumPrimaryGoalFilterSchema: z.ZodType<Prisma.EnumPrimaryGoalFilter> = z.object({
  equals: z.lazy(() => PrimaryGoalSchema).optional(),
  in: z.lazy(() => PrimaryGoalSchema).array().optional(),
  notIn: z.lazy(() => PrimaryGoalSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => NestedEnumPrimaryGoalFilterSchema) ]).optional(),
}).strict();

export const EnumWorkoutFrequencyFilterSchema: z.ZodType<Prisma.EnumWorkoutFrequencyFilter> = z.object({
  equals: z.lazy(() => WorkoutFrequencySchema).optional(),
  in: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  notIn: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema) ]).optional(),
}).strict();

export const EnumWorkoutDurationFilterSchema: z.ZodType<Prisma.EnumWorkoutDurationFilter> = z.object({
  equals: z.lazy(() => WorkoutDurationSchema).optional(),
  in: z.lazy(() => WorkoutDurationSchema).array().optional(),
  notIn: z.lazy(() => WorkoutDurationSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => NestedEnumWorkoutDurationFilterSchema) ]).optional(),
}).strict();

export const EnumLocationPreferenceFilterSchema: z.ZodType<Prisma.EnumLocationPreferenceFilter> = z.object({
  equals: z.lazy(() => LocationPreferenceSchema).optional(),
  in: z.lazy(() => LocationPreferenceSchema).array().optional(),
  notIn: z.lazy(() => LocationPreferenceSchema).array().optional(),
  not: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => NestedEnumLocationPreferenceFilterSchema) ]).optional(),
}).strict();

export const ProfileRelationFilterSchema: z.ZodType<Prisma.ProfileRelationFilter> = z.object({
  is: z.lazy(() => ProfileWhereInputSchema).optional(),
  isNot: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProgressListRelationFilterSchema: z.ZodType<Prisma.ProgressListRelationFilter> = z.object({
  every: z.lazy(() => ProgressWhereInputSchema).optional(),
  some: z.lazy(() => ProgressWhereInputSchema).optional(),
  none: z.lazy(() => ProgressWhereInputSchema).optional()
}).strict();

export const ProgressOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProgressOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalCountOrderByAggregateInputSchema: z.ZodType<Prisma.GoalCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  goalType: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  workoutFrequency: z.lazy(() => SortOrderSchema).optional(),
  workoutDuration: z.lazy(() => SortOrderSchema).optional(),
  locationPreference: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalAvgOrderByAggregateInputSchema: z.ZodType<Prisma.GoalAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMaxOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  goalType: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  workoutFrequency: z.lazy(() => SortOrderSchema).optional(),
  workoutDuration: z.lazy(() => SortOrderSchema).optional(),
  locationPreference: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalMinOrderByAggregateInputSchema: z.ZodType<Prisma.GoalMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  goalType: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional(),
  workoutFrequency: z.lazy(() => SortOrderSchema).optional(),
  workoutDuration: z.lazy(() => SortOrderSchema).optional(),
  locationPreference: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const GoalSumOrderByAggregateInputSchema: z.ZodType<Prisma.GoalSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional(),
  targetWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumPrimaryGoalWithAggregatesFilterSchema: z.ZodType<Prisma.EnumPrimaryGoalWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrimaryGoalSchema).optional(),
  in: z.lazy(() => PrimaryGoalSchema).array().optional(),
  notIn: z.lazy(() => PrimaryGoalSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => NestedEnumPrimaryGoalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrimaryGoalFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrimaryGoalFilterSchema).optional()
}).strict();

export const EnumWorkoutFrequencyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumWorkoutFrequencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutFrequencySchema).optional(),
  in: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  notIn: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => NestedEnumWorkoutFrequencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema).optional()
}).strict();

export const EnumWorkoutDurationWithAggregatesFilterSchema: z.ZodType<Prisma.EnumWorkoutDurationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutDurationSchema).optional(),
  in: z.lazy(() => WorkoutDurationSchema).array().optional(),
  notIn: z.lazy(() => WorkoutDurationSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => NestedEnumWorkoutDurationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutDurationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutDurationFilterSchema).optional()
}).strict();

export const EnumLocationPreferenceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumLocationPreferenceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LocationPreferenceSchema).optional(),
  in: z.lazy(() => LocationPreferenceSchema).array().optional(),
  notIn: z.lazy(() => LocationPreferenceSchema).array().optional(),
  not: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => NestedEnumLocationPreferenceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLocationPreferenceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLocationPreferenceFilterSchema).optional()
}).strict();

export const GoalRelationFilterSchema: z.ZodType<Prisma.GoalRelationFilter> = z.object({
  is: z.lazy(() => GoalWhereInputSchema).optional(),
  isNot: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const ProgressCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProgressSumOrderByAggregateInputSchema: z.ZodType<Prisma.ProgressSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  goalId: z.lazy(() => SortOrderSchema).optional(),
  progressWeight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayListRelationFilterSchema: z.ZodType<Prisma.WorkoutDayListRelationFilter> = z.object({
  every: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  some: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  none: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const WorkoutDayOrderByRelationAggregateInputSchema: z.ZodType<Prisma.WorkoutDayOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutPlanSumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutPlanSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  profileId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseListRelationFilterSchema: z.ZodType<Prisma.ExerciseListRelationFilter> = z.object({
  every: z.lazy(() => ExerciseWhereInputSchema).optional(),
  some: z.lazy(() => ExerciseWhereInputSchema).optional(),
  none: z.lazy(() => ExerciseWhereInputSchema).optional()
}).strict();

export const WorkoutPlanRelationFilterSchema: z.ZodType<Prisma.WorkoutPlanRelationFilter> = z.object({
  is: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const ExerciseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExerciseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayCountOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  workoutType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayAvgOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayMaxOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  workoutType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayMinOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDayMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  day: z.lazy(() => SortOrderSchema).optional(),
  workoutType: z.lazy(() => SortOrderSchema).optional(),
  notes: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDaySumOrderByAggregateInputSchema: z.ZodType<Prisma.WorkoutDaySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  WorkoutPlanId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const WorkoutDayRelationFilterSchema: z.ZodType<Prisma.WorkoutDayRelationFilter> = z.object({
  is: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  isNot: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const ExerciseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  reps: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExerciseSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExerciseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sets: z.lazy(() => SortOrderSchema).optional(),
  workoutDayId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProfileCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const ProfileUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const ProfileUncheckedUpdateOneWithoutUserNestedInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateOneWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutUserInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => ProfileWhereInputSchema) ]).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutUserInputSchema),z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const GoalCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.GoalCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutPlanCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional()
}).strict();

export const GoalUncheckedCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.GoalUncheckedCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedCreateNestedOneWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateNestedOneWithoutProfileInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional()
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumGenderFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumGenderFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => GenderSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const EnumActivityLevelFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumActivityLevelFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ActivityLevelSchema).optional()
}).strict();

export const EnumExerciseExperienceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumExerciseExperienceFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ExerciseExperienceSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutProfileNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProfileInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const GoalUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.GoalUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => GoalUpdateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => WorkoutPlanUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUpdateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const GoalUncheckedUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => GoalWhereInputSchema) ]).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => GoalUpdateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const WorkoutPlanUncheckedUpdateOneWithoutProfileNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateOneWithoutProfileNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutProfileInputSchema).optional(),
  upsert: z.lazy(() => WorkoutPlanUpsertWithoutProfileInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => WorkoutPlanWhereInputSchema) ]).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateToOneWithWhereWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUpdateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutProfileInputSchema) ]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutGoalInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutGoalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutGoalInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const ProgressCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.ProgressCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressCreateWithoutGoalInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedCreateNestedManyWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateNestedManyWithoutGoalInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressCreateWithoutGoalInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyGoalInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EnumPrimaryGoalFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumPrimaryGoalFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => PrimaryGoalSchema).optional()
}).strict();

export const EnumWorkoutFrequencyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWorkoutFrequencyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WorkoutFrequencySchema).optional()
}).strict();

export const EnumWorkoutDurationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumWorkoutDurationFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => WorkoutDurationSchema).optional()
}).strict();

export const EnumLocationPreferenceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumLocationPreferenceFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => LocationPreferenceSchema).optional()
}).strict();

export const ProfileUpdateOneRequiredWithoutGoalNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutGoalInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutGoalInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutGoalInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutGoalInputSchema),z.lazy(() => ProfileUpdateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutGoalInputSchema) ]).optional(),
}).strict();

export const ProgressUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressCreateWithoutGoalInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutGoalNestedInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutGoalNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressCreateWithoutGoalInputSchema).array(),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema),z.lazy(() => ProgressCreateOrConnectWithoutGoalInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProgressUpsertWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => ProgressUpsertWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProgressCreateManyGoalInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProgressWhereUniqueInputSchema),z.lazy(() => ProgressWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProgressUpdateWithWhereUniqueWithoutGoalInputSchema),z.lazy(() => ProgressUpdateWithWhereUniqueWithoutGoalInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProgressUpdateManyWithWhereWithoutGoalInputSchema),z.lazy(() => ProgressUpdateManyWithWhereWithoutGoalInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const GoalCreateNestedOneWithoutProgressInputSchema: z.ZodType<Prisma.GoalCreateNestedOneWithoutProgressInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional()
}).strict();

export const GoalUpdateOneRequiredWithoutProgressNestedInputSchema: z.ZodType<Prisma.GoalUpdateOneRequiredWithoutProgressNestedInput> = z.object({
  create: z.union([ z.lazy(() => GoalCreateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProgressInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => GoalCreateOrConnectWithoutProgressInputSchema).optional(),
  upsert: z.lazy(() => GoalUpsertWithoutProgressInputSchema).optional(),
  connect: z.lazy(() => GoalWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => GoalUpdateToOneWithWhereWithoutProgressInputSchema),z.lazy(() => GoalUpdateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProgressInputSchema) ]).optional(),
}).strict();

export const WorkoutDayCreateNestedManyWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateNestedManyWithoutWorkoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProfileCreateNestedOneWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileCreateNestedOneWithoutWorkoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutWorkoutPlanInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutWorkoutPlanInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedCreateNestedManyWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateNestedManyWithoutWorkoutPlanInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayUpdateManyWithoutWorkoutPlanNestedInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyWithoutWorkoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProfileUpdateOneRequiredWithoutWorkoutPlanNestedInputSchema: z.ZodType<Prisma.ProfileUpdateOneRequiredWithoutWorkoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProfileCreateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutWorkoutPlanInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProfileCreateOrConnectWithoutWorkoutPlanInputSchema).optional(),
  upsert: z.lazy(() => ProfileUpsertWithoutWorkoutPlanInputSchema).optional(),
  connect: z.lazy(() => ProfileWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProfileUpdateToOneWithWhereWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUpdateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutWorkoutPlanInputSchema) ]).optional(),
}).strict();

export const WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanNestedInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema).array(),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInputSchema).array() ]).optional(),
  createMany: z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => WorkoutDayWhereUniqueInputSchema),z.lazy(() => WorkoutDayWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExerciseCreateNestedManyWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateNestedManyWithoutWorkoutDayInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyWorkoutDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanCreateNestedOneWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanCreateNestedOneWithoutWorkoutsInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional()
}).strict();

export const ExerciseUncheckedCreateNestedManyWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateNestedManyWithoutWorkoutDayInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyWorkoutDayInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExerciseUpdateManyWithoutWorkoutDayNestedInputSchema: z.ZodType<Prisma.ExerciseUpdateManyWithoutWorkoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyWorkoutDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExerciseUpdateManyWithWhereWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpdateManyWithWhereWithoutWorkoutDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutPlanUpdateOneRequiredWithoutWorkoutsNestedInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateOneRequiredWithoutWorkoutsNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutPlanCreateOrConnectWithoutWorkoutsInputSchema).optional(),
  upsert: z.lazy(() => WorkoutPlanUpsertWithoutWorkoutsInputSchema).optional(),
  connect: z.lazy(() => WorkoutPlanWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutPlanUpdateToOneWithWhereWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUpdateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutsInputSchema) ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyWithoutWorkoutDayNestedInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutWorkoutDayNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema).array(),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseCreateOrConnectWithoutWorkoutDayInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExerciseCreateManyWorkoutDayInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExerciseWhereUniqueInputSchema),z.lazy(() => ExerciseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExerciseUpdateManyWithWhereWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUpdateManyWithWhereWithoutWorkoutDayInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const WorkoutDayCreateNestedOneWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateNestedOneWithoutExercisesInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutDayCreateOrConnectWithoutExercisesInputSchema).optional(),
  connect: z.lazy(() => WorkoutDayWhereUniqueInputSchema).optional()
}).strict();

export const WorkoutDayUpdateOneRequiredWithoutExercisesNestedInputSchema: z.ZodType<Prisma.WorkoutDayUpdateOneRequiredWithoutExercisesNestedInput> = z.object({
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => WorkoutDayCreateOrConnectWithoutExercisesInputSchema).optional(),
  upsert: z.lazy(() => WorkoutDayUpsertWithoutExercisesInputSchema).optional(),
  connect: z.lazy(() => WorkoutDayWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => WorkoutDayUpdateToOneWithWhereWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumGenderFilterSchema: z.ZodType<Prisma.NestedEnumGenderFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumActivityLevelFilterSchema: z.ZodType<Prisma.NestedEnumActivityLevelFilter> = z.object({
  equals: z.lazy(() => ActivityLevelSchema).optional(),
  in: z.lazy(() => ActivityLevelSchema).array().optional(),
  notIn: z.lazy(() => ActivityLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => NestedEnumActivityLevelFilterSchema) ]).optional(),
}).strict();

export const NestedEnumExerciseExperienceFilterSchema: z.ZodType<Prisma.NestedEnumExerciseExperienceFilter> = z.object({
  equals: z.lazy(() => ExerciseExperienceSchema).optional(),
  in: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  notIn: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => NestedEnumExerciseExperienceFilterSchema) ]).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedEnumGenderWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumGenderWithAggregatesFilter> = z.object({
  equals: z.lazy(() => GenderSchema).optional(),
  in: z.lazy(() => GenderSchema).array().optional(),
  notIn: z.lazy(() => GenderSchema).array().optional(),
  not: z.union([ z.lazy(() => GenderSchema),z.lazy(() => NestedEnumGenderWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumGenderFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumGenderFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedEnumActivityLevelWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumActivityLevelWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ActivityLevelSchema).optional(),
  in: z.lazy(() => ActivityLevelSchema).array().optional(),
  notIn: z.lazy(() => ActivityLevelSchema).array().optional(),
  not: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => NestedEnumActivityLevelWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumActivityLevelFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumActivityLevelFilterSchema).optional()
}).strict();

export const NestedEnumExerciseExperienceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumExerciseExperienceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ExerciseExperienceSchema).optional(),
  in: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  notIn: z.lazy(() => ExerciseExperienceSchema).array().optional(),
  not: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => NestedEnumExerciseExperienceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumExerciseExperienceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumExerciseExperienceFilterSchema).optional()
}).strict();

export const NestedEnumPrimaryGoalFilterSchema: z.ZodType<Prisma.NestedEnumPrimaryGoalFilter> = z.object({
  equals: z.lazy(() => PrimaryGoalSchema).optional(),
  in: z.lazy(() => PrimaryGoalSchema).array().optional(),
  notIn: z.lazy(() => PrimaryGoalSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => NestedEnumPrimaryGoalFilterSchema) ]).optional(),
}).strict();

export const NestedEnumWorkoutFrequencyFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutFrequencyFilter> = z.object({
  equals: z.lazy(() => WorkoutFrequencySchema).optional(),
  in: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  notIn: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema) ]).optional(),
}).strict();

export const NestedEnumWorkoutDurationFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutDurationFilter> = z.object({
  equals: z.lazy(() => WorkoutDurationSchema).optional(),
  in: z.lazy(() => WorkoutDurationSchema).array().optional(),
  notIn: z.lazy(() => WorkoutDurationSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => NestedEnumWorkoutDurationFilterSchema) ]).optional(),
}).strict();

export const NestedEnumLocationPreferenceFilterSchema: z.ZodType<Prisma.NestedEnumLocationPreferenceFilter> = z.object({
  equals: z.lazy(() => LocationPreferenceSchema).optional(),
  in: z.lazy(() => LocationPreferenceSchema).array().optional(),
  notIn: z.lazy(() => LocationPreferenceSchema).array().optional(),
  not: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => NestedEnumLocationPreferenceFilterSchema) ]).optional(),
}).strict();

export const NestedEnumPrimaryGoalWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumPrimaryGoalWithAggregatesFilter> = z.object({
  equals: z.lazy(() => PrimaryGoalSchema).optional(),
  in: z.lazy(() => PrimaryGoalSchema).array().optional(),
  notIn: z.lazy(() => PrimaryGoalSchema).array().optional(),
  not: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => NestedEnumPrimaryGoalWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumPrimaryGoalFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumPrimaryGoalFilterSchema).optional()
}).strict();

export const NestedEnumWorkoutFrequencyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutFrequencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutFrequencySchema).optional(),
  in: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  notIn: z.lazy(() => WorkoutFrequencySchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => NestedEnumWorkoutFrequencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutFrequencyFilterSchema).optional()
}).strict();

export const NestedEnumWorkoutDurationWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumWorkoutDurationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => WorkoutDurationSchema).optional(),
  in: z.lazy(() => WorkoutDurationSchema).array().optional(),
  notIn: z.lazy(() => WorkoutDurationSchema).array().optional(),
  not: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => NestedEnumWorkoutDurationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumWorkoutDurationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumWorkoutDurationFilterSchema).optional()
}).strict();

export const NestedEnumLocationPreferenceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumLocationPreferenceWithAggregatesFilter> = z.object({
  equals: z.lazy(() => LocationPreferenceSchema).optional(),
  in: z.lazy(() => LocationPreferenceSchema).array().optional(),
  notIn: z.lazy(() => LocationPreferenceSchema).array().optional(),
  not: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => NestedEnumLocationPreferenceWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumLocationPreferenceFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumLocationPreferenceFilterSchema).optional()
}).strict();

export const ProfileCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateWithoutUserInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  goal: z.lazy(() => GoalCreateNestedOneWithoutProfileInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  goal: z.lazy(() => GoalUncheckedCreateNestedOneWithoutProfileInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProfileUpsertWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutUserInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutUserInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutUserInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutProfileNestedInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUncheckedUpdateOneWithoutProfileNestedInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateWithoutProfileInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string()
}).strict();

export const UserUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProfileInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string()
}).strict();

export const UserCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const GoalCreateWithoutProfileInputSchema: z.ZodType<Prisma.GoalCreateWithoutProfileInput> = z.object({
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutProfileInput> = z.object({
  id: z.number().int().optional(),
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  progress: z.lazy(() => ProgressUncheckedCreateNestedManyWithoutGoalInputSchema).optional()
}).strict();

export const GoalCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const WorkoutPlanCreateWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanCreateWithoutProfileInput> = z.object({
  workouts: z.lazy(() => WorkoutDayCreateNestedManyWithoutWorkoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedCreateWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateWithoutProfileInput> = z.object({
  id: z.number().int().optional(),
  workouts: z.lazy(() => WorkoutDayUncheckedCreateNestedManyWithoutWorkoutPlanInputSchema).optional()
}).strict();

export const WorkoutPlanCreateOrConnectWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanCreateOrConnectWithoutProfileInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpsertWithoutProfileInputSchema: z.ZodType<Prisma.UserUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProfileInputSchema),z.lazy(() => UserUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProfileInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const UserUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lastName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const GoalUpsertWithoutProfileInputSchema: z.ZodType<Prisma.GoalUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => GoalUpdateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.GoalUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => GoalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GoalUpdateWithoutProfileInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const GoalUpdateWithoutProfileInputSchema: z.ZodType<Prisma.GoalUpdateWithoutProfileInput> = z.object({
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  progress: z.lazy(() => ProgressUncheckedUpdateManyWithoutGoalNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUpsertWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUpsertWithoutProfileInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutProfileInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutProfileInputSchema) ]),
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const WorkoutPlanUpdateToOneWithWhereWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateToOneWithWhereWithoutProfileInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutProfileInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutProfileInputSchema) ]),
}).strict();

export const WorkoutPlanUpdateWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateWithoutProfileInput> = z.object({
  workouts: z.lazy(() => WorkoutDayUpdateManyWithoutWorkoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateWithoutProfileInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateWithoutProfileInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  workouts: z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanNestedInputSchema).optional()
}).strict();

export const ProfileCreateWithoutGoalInputSchema: z.ZodType<Prisma.ProfileCreateWithoutGoalInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  workoutPlan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutGoalInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutGoalInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  userID: z.string(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutGoalInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutGoalInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const ProgressCreateWithoutGoalInputSchema: z.ZodType<Prisma.ProgressCreateWithoutGoalInput> = z.object({
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUncheckedCreateWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUncheckedCreateWithoutGoalInput> = z.object({
  id: z.number().int().optional(),
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressCreateOrConnectWithoutGoalInputSchema: z.ZodType<Prisma.ProgressCreateOrConnectWithoutGoalInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const ProgressCreateManyGoalInputEnvelopeSchema: z.ZodType<Prisma.ProgressCreateManyGoalInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProgressCreateManyGoalInputSchema),z.lazy(() => ProgressCreateManyGoalInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileUpsertWithoutGoalInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutGoalInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutGoalInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutGoalInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutGoalInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutGoalInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutGoalInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutGoalInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutGoalInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutGoalInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutGoalInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  userID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutPlan: z.lazy(() => WorkoutPlanUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProgressUpsertWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUpsertWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProgressUpdateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutGoalInputSchema) ]),
  create: z.union([ z.lazy(() => ProgressCreateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedCreateWithoutGoalInputSchema) ]),
}).strict();

export const ProgressUpdateWithWhereUniqueWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUpdateWithWhereUniqueWithoutGoalInput> = z.object({
  where: z.lazy(() => ProgressWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateWithoutGoalInputSchema),z.lazy(() => ProgressUncheckedUpdateWithoutGoalInputSchema) ]),
}).strict();

export const ProgressUpdateManyWithWhereWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUpdateManyWithWhereWithoutGoalInput> = z.object({
  where: z.lazy(() => ProgressScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProgressUpdateManyMutationInputSchema),z.lazy(() => ProgressUncheckedUpdateManyWithoutGoalInputSchema) ]),
}).strict();

export const ProgressScalarWhereInputSchema: z.ZodType<Prisma.ProgressScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProgressScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProgressScalarWhereInputSchema),z.lazy(() => ProgressScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  goalId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  progressWeight: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const GoalCreateWithoutProgressInputSchema: z.ZodType<Prisma.GoalCreateWithoutProgressInput> = z.object({
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profile: z.lazy(() => ProfileCreateNestedOneWithoutGoalInputSchema)
}).strict();

export const GoalUncheckedCreateWithoutProgressInputSchema: z.ZodType<Prisma.GoalUncheckedCreateWithoutProgressInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int(),
  goalType: z.lazy(() => PrimaryGoalSchema),
  targetWeight: z.number(),
  workoutFrequency: z.lazy(() => WorkoutFrequencySchema),
  workoutDuration: z.lazy(() => WorkoutDurationSchema),
  locationPreference: z.lazy(() => LocationPreferenceSchema),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const GoalCreateOrConnectWithoutProgressInputSchema: z.ZodType<Prisma.GoalCreateOrConnectWithoutProgressInput> = z.object({
  where: z.lazy(() => GoalWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => GoalCreateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProgressInputSchema) ]),
}).strict();

export const GoalUpsertWithoutProgressInputSchema: z.ZodType<Prisma.GoalUpsertWithoutProgressInput> = z.object({
  update: z.union([ z.lazy(() => GoalUpdateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProgressInputSchema) ]),
  create: z.union([ z.lazy(() => GoalCreateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedCreateWithoutProgressInputSchema) ]),
  where: z.lazy(() => GoalWhereInputSchema).optional()
}).strict();

export const GoalUpdateToOneWithWhereWithoutProgressInputSchema: z.ZodType<Prisma.GoalUpdateToOneWithWhereWithoutProgressInput> = z.object({
  where: z.lazy(() => GoalWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => GoalUpdateWithoutProgressInputSchema),z.lazy(() => GoalUncheckedUpdateWithoutProgressInputSchema) ]),
}).strict();

export const GoalUpdateWithoutProgressInputSchema: z.ZodType<Prisma.GoalUpdateWithoutProgressInput> = z.object({
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutGoalNestedInputSchema).optional()
}).strict();

export const GoalUncheckedUpdateWithoutProgressInputSchema: z.ZodType<Prisma.GoalUncheckedUpdateWithoutProgressInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  goalType: z.union([ z.lazy(() => PrimaryGoalSchema),z.lazy(() => EnumPrimaryGoalFieldUpdateOperationsInputSchema) ]).optional(),
  targetWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  workoutFrequency: z.union([ z.lazy(() => WorkoutFrequencySchema),z.lazy(() => EnumWorkoutFrequencyFieldUpdateOperationsInputSchema) ]).optional(),
  workoutDuration: z.union([ z.lazy(() => WorkoutDurationSchema),z.lazy(() => EnumWorkoutDurationFieldUpdateOperationsInputSchema) ]).optional(),
  locationPreference: z.union([ z.lazy(() => LocationPreferenceSchema),z.lazy(() => EnumLocationPreferenceFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayCreateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateWithoutWorkoutPlanInput> = z.object({
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  exercises: z.lazy(() => ExerciseCreateNestedManyWithoutWorkoutDayInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateWithoutWorkoutPlanInput> = z.object({
  id: z.number().int().optional(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  exercises: z.lazy(() => ExerciseUncheckedCreateNestedManyWithoutWorkoutDayInputSchema).optional()
}).strict();

export const WorkoutDayCreateOrConnectWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateOrConnectWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayCreateManyWorkoutPlanInputEnvelopeSchema: z.ZodType<Prisma.WorkoutDayCreateManyWorkoutPlanInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputSchema),z.lazy(() => WorkoutDayCreateManyWorkoutPlanInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProfileCreateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileCreateWithoutWorkoutPlanInput> = z.object({
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutProfileInputSchema),
  goal: z.lazy(() => GoalCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileUncheckedCreateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileUncheckedCreateWithoutWorkoutPlanInput> = z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  age: z.number().int(),
  gender: z.lazy(() => GenderSchema),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.lazy(() => ActivityLevelSchema),
  exerciseExperience: z.lazy(() => ExerciseExperienceSchema),
  userID: z.string(),
  goal: z.lazy(() => GoalUncheckedCreateNestedOneWithoutProfileInputSchema).optional()
}).strict();

export const ProfileCreateOrConnectWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileCreateOrConnectWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => ProfileWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProfileCreateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpsertWithWhereUniqueWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutWorkoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithWhereUniqueWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayUpdateWithoutWorkoutPlanInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateManyWithWhereWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => WorkoutDayScalarWhereInputSchema),
  data: z.union([ z.lazy(() => WorkoutDayUpdateManyMutationInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const WorkoutDayScalarWhereInputSchema: z.ZodType<Prisma.WorkoutDayScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => WorkoutDayScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => WorkoutDayScalarWhereInputSchema),z.lazy(() => WorkoutDayScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  day: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  notes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  WorkoutPlanId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const ProfileUpsertWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileUpsertWithoutWorkoutPlanInput> = z.object({
  update: z.union([ z.lazy(() => ProfileUpdateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutWorkoutPlanInputSchema) ]),
  create: z.union([ z.lazy(() => ProfileCreateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedCreateWithoutWorkoutPlanInputSchema) ]),
  where: z.lazy(() => ProfileWhereInputSchema).optional()
}).strict();

export const ProfileUpdateToOneWithWhereWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileUpdateToOneWithWhereWithoutWorkoutPlanInput> = z.object({
  where: z.lazy(() => ProfileWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => ProfileUpdateWithoutWorkoutPlanInputSchema),z.lazy(() => ProfileUncheckedUpdateWithoutWorkoutPlanInputSchema) ]),
}).strict();

export const ProfileUpdateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileUpdateWithoutWorkoutPlanInput> = z.object({
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutProfileNestedInputSchema).optional(),
  goal: z.lazy(() => GoalUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ProfileUncheckedUpdateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.ProfileUncheckedUpdateWithoutWorkoutPlanInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  age: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => GenderSchema),z.lazy(() => EnumGenderFieldUpdateOperationsInputSchema) ]).optional(),
  height: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  activityLevel: z.union([ z.lazy(() => ActivityLevelSchema),z.lazy(() => EnumActivityLevelFieldUpdateOperationsInputSchema) ]).optional(),
  exerciseExperience: z.union([ z.lazy(() => ExerciseExperienceSchema),z.lazy(() => EnumExerciseExperienceFieldUpdateOperationsInputSchema) ]).optional(),
  userID: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  goal: z.lazy(() => GoalUncheckedUpdateOneWithoutProfileNestedInputSchema).optional()
}).strict();

export const ExerciseCreateWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateWithoutWorkoutDayInput> = z.object({
  name: z.string(),
  sets: z.number().int(),
  reps: z.string()
}).strict();

export const ExerciseUncheckedCreateWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUncheckedCreateWithoutWorkoutDayInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  sets: z.number().int(),
  reps: z.string()
}).strict();

export const ExerciseCreateOrConnectWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateOrConnectWithoutWorkoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema) ]),
}).strict();

export const ExerciseCreateManyWorkoutDayInputEnvelopeSchema: z.ZodType<Prisma.ExerciseCreateManyWorkoutDayInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExerciseCreateManyWorkoutDayInputSchema),z.lazy(() => ExerciseCreateManyWorkoutDayInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const WorkoutPlanCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanCreateWithoutWorkoutsInput> = z.object({
  profile: z.lazy(() => ProfileCreateNestedOneWithoutWorkoutPlanInputSchema)
}).strict();

export const WorkoutPlanUncheckedCreateWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedCreateWithoutWorkoutsInput> = z.object({
  id: z.number().int().optional(),
  profileId: z.number().int()
}).strict();

export const WorkoutPlanCreateOrConnectWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanCreateOrConnectWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutsInputSchema) ]),
}).strict();

export const ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUpsertWithWhereUniqueWithoutWorkoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutDayInputSchema) ]),
  create: z.union([ z.lazy(() => ExerciseCreateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedCreateWithoutWorkoutDayInputSchema) ]),
}).strict();

export const ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUpdateWithWhereUniqueWithoutWorkoutDayInput> = z.object({
  where: z.lazy(() => ExerciseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateWithoutWorkoutDayInputSchema),z.lazy(() => ExerciseUncheckedUpdateWithoutWorkoutDayInputSchema) ]),
}).strict();

export const ExerciseUpdateManyWithWhereWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUpdateManyWithWhereWithoutWorkoutDayInput> = z.object({
  where: z.lazy(() => ExerciseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExerciseUpdateManyMutationInputSchema),z.lazy(() => ExerciseUncheckedUpdateManyWithoutWorkoutDayInputSchema) ]),
}).strict();

export const ExerciseScalarWhereInputSchema: z.ZodType<Prisma.ExerciseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExerciseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExerciseScalarWhereInputSchema),z.lazy(() => ExerciseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sets: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  reps: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  workoutDayId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const WorkoutPlanUpsertWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanUpsertWithoutWorkoutsInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutsInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutPlanCreateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedCreateWithoutWorkoutsInputSchema) ]),
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional()
}).strict();

export const WorkoutPlanUpdateToOneWithWhereWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateToOneWithWhereWithoutWorkoutsInput> = z.object({
  where: z.lazy(() => WorkoutPlanWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutPlanUpdateWithoutWorkoutsInputSchema),z.lazy(() => WorkoutPlanUncheckedUpdateWithoutWorkoutsInputSchema) ]),
}).strict();

export const WorkoutPlanUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanUpdateWithoutWorkoutsInput> = z.object({
  profile: z.lazy(() => ProfileUpdateOneRequiredWithoutWorkoutPlanNestedInputSchema).optional()
}).strict();

export const WorkoutPlanUncheckedUpdateWithoutWorkoutsInputSchema: z.ZodType<Prisma.WorkoutPlanUncheckedUpdateWithoutWorkoutsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  profileId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayCreateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateWithoutExercisesInput> = z.object({
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  WorkoutPlan: z.lazy(() => WorkoutPlanCreateNestedOneWithoutWorkoutsInputSchema)
}).strict();

export const WorkoutDayUncheckedCreateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedCreateWithoutExercisesInput> = z.object({
  id: z.number().int().optional(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string(),
  WorkoutPlanId: z.number().int()
}).strict();

export const WorkoutDayCreateOrConnectWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayCreateOrConnectWithoutExercisesInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]),
}).strict();

export const WorkoutDayUpsertWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpsertWithoutExercisesInput> = z.object({
  update: z.union([ z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]),
  create: z.union([ z.lazy(() => WorkoutDayCreateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedCreateWithoutExercisesInputSchema) ]),
  where: z.lazy(() => WorkoutDayWhereInputSchema).optional()
}).strict();

export const WorkoutDayUpdateToOneWithWhereWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpdateToOneWithWhereWithoutExercisesInput> = z.object({
  where: z.lazy(() => WorkoutDayWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => WorkoutDayUpdateWithoutExercisesInputSchema),z.lazy(() => WorkoutDayUncheckedUpdateWithoutExercisesInputSchema) ]),
}).strict();

export const WorkoutDayUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithoutExercisesInput> = z.object({
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  WorkoutPlan: z.lazy(() => WorkoutPlanUpdateOneRequiredWithoutWorkoutsNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateWithoutExercisesInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateWithoutExercisesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  WorkoutPlanId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressCreateManyGoalInputSchema: z.ZodType<Prisma.ProgressCreateManyGoalInput> = z.object({
  id: z.number().int().optional(),
  progressWeight: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProgressUpdateWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUpdateWithoutGoalInput> = z.object({
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateWithoutGoalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProgressUncheckedUpdateManyWithoutGoalInputSchema: z.ZodType<Prisma.ProgressUncheckedUpdateManyWithoutGoalInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  progressWeight: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const WorkoutDayCreateManyWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayCreateManyWorkoutPlanInput> = z.object({
  id: z.number().int().optional(),
  day: z.string(),
  workoutType: z.string(),
  notes: z.string()
}).strict();

export const WorkoutDayUpdateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUpdateWithoutWorkoutPlanInput> = z.object({
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => ExerciseUpdateManyWithoutWorkoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateWithoutWorkoutPlanInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exercises: z.lazy(() => ExerciseUncheckedUpdateManyWithoutWorkoutDayNestedInputSchema).optional()
}).strict();

export const WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanInputSchema: z.ZodType<Prisma.WorkoutDayUncheckedUpdateManyWithoutWorkoutPlanInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  day: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  workoutType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  notes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseCreateManyWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseCreateManyWorkoutDayInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  sets: z.number().int(),
  reps: z.string()
}).strict();

export const ExerciseUpdateWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUpdateWithoutWorkoutDayInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateWithoutWorkoutDayInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExerciseUncheckedUpdateManyWithoutWorkoutDayInputSchema: z.ZodType<Prisma.ExerciseUncheckedUpdateManyWithoutWorkoutDayInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sets: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  reps: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindFirstArgsSchema: z.ZodType<Prisma.ProfileFindFirstArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindFirstOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileFindManyArgsSchema: z.ZodType<Prisma.ProfileFindManyArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProfileScalarFieldEnumSchema,ProfileScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProfileAggregateArgsSchema: z.ZodType<Prisma.ProfileAggregateArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithRelationInputSchema.array(),ProfileOrderByWithRelationInputSchema ]).optional(),
  cursor: ProfileWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileGroupByArgsSchema: z.ZodType<Prisma.ProfileGroupByArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
  orderBy: z.union([ ProfileOrderByWithAggregationInputSchema.array(),ProfileOrderByWithAggregationInputSchema ]).optional(),
  by: ProfileScalarFieldEnumSchema.array(),
  having: ProfileScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProfileFindUniqueArgsSchema: z.ZodType<Prisma.ProfileFindUniqueArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProfileFindUniqueOrThrowArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const GoalFindFirstArgsSchema: z.ZodType<Prisma.GoalFindFirstArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindFirstOrThrowArgsSchema: z.ZodType<Prisma.GoalFindFirstOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalFindManyArgsSchema: z.ZodType<Prisma.GoalFindManyArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ GoalScalarFieldEnumSchema,GoalScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const GoalAggregateArgsSchema: z.ZodType<Prisma.GoalAggregateArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithRelationInputSchema.array(),GoalOrderByWithRelationInputSchema ]).optional(),
  cursor: GoalWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalGroupByArgsSchema: z.ZodType<Prisma.GoalGroupByArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
  orderBy: z.union([ GoalOrderByWithAggregationInputSchema.array(),GoalOrderByWithAggregationInputSchema ]).optional(),
  by: GoalScalarFieldEnumSchema.array(),
  having: GoalScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const GoalFindUniqueArgsSchema: z.ZodType<Prisma.GoalFindUniqueArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.GoalFindUniqueOrThrowArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const ProgressFindFirstArgsSchema: z.ZodType<Prisma.ProgressFindFirstArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProgressFindFirstOrThrowArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressFindManyArgsSchema: z.ZodType<Prisma.ProgressFindManyArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProgressScalarFieldEnumSchema,ProgressScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ProgressAggregateArgsSchema: z.ZodType<Prisma.ProgressAggregateArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithRelationInputSchema.array(),ProgressOrderByWithRelationInputSchema ]).optional(),
  cursor: ProgressWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProgressGroupByArgsSchema: z.ZodType<Prisma.ProgressGroupByArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
  orderBy: z.union([ ProgressOrderByWithAggregationInputSchema.array(),ProgressOrderByWithAggregationInputSchema ]).optional(),
  by: ProgressScalarFieldEnumSchema.array(),
  having: ProgressScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ProgressFindUniqueArgsSchema: z.ZodType<Prisma.ProgressFindUniqueArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProgressFindUniqueOrThrowArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanFindFirstArgsSchema: z.ZodType<Prisma.WorkoutPlanFindFirstArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutPlanFindFirstOrThrowArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanFindManyArgsSchema: z.ZodType<Prisma.WorkoutPlanFindManyArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutPlanScalarFieldEnumSchema,WorkoutPlanScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutPlanAggregateArgsSchema: z.ZodType<Prisma.WorkoutPlanAggregateArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithRelationInputSchema.array(),WorkoutPlanOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutPlanWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutPlanGroupByArgsSchema: z.ZodType<Prisma.WorkoutPlanGroupByArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutPlanOrderByWithAggregationInputSchema.array(),WorkoutPlanOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutPlanScalarFieldEnumSchema.array(),
  having: WorkoutPlanScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutPlanFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutPlanFindUniqueArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutPlanFindUniqueOrThrowArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayFindFirstArgsSchema: z.ZodType<Prisma.WorkoutDayFindFirstArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayFindFirstOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayFindFirstOrThrowArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayFindManyArgsSchema: z.ZodType<Prisma.WorkoutDayFindManyArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ WorkoutDayScalarFieldEnumSchema,WorkoutDayScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const WorkoutDayAggregateArgsSchema: z.ZodType<Prisma.WorkoutDayAggregateArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithRelationInputSchema.array(),WorkoutDayOrderByWithRelationInputSchema ]).optional(),
  cursor: WorkoutDayWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayGroupByArgsSchema: z.ZodType<Prisma.WorkoutDayGroupByArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
  orderBy: z.union([ WorkoutDayOrderByWithAggregationInputSchema.array(),WorkoutDayOrderByWithAggregationInputSchema ]).optional(),
  by: WorkoutDayScalarFieldEnumSchema.array(),
  having: WorkoutDayScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const WorkoutDayFindUniqueArgsSchema: z.ZodType<Prisma.WorkoutDayFindUniqueArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.WorkoutDayFindUniqueOrThrowArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindFirstArgsSchema: z.ZodType<Prisma.ExerciseFindFirstArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindFirstOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseFindManyArgsSchema: z.ZodType<Prisma.ExerciseFindManyArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExerciseScalarFieldEnumSchema,ExerciseScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ExerciseAggregateArgsSchema: z.ZodType<Prisma.ExerciseAggregateArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithRelationInputSchema.array(),ExerciseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExerciseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseGroupByArgsSchema: z.ZodType<Prisma.ExerciseGroupByArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
  orderBy: z.union([ ExerciseOrderByWithAggregationInputSchema.array(),ExerciseOrderByWithAggregationInputSchema ]).optional(),
  by: ExerciseScalarFieldEnumSchema.array(),
  having: ExerciseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ExerciseFindUniqueArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExerciseFindUniqueOrThrowArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const ProfileCreateArgsSchema: z.ZodType<Prisma.ProfileCreateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
}).strict() ;

export const ProfileUpsertArgsSchema: z.ZodType<Prisma.ProfileUpsertArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
  create: z.union([ ProfileCreateInputSchema,ProfileUncheckedCreateInputSchema ]),
  update: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProfileCreateManyArgsSchema: z.ZodType<Prisma.ProfileCreateManyArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProfileCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProfileCreateManyInputSchema,ProfileCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProfileDeleteArgsSchema: z.ZodType<Prisma.ProfileDeleteArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateArgsSchema: z.ZodType<Prisma.ProfileUpdateArgs> = z.object({
  select: ProfileSelectSchema.optional(),
  include: ProfileIncludeSchema.optional(),
  data: z.union([ ProfileUpdateInputSchema,ProfileUncheckedUpdateInputSchema ]),
  where: ProfileWhereUniqueInputSchema,
}).strict() ;

export const ProfileUpdateManyArgsSchema: z.ZodType<Prisma.ProfileUpdateManyArgs> = z.object({
  data: z.union([ ProfileUpdateManyMutationInputSchema,ProfileUncheckedUpdateManyInputSchema ]),
  where: ProfileWhereInputSchema.optional(),
}).strict() ;

export const ProfileDeleteManyArgsSchema: z.ZodType<Prisma.ProfileDeleteManyArgs> = z.object({
  where: ProfileWhereInputSchema.optional(),
}).strict() ;

export const GoalCreateArgsSchema: z.ZodType<Prisma.GoalCreateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
}).strict() ;

export const GoalUpsertArgsSchema: z.ZodType<Prisma.GoalUpsertArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
  create: z.union([ GoalCreateInputSchema,GoalUncheckedCreateInputSchema ]),
  update: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
}).strict() ;

export const GoalCreateManyArgsSchema: z.ZodType<Prisma.GoalCreateManyArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GoalCreateManyAndReturnArgsSchema: z.ZodType<Prisma.GoalCreateManyAndReturnArgs> = z.object({
  data: z.union([ GoalCreateManyInputSchema,GoalCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const GoalDeleteArgsSchema: z.ZodType<Prisma.GoalDeleteArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateArgsSchema: z.ZodType<Prisma.GoalUpdateArgs> = z.object({
  select: GoalSelectSchema.optional(),
  include: GoalIncludeSchema.optional(),
  data: z.union([ GoalUpdateInputSchema,GoalUncheckedUpdateInputSchema ]),
  where: GoalWhereUniqueInputSchema,
}).strict() ;

export const GoalUpdateManyArgsSchema: z.ZodType<Prisma.GoalUpdateManyArgs> = z.object({
  data: z.union([ GoalUpdateManyMutationInputSchema,GoalUncheckedUpdateManyInputSchema ]),
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export const GoalDeleteManyArgsSchema: z.ZodType<Prisma.GoalDeleteManyArgs> = z.object({
  where: GoalWhereInputSchema.optional(),
}).strict() ;

export const ProgressCreateArgsSchema: z.ZodType<Prisma.ProgressCreateArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  data: z.union([ ProgressCreateInputSchema,ProgressUncheckedCreateInputSchema ]),
}).strict() ;

export const ProgressUpsertArgsSchema: z.ZodType<Prisma.ProgressUpsertArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
  create: z.union([ ProgressCreateInputSchema,ProgressUncheckedCreateInputSchema ]),
  update: z.union([ ProgressUpdateInputSchema,ProgressUncheckedUpdateInputSchema ]),
}).strict() ;

export const ProgressCreateManyArgsSchema: z.ZodType<Prisma.ProgressCreateManyArgs> = z.object({
  data: z.union([ ProgressCreateManyInputSchema,ProgressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProgressCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ProgressCreateManyAndReturnArgs> = z.object({
  data: z.union([ ProgressCreateManyInputSchema,ProgressCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ProgressDeleteArgsSchema: z.ZodType<Prisma.ProgressDeleteArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressUpdateArgsSchema: z.ZodType<Prisma.ProgressUpdateArgs> = z.object({
  select: ProgressSelectSchema.optional(),
  include: ProgressIncludeSchema.optional(),
  data: z.union([ ProgressUpdateInputSchema,ProgressUncheckedUpdateInputSchema ]),
  where: ProgressWhereUniqueInputSchema,
}).strict() ;

export const ProgressUpdateManyArgsSchema: z.ZodType<Prisma.ProgressUpdateManyArgs> = z.object({
  data: z.union([ ProgressUpdateManyMutationInputSchema,ProgressUncheckedUpdateManyInputSchema ]),
  where: ProgressWhereInputSchema.optional(),
}).strict() ;

export const ProgressDeleteManyArgsSchema: z.ZodType<Prisma.ProgressDeleteManyArgs> = z.object({
  where: ProgressWhereInputSchema.optional(),
}).strict() ;

export const WorkoutPlanCreateArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  data: z.union([ WorkoutPlanCreateInputSchema,WorkoutPlanUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutPlanUpsertArgsSchema: z.ZodType<Prisma.WorkoutPlanUpsertArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
  create: z.union([ WorkoutPlanCreateInputSchema,WorkoutPlanUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutPlanUpdateInputSchema,WorkoutPlanUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutPlanCreateManyArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateManyArgs> = z.object({
  data: z.union([ WorkoutPlanCreateManyInputSchema,WorkoutPlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutPlanCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutPlanCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutPlanCreateManyInputSchema,WorkoutPlanCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutPlanDeleteArgsSchema: z.ZodType<Prisma.WorkoutPlanDeleteArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanUpdateArgsSchema: z.ZodType<Prisma.WorkoutPlanUpdateArgs> = z.object({
  select: WorkoutPlanSelectSchema.optional(),
  include: WorkoutPlanIncludeSchema.optional(),
  data: z.union([ WorkoutPlanUpdateInputSchema,WorkoutPlanUncheckedUpdateInputSchema ]),
  where: WorkoutPlanWhereUniqueInputSchema,
}).strict() ;

export const WorkoutPlanUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutPlanUpdateManyArgs> = z.object({
  data: z.union([ WorkoutPlanUpdateManyMutationInputSchema,WorkoutPlanUncheckedUpdateManyInputSchema ]),
  where: WorkoutPlanWhereInputSchema.optional(),
}).strict() ;

export const WorkoutPlanDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutPlanDeleteManyArgs> = z.object({
  where: WorkoutPlanWhereInputSchema.optional(),
}).strict() ;

export const WorkoutDayCreateArgsSchema: z.ZodType<Prisma.WorkoutDayCreateArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  data: z.union([ WorkoutDayCreateInputSchema,WorkoutDayUncheckedCreateInputSchema ]),
}).strict() ;

export const WorkoutDayUpsertArgsSchema: z.ZodType<Prisma.WorkoutDayUpsertArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
  create: z.union([ WorkoutDayCreateInputSchema,WorkoutDayUncheckedCreateInputSchema ]),
  update: z.union([ WorkoutDayUpdateInputSchema,WorkoutDayUncheckedUpdateInputSchema ]),
}).strict() ;

export const WorkoutDayCreateManyArgsSchema: z.ZodType<Prisma.WorkoutDayCreateManyArgs> = z.object({
  data: z.union([ WorkoutDayCreateManyInputSchema,WorkoutDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayCreateManyAndReturnArgsSchema: z.ZodType<Prisma.WorkoutDayCreateManyAndReturnArgs> = z.object({
  data: z.union([ WorkoutDayCreateManyInputSchema,WorkoutDayCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const WorkoutDayDeleteArgsSchema: z.ZodType<Prisma.WorkoutDayDeleteArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayUpdateArgsSchema: z.ZodType<Prisma.WorkoutDayUpdateArgs> = z.object({
  select: WorkoutDaySelectSchema.optional(),
  include: WorkoutDayIncludeSchema.optional(),
  data: z.union([ WorkoutDayUpdateInputSchema,WorkoutDayUncheckedUpdateInputSchema ]),
  where: WorkoutDayWhereUniqueInputSchema,
}).strict() ;

export const WorkoutDayUpdateManyArgsSchema: z.ZodType<Prisma.WorkoutDayUpdateManyArgs> = z.object({
  data: z.union([ WorkoutDayUpdateManyMutationInputSchema,WorkoutDayUncheckedUpdateManyInputSchema ]),
  where: WorkoutDayWhereInputSchema.optional(),
}).strict() ;

export const WorkoutDayDeleteManyArgsSchema: z.ZodType<Prisma.WorkoutDayDeleteManyArgs> = z.object({
  where: WorkoutDayWhereInputSchema.optional(),
}).strict() ;

export const ExerciseCreateArgsSchema: z.ZodType<Prisma.ExerciseCreateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
}).strict() ;

export const ExerciseUpsertArgsSchema: z.ZodType<Prisma.ExerciseUpsertArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
  create: z.union([ ExerciseCreateInputSchema,ExerciseUncheckedCreateInputSchema ]),
  update: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
}).strict() ;

export const ExerciseCreateManyArgsSchema: z.ZodType<Prisma.ExerciseCreateManyArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ExerciseCreateManyAndReturnArgs> = z.object({
  data: z.union([ ExerciseCreateManyInputSchema,ExerciseCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ExerciseDeleteArgsSchema: z.ZodType<Prisma.ExerciseDeleteArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateArgsSchema: z.ZodType<Prisma.ExerciseUpdateArgs> = z.object({
  select: ExerciseSelectSchema.optional(),
  include: ExerciseIncludeSchema.optional(),
  data: z.union([ ExerciseUpdateInputSchema,ExerciseUncheckedUpdateInputSchema ]),
  where: ExerciseWhereUniqueInputSchema,
}).strict() ;

export const ExerciseUpdateManyArgsSchema: z.ZodType<Prisma.ExerciseUpdateManyArgs> = z.object({
  data: z.union([ ExerciseUpdateManyMutationInputSchema,ExerciseUncheckedUpdateManyInputSchema ]),
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;

export const ExerciseDeleteManyArgsSchema: z.ZodType<Prisma.ExerciseDeleteManyArgs> = z.object({
  where: ExerciseWhereInputSchema.optional(),
}).strict() ;