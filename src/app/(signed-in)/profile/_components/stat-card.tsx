import { ThemeIcon, Paper, rem, Title, Stack, Group } from "@mantine/core";
import { type IconProps } from "@tabler/icons-react";
import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<IconProps>; // Typing the icon as a React component
}

export function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <Paper radius="lg" withBorder mt={20} bg="primary.5" p="lg">
      <Group>
        <ThemeIcon size={60} radius={60} variant="white">
          <Icon style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
        </ThemeIcon>
        <Stack gap="md" p="xl" flex={1}>
          <Title order={2} fw={900} c="white">
            {title}
          </Title>
          <Title order={3} fw={600} fz="sm" c="white">
            {value}
          </Title>
        </Stack>
      </Group>
    </Paper>
  );
}
