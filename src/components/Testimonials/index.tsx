import { Testimonial } from "@/types/testimonial";
import SectionTitle from "../Common/SectionTitle";
import SingleTestimonial from "./SingleTestimonial";

const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: " John Carter",
    designation: "Rice Farmer",
    content:
      "This tool has been a game-changer for me! I can now detect rice crop diseases within seconds by uploading a picture.I’m amazed at how reliable this tool is.Highly recommended for farmers everywhere!",
    image: "/images/testimonials/auth-01.png",
    star: 5,
  },
  {
    id: 2,
    name: "Michael Adams",
    designation: "Agricultural Extension Officer",
    content:
     "Our farmers rely on this tool to monitor crop health, and it’s made a huge difference. Early detection prevents losses and ensures timely action. The simplicity and precision of the system are truly remarkable!",
    image: "/images/testimonials/auth-02.png",
    star: 5,
  },
  {
    id: 3,
    name: "David Miller",
    designation: "Environmental Advocate",
    content:
      "Our members are very impressed with this tool. It’s intuitive, clean, and distraction-free. By promoting sustainable practices, it supports our mission to protect the environment and improve agriculture.",
    image: "/images/testimonials/auth-03.png",
    star: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-br from-white via-lime-50/30 to-green-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center rounded-full bg-lime-100 px-4 py-2 text-sm font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-300">
            💬 User Testimonials
          </div>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            What Our{" "}
            <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-4xl mx-auto">
            Hear from farmers, agricultural experts, and environmental advocates who trust AGRICO for their crop health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonialData.map((testimonial) => (
            <SingleTestimonial key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
