import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About Page"
        description=""
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
