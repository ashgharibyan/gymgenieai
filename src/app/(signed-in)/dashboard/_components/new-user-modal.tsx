"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Anchor } from "@mantine/core";
import { useEffect } from "react";

export default function NewUserModals(props: {
  isProfile: boolean;
  isGoal: boolean;
  isWorkoutPlan: boolean;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (props.isProfile && props.isGoal && props.isWorkoutPlan) {
      open();
    }
  }, [props.isProfile, props.isGoal, props.isWorkoutPlan, open]);

  return (
    <>
      <Modal
        opened={true}
        onClose={close}
        withCloseButton={false}
        closeOnEscape={false}
        closeOnClickOutside={false}
        centered
      >
        Please create a profile, set a goal, and generate a workout plan.
        <Anchor href="/profile">Create Profile</Anchor>
      </Modal>

      <Button onClick={open}>Open Modal</Button>
    </>
  );
}
