"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden perf-hint">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl sm:blur-3xl animate-float gpu-hint"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-2xl sm:blur-3xl animate-float-delayed gpu-hint"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl sm:blur-3xl animate-float-slow gpu-hint"></div>
        </div>

        <div className="container mx-auto px-4 pt-16 md:pt-20 lg:pt-24 pb-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
               <Link href="/" className="inline-block mb-6">
                 <Image
                   src="/images/logo/logo.png"
                   alt="AGRICO Logo"
                   className="w-40 h-auto hover:scale-105 transition-transform duration-300"
                   width={160}
                   height={40}
                   sizes="(max-width: 640px) 144px, 160px"
                   priority
                 />
               </Link>
              <p className="text-gray-300 leading-relaxed text-lg sm:text-xl mb-6"><span className="text-white font-bold">AGRICO</span> - Your trusted partner in smart agriculture. 
                We are revolutionizing farming with AI-powered disease detection, 
                helping farmers make informed decisions for better crop yields.
              </p>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                🌾 Quick Access
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 sm:from-gray-800/50 sm:to-gray-700/50 rounded-2xl p-4 sm:p-6 border border-gray-600/30">
                  <h4 className="text-xl font-bold text-lime-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Navigation
                  </h4>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-300 hover:text-lime-400 transition-all duration-300 flex items-center group hover:translate-x-1"
                      >
                        <svg className="w-4 h-4 mr-3 text-lime-500 group-hover:text-lime-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-300 hover:text-lime-400 transition-all duration-300 flex items-center group hover:translate-x-1"
                      >
                        <svg className="w-4 h-4 mr-3 text-lime-500 group-hover:text-lime-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-300 hover:text-lime-400 transition-all duration-300 flex items-center group hover:translate-x-1"
                      >
                        <svg className="w-4 h-4 mr-3 text-lime-500 group-hover:text-lime-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 sm:from-gray-800/50 sm:to-gray-700/50 rounded-2xl p-4 sm:p-6 border border-gray-600/30">
                  <h4 className="text-xl font-bold text-lime-400 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Key Features
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-lime-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-white">Rice Disease Detection</span>
                        <p className="text-sm text-gray-400">Advanced AI analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-lime-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-white">Instant Results</span>
                        <p className="text-sm text-gray-400">Real-time analysis</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 mr-3 text-lime-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <span className="font-semibold text-white">Treatment Plans</span>
                        <p className="text-sm text-gray-400">Expert recommendations</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
          <div className="border-t border-gray-700/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} AGRICO. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Developed by{" "}
                <a 
                  href="https://shahzadali.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lime-400 hover:text-lime-300 transition-colors duration-300 font-medium"
                >
                  Shahzad Ali
                </a>
            </p>
          </div>
        </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
