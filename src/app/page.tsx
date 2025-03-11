import AboutSectionOne from "@/components/About/AboutSectionOne";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGRICO", 
  description:
  "AGRICO is an AI-powered web application for detecting rice crop diseases. Upload an image and get instant disease diagnosis with high accuracy.",
keywords: [
  "Agrico",
  "AGR",
  "Rice Disease Detection",
  "AI Agriculture",
  "Crop Health",
  "Deep Learning",
  "Precision Farming",
],
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
      <Features />
      <AboutSectionOne />
      <Testimonials />
      <Contact />
    </>
  );
}
