import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const List = ({ text }) => (
    <p className="mb-5 flex items-center text-lg font-medium text-body-color">
      <span className="mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-lime-600 bg-opacity-10 text-lime-600">
        {checkIcon}
      </span>
      {text}
    </p>
  );

  return (
    <section id="about" className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-lime-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden cv-auto">
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
             Our Mission
          </div>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Empowering Farmers with{" "}
            <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
              Smart Solutions
            </span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-4xl mx-auto">
            We provide farmers with cutting-edge tools and insights to make informed decisions, increase yields, and promote sustainable farming practices for a better tomorrow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Why Choose AGRICO?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-lime-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-lime-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-lime-500 to-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Premium Quality</span>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Focus on Agriculture</span>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-orange-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Rice-Crop Support</span>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-green-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Advanced AI Models</span>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-purple-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">High Confidence</span>
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-teal-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center mr-3 flex-shrink-0">
                        {checkIcon}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">Sustainability</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
          <div className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="relative aspect-square max-w-[400px] mx-auto">
                  <Image
                    src="/images/logo/logo.png"
                    alt="AGRICO Logo"
                    fill
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
