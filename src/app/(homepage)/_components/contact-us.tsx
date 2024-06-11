"use client";

import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Container,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { type EmailFormData } from "~/types/types";
import { sendEmail } from "~/utils/send-email";

export function ContactUs() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  const form = useForm<EmailFormData>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      page: "homepage-contact-us-form",
    },
    validate: {
      name: (value) =>
        value.trim().length < 2
          ? "Name must be at least 2 characters"
          : undefined,
      email: (value) =>
        value.length < 1
          ? "Email is required"
          : !/^\S+@\S+$/.test(value)
          ? "Invalid email"
          : undefined,
      subject: (value) =>
        value.trim().length === 0 ? "Subject is required" : undefined,
      message: (value) =>
        value.trim().length === 0 ? "Message is required" : undefined,
    },
  });

  const handleSubmit = (data: EmailFormData) => {
    console.log("data in handleSubmit", data);
    sendEmail(data);
    form.reset();
    setFormSubmitted(true);
  };
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Container size="sm" pt="xl" mt="xl">
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
          fw={900}
          ta="center"
        >
          Get in touch
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Subject"
          placeholder="Subject"
          mt="md"
          name="subject"
          variant="filled"
          key={form.key("subject")}
          {...form.getInputProps("subject")}
        />
        <Textarea
          mt="md"
          label="Message"
          placeholder="Your message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          key={form.key("message")}
          {...form.getInputProps("message")}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Send message
          </Button>
        </Group>
        {formSubmitted && (
          <Text ta="center" mt="lg" c="green">
            Thank you for submitting the form. You will receive an email from us
            soon.
          </Text>
        )}
      </Container>
    </form>
  );
}
