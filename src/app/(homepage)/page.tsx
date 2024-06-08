import { ContactUs } from "./_components/contact-us";
import { Faq } from "./_components/faq";
import { Features } from "./_components/features";
import { Hero } from "./_components/hero";

export default async function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Faq />
      <ContactUs />
    </>
  );
}
