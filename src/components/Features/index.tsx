import SectionTitle from "../Common/SectionTitle";
import RiceDiseaseDetection from "./RiceDiseaseDetection";

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          
          <div className="flex justify-center">
            <RiceDiseaseDetection />
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
