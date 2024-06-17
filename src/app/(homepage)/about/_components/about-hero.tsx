"use client";

import { Container, Title, Text, Button } from "@mantine/core";
import Link from "next/link";
import classes from "../_styles/about-hero.module.css";

export function AboutHero() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "blue" }}
              >
                FULLY ENHANCED
              </Text>{" "}
              FITNESS AND HEALTH{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "pink", to: "blue" }}
              >
                EXPEIRENCE
              </Text>{" "}
            </Title>

            <Text className={classes.description} mt={100}>
              Our product is a cutting-edge health and fitness website designed
              to help individuals improve their overall well-being by focusing
              on diet and fitness. Users can input their health and nutritional
              information, which the platform uses to provide personalized
              workout plans and nutritional goals. Leveraging AI-driven
              insights, the website offers comprehensive goal tracking, enabling
              users to monitor their progress and make data-informed adjustments
              to their routines. Our goal is to offer an all-in-one solution
              that simplifies the journey to better health, making it accessible
              and effective for everyone.
            </Text>

            <Text className={classes.description} mt={35}>
              Our vision is to empower individuals to achieve their health and
              fitness goals through personalized, AI-driven insights and
              comprehensive goal tracking, creating a healthier and more
              informed world.
            </Text>

            <Text className={classes.description} mt={35}>
              Our mission began in 2024 with a goal to revolutionize the health
              and fitness industry. Since then, we have provided a simple UI to
              help track our users personalized nutritional and fitness plans.
            </Text>

            {/* Once the features page and its route are formed this
            will send the user to the features page, sends users to
            home page right now*/}
            <Link href="/">
              <Button
                className={classes.cta}
                size="lg"
                variant="filled"
                color="pink"
                mt={50}
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
