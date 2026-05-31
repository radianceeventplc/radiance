import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { WhoWeAre } from "@/components/sections/WhoWeAre";
import { Services } from "@/components/sections/Services";
import { Experiences } from "@/components/sections/Experiences";

import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { ContactInquiries } from "@/components/sections/ContactInquiries";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="relative z-10 bg-white">
          <WhoWeAre />
          <Services />
          <Experiences />
          <Process />
          <CTA />
          <ContactInquiries />
        </div>
      </main>
      <Footer />
    </>
  );
}
