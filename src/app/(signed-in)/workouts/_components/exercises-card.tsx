"use client";

import { ScrollArea, Table } from "@mantine/core";
import React from "react";

type ExerciseWithoutWorkoutDayId = {
  id: number;
  name: string;
  sets: number;
  reps: string;
};

export default function ExercisesCard(props: {
  exercises: ExerciseWithoutWorkoutDayId[];
}) {
  const { exercises } = props;

  const rows = exercises.map((row) => (
    <Table.Tr key={row.name}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.reps}</Table.Td>
      <Table.Td>{row.sets}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea p="md">
      <Table miw={700} stickyHeader={true} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Workout Name</Table.Th>
            <Table.Th># of Reps</Table.Th>
            <Table.Th># of Sets</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
