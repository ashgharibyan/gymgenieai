import { SignedInAppLayout } from "./_components/signed-in-app-layout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SignedInAppLayout>{children}</SignedInAppLayout>;
}
