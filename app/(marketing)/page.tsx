import {
  Navbar,
  Hero,
  Features,
  RphShowcase,
  Pricing,
  Testimonials,
  WaitlistForm,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <RphShowcase />
        <Pricing />
        <Testimonials />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
