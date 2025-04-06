import Image from "next/image";
import Navbar from "./_components/Navbar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Hero from "./_components/landingPage/Hero";
import Logos from "./_components/landingPage/Logos";
import Features from "./_components/landingPage/Features";
import Testimonials from "./_components/landingPage/Testimonials";
import CTA from "./_components/landingPage/CTA";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
      <Logos />
      <Features /> 
      <Testimonials />
       <CTA />
    </div>
  );
}
