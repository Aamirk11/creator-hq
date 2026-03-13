import {
  Navbar,
  Hero,
  PlatformBar,
  Problem,
  Features,
  HowItWorks,
  DashboardPreview,
  RphShowcase,
  BeforeAfter,
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
        <PlatformBar />
        <Problem />
        <Features />
        <HowItWorks />
        <DashboardPreview />
        <RphShowcase />
        <BeforeAfter />
        <Pricing />
        <Testimonials />
        <WaitlistForm />
      </main>
      <Footer />
    </div>
  );
}
