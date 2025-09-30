import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import dynamic from "next/dynamic";

const AboutSectionOne = dynamic(() => import("@/components/About/AboutSectionOne"), {
  loading: () => null,
  ssr: true,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => null,
  ssr: true,
});
const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => null,
  ssr: true,
});
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
