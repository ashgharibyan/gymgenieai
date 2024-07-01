"use client";

import { Container, Title } from "@mantine/core";
import React from "react";

type WorkoutPlanWithWorkouts = {
  id: number;
  profileId: number;
  workouts: {
    id: number;
    day: string;
    workoutType: string;
    exercises: {
      id: number;
      name: string;
      sets: number;
      reps: string;
    }[];
    notes: string;
  }[];
};

export default function WorkoutList(props: {
  workoutPlan: WorkoutPlanWithWorkouts;
}) {
  const { workoutPlan } = props;
  return (
    <Container>
      <Title> You Have Workouts</Title>
      {workoutPlan.workouts.map((workout) => {
        return (
          <div key={workout.id}>
            <Title order={3}>{workout.day}</Title>
            <Title order={4}>{workout.workoutType}</Title>
            <ul>
              {workout.exercises.map((exercise) => {
                return (
                  <li key={exercise.id}>
                    {exercise.name} - {exercise.sets} sets - {exercise.reps}
                  </li>
                );
              })}
            </ul>
            <p>{workout.notes}</p>
          </div>
        );
      })}
    </Container>
  );
}
