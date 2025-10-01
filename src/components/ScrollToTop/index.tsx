import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800; 

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startPosition * (1 - ease));
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-md sm:shadow-lg transition-all duration-300 ease-in-out hover:scale-105 sm:hover:scale-110 hover:shadow-lg sm:hover:shadow-xl hover:shadow-lime-500/15 sm:hover:shadow-lime-500/25 dark:from-lime-600 dark:to-green-600"
        >
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-400 to-green-400 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-15 sm:group-hover:opacity-30"></div>
          
       
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500 to-green-500 opacity-0 animate-ping group-hover:opacity-10 sm:group-hover:opacity-20"></div>
          
        
          <div className="relative z-10">
            <svg 
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2.5} 
                d="M5 10l7-7m0 0l7 7m-7-7v18" 
              />
            </svg>
          </div>
          
         
          <div className="absolute bottom-full right-0 mb-2 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:block group-hover:opacity-100 dark:bg-gray-700">
            Scroll to top
            <div className="absolute top-full right-3 h-0 w-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}
