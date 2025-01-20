"use client"
import NewsLatterBox from "./NewsLatterBox";
import Swal from 'sweetalert2'
const Contact = () => {

  const buttonStyles = {
    success: "bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded",
    error: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();


    if (!name || !email || !message) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
        confirmButtonText: "Retry",
        customClass: {
          confirmButton: buttonStyles["error"],
        },
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_AccessKey,
          name,
          email,
          message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire({
          title: "Success",
          text: "Message sent successfully!",
          icon: "success",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: buttonStyles["success"],
        },
        });
        e.target.reset();
      } else {
        Swal.fire({
          title: "Error",
          text: result.message || "Something went wrong.",
          icon: "error",
          confirmButtonText: "Retry",
          customClass: {
            confirmButton: buttonStyles["error"],
          },
        });
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to send message. Please try again later.",
        icon: "error",
        confirmButtonText: "Retry",
        customClass: {
          confirmButton: buttonStyles["error"],
        },
      });
      e.target.reset();
    }
  }




  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s
              "
            >
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Need Help? Contact us
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Our support team will get back to you ASAP via email.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-lime-600 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-lime-600 dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-lime-600 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-lime-600 dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your Message"
                        className="border-stroke w-full resize-none rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-lime-600 dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-lime-600 dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      className="rounded-sm bg-lime-600 px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-lime-700 dark:shadow-submit-dark">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
