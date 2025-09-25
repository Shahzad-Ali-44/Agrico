import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-gradient-to-br from-white via-lime-50/30 to-green-50/50 pb-16 pt-[120px] dark:from-gray-dark dark:via-gray-900 dark:to-gray-800 md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[900px] text-center">
                <div className="mb-8 inline-flex items-center rounded-full bg-lime-100 px-4 py-2 text-sm font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-300">
                  🌱 AI-Powered Agriculture Solution
                </div>
                <h1 className="mb-8 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight max-w-5xl mx-auto">
                  Revolutionize Agriculture with{" "}
                  <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
                    Advanced AI
                  </span>
                </h1>
                <p className="mb-10 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-4xl mx-auto">
                  Detect rice crop diseases instantly with our cutting-edge AI technology. 
                  <br className="hidden sm:block" />
                  Ensure healthier crops, higher yields, and sustainable farming practices.
                </p>
                <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
                  <Link
                    href="#features"
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-lime-600 to-green-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-lime-500/25"
                  >
                    <span className="relative z-10 flex items-center">
                       Try Now
                      <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-lime-700 to-green-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </Link>
                  <Link
                    href="/about"
                    className="group relative overflow-hidden rounded-xl border-2 border-gray-300 bg-white/80 px-8 py-4 text-lg font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-lime-500 hover:bg-lime-50 hover:text-lime-700 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-300 dark:hover:border-lime-400 dark:hover:bg-gray-700 dark:hover:text-lime-300"
                  >
                    <span className="relative z-10 flex items-center">
                      Learn More
                      <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-20 right-10 z-0 animate-float">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-lime-400/20 to-green-400/20 blur-xl"></div>
        </div>
        <div className="absolute top-40 left-10 z-0 animate-float-delayed">
          <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-400/20 to-lime-400/20 blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-20 z-0 animate-float-slow">
          <div className="h-24 w-24 rounded-full bg-gradient-to-r from-lime-300/20 to-green-300/20 blur-xl"></div>
        </div>

      </section>
    </>
  );
};

export default Hero;
