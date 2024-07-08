"use client";

import { useScrollIntoView } from "@mantine/hooks";
import { Hero } from "./hero";
import { Features } from "./features";
import { ContactUs } from "./contact-us";
import { Faq } from "./faq";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Loader } from "@mantine/core";

// Component that handles the useSearchParams logic
function ScrollHandler() {
  const { targetRef, scrollIntoView } = useScrollIntoView<HTMLDivElement>({
    offset: 100,
  });

  const searchParams = useSearchParams();
  const isContact = searchParams.get("isContact");

  useEffect(() => {
    if (isContact) {
      scrollIntoView({ alignment: "start" });
    }
  }, [isContact, scrollIntoView]);

  return <ContactUs targetRef={targetRef} />;
}

export default function Homepage() {
  return (
    <Suspense fallback={<Loader color="blue" size="xl" type="dots" />}>
      <>
        <Hero />
        <Features />
        <Faq />
        <ScrollHandler />
      </>
    </Suspense>
  );
}
