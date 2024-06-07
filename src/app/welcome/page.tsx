import SignUpButton from "../_components/sign-up-button";
import SignInButton from "../_components/sing-in-button";
import { Center, Text, Flex, Title } from "@mantine/core";

export default async function Home() {
  return (
    <Center h="100vh">
      <Flex
        direction={{ base: "column" }}
        gap={{ base: "sm" }}
        justify={{ base: "space-between" }}
        align={{ base: "center" }}
      >
        <Title order={1}>
          Welcome to Gym
          <Text span c="primary" inherit>
            Genie
          </Text>
        </Title>
        <Text c="dimmed" size="xl">
          Start your fitness journey now!
        </Text>
        <SignInButton />
        <SignUpButton />
      </Flex>
    </Center>
  );
}
