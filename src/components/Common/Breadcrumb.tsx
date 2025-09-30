import Link from "next/link";

const Breadcrumb = ({
  pageName,
  description,
}: {
  pageName: string;
  description: string;
}) => {
  return (
    <>
      <section className="relative overflow-hidden pt-28 lg:pt-[150px] bg-gradient-to-br from-gray-50 via-white to-lime-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime-500/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 lg:gap-8 items-start lg:items-center">
            <div className="lg:col-span-8 order-2 lg:order-1">
              <div className="mb-6 lg:mb-12">
                <h1 className="mb-4 text-2xl font-bold leading-tight text-gray-900 dark:text-white sm:text-3xl md:text-4xl lg:text-5xl">
                  {pageName}
                </h1>
                <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:text-lg md:text-xl lg:text-2xl max-w-3xl">
                  {description}
                </p>
              </div>
            </div>
            <div className="lg:col-span-4 order-1 lg:order-2 w-full lg:w-auto">
              <div className="flex justify-start lg:justify-end mb-4 lg:mb-0">
                <nav className="flex items-center space-x-1 sm:space-x-2 bg-white dark:bg-gray-800 rounded-xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg border border-white/20 dark:border-gray-700/50 sm:backdrop-blur-sm">
                  <Link
                    href="/"
                    className="flex items-center text-sm text-gray-600 dark:text-gray-300 hover:text-lime-600 dark:hover:text-lime-400 transition-colors duration-300 group"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-medium">Home</span>
                  </Link>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-sm font-semibold text-lime-600 dark:text-lime-400 truncate">
                    {pageName}
                  </span>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Breadcrumb;
