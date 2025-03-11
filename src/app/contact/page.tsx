import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AGRICO - Contact us",
  description: "This is Contact Page",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact us"
        description=""
      />

      <Contact />
    </>
  );
};

export default ContactPage;
