import Navbar from "@/components/navigation/navbar";
import Hero from "@/components/sections/hero";
import IndustriesMarquee from "@/components/sections/industries-marquee";
import Problem from "@/components/sections/problem";
import Services from "@/components/sections/services";
import HowItWorks from "@/components/sections/how-it-works";
import Ecosystem from "@/components/sections/ecosystem";
import Outcomes from "@/components/sections/outcomes";
import CaseStudies from "@/components/sections/case-studies";
import WhyChooseUs from "@/components/sections/why-choose-us";
import FinalCta from "@/components/sections/final-cta";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IndustriesMarquee />
        <Problem />
        <Services />
        <HowItWorks />
        <Ecosystem />
        <Outcomes />
        <CaseStudies />
        <WhyChooseUs />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
