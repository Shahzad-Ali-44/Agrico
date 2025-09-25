"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setNavbarOpen(false);
      }
    };

    if (navbarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarOpen]);

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className={`header-logo block transition-all duration-300 hover:scale-105 ${
                  sticky ? "py-2" : "py-4 lg:py-6"
                } `}
              >
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-[6.5rem] dark:hidden transition-all duration-300"
                />
                <Image
                  src="/images/logo/logo.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-[6.5rem] dark:block transition-all duration-300"
                />
              </Link>
            </div>
            <div ref={navbarRef} className="flex items-center justify-center flex-1">
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-xl px-3 py-2 ring-lime-600 focus:ring-2 lg:hidden bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 z-50"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? " top-[7px] rotate-45" : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0 " : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? " top-[-8px] -rotate-45" : " "
                  }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[280px] rounded-2xl border border-gray-200/50 bg-white/95 backdrop-blur-md px-6 py-6 duration-300 dark:border-gray-700/50 dark:bg-gray-900/95 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 shadow-xl lg:shadow-none ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-6 lg:items-center lg:justify-center">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          onClick={closeNavbar}
                          className={`flex py-3 px-4 text-base font-medium rounded-lg transition-all duration-300 lg:mr-0 lg:inline-flex lg:px-3 lg:py-2 lg:rounded-lg ${
                            usePathName === menuItem.path
                              ? "text-white bg-lime-600 shadow-lg dark:bg-lime-500"
                              : "text-gray-700 hover:text-lime-600 hover:bg-lime-50 dark:text-white/80 dark:hover:text-lime-400 dark:hover:bg-gray-800"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() => handleSubmenu(index)}
                            className="flex cursor-pointer items-center justify-between py-3 px-4 text-base font-medium text-gray-700 group-hover:text-lime-600 group-hover:bg-lime-50 rounded-lg transition-all duration-300 dark:text-white/80 dark:group-hover:text-lime-400 dark:group-hover:bg-gray-800 lg:mr-0 lg:inline-flex lg:px-3 lg:py-2 lg:rounded-lg"
                          >
                            {menuItem.title}
                            <span className="pl-3 transition-transform duration-300 group-hover:rotate-180">
                              <svg width="20" height="20" viewBox="0 0 25 24" className="text-current">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu relative left-0 top-full rounded-xl bg-white/95 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 dark:bg-gray-900/95 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-xl lg:group-hover:visible lg:group-hover:top-full border border-gray-200/50 dark:border-gray-700/50 ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {menuItem.submenu?.map((submenuItem, index) => (
                              <Link
                                href={submenuItem.path}
                                key={index}
                                onClick={closeNavbar}
                                className="block rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:text-lime-600 hover:bg-lime-50 transition-all duration-300 dark:text-white/70 dark:hover:text-lime-400 dark:hover:bg-gray-800"
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="absolute right-20 top-1/2 translate-y-[-50%] lg:right-4 z-40">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
