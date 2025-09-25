import SectionTitle from "../Common/SectionTitle";
import RiceDiseaseDetection from "./RiceDiseaseDetection";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-lime-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
      
          <div className="text-center mb-16">
            <div className="mb-4 inline-flex items-center rounded-full bg-lime-100 px-4 py-2 text-sm font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-300">
              🔬 AI Technology
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
              Advanced Disease Detection
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-3xl mx-auto">
              Upload a rice leaf image and get instant, accurate disease diagnosis with our cutting-edge AI technology.
            </p>
          </div>
          
          <div className="flex justify-center">
            <RiceDiseaseDetection />
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
