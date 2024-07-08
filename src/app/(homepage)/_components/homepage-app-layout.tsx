"use client";

import { AppShell } from "@mantine/core";
import { Header } from "./header";
import { Footer } from "./footer";
import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header
        withBorder={false}
        style={{
          justifyContent: "center",
        }}
      >
        <Header />
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>

      <Footer />
    </AppShell>
  );
}
