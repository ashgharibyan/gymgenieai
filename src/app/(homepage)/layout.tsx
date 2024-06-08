import React from "react";
import AppLayout from "./_components/homepage-app-layout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
