"use client";

import { Title, Container, Accordion, ThemeIcon, rem } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "../_styles/faq.module.css";

const data = [
  {
    value: "ai-personalized",
    question: "How does the AI create personalized fitness plans?",
    answer:
      "Our AI analyzes your inputted data, including fitness goals, current fitness level, and preferences, to generate customized workout plans that evolve as you progress.",
  },
  {
    value: "dietary-restrictions",
    question: "What if I have dietary restrictions?",
    answer:
      "You can specify any dietary restrictions during setup, and our AI will create meal plans that accommodate your needs, ensuring you receive balanced nutrition.",
  },
  {
    value: "workout-types",
    question: "What types of workouts are included in the plans?",
    answer:
      "The plans include a variety of workouts such as strength training, cardio, flexibility exercises, and more, tailored to your specific fitness goals and preferences.",
  },
  {
    value: "meal-plan-updates",
    question: "How often are meal plans updated?",
    answer:
      "Meal plans are updated weekly to ensure they remain aligned with your progress and nutritional needs. You can also adjust your preferences at any time.",
  },
  {
    value: "getting-started",
    question: "How do I get started with the app?",
    answer:
      "Simply sign up, enter your personal information and fitness goals, and our AI will create a personalized fitness and meal plan for you. You can start following the plan right away.",
  },
];

export function Faq() {
  return (
    <div className={classes.wrapper}>
      <Container size="sm">
        <Title ta="center" className={classes.title}>
          Frequently Asked Questions
        </Title>

        <Accordion
          chevronPosition="right"
          defaultValue="ai-personalized"
          chevronSize={26}
          variant="separated"
          disableChevronRotation
          styles={{
            label: { color: "var(--mantine-color-black)" },
            item: { border: 0 },
          }}
          chevron={
            <ThemeIcon radius="xl" className={classes.gradient} size={26}>
              <IconPlus
                style={{ width: rem(18), height: rem(18) }}
                stroke={1.5}
              />
            </ThemeIcon>
          }
        >
          {data.map((question, key) => (
            <Accordion.Item
              key={key}
              className={classes.item}
              value={question.value}
            >
              <Accordion.Control>{question.question}</Accordion.Control>
              <Accordion.Panel>{question.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </div>
  );
}
