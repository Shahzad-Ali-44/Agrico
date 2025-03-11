import AboutSectionOne from "@/components/About/AboutSectionOne";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGRICO - About us",
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="About us"
        description=""
      />
      <AboutSectionOne />
    </>
  );
};

export default AboutPage;
