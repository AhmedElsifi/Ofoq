import Hero from "../components/Home/Hero";
import PrivacySection from "../components/Home/PrivacySection";
import ProtocolSection from "../components/Home/ProtocolSection";

// Home page: composes the hero, protocol, and privacy sections.
export default function Home() {
  return (
    <>
      <Hero />
      <ProtocolSection />
      <PrivacySection />
    </>
  );
}
