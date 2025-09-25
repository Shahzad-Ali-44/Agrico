"use client"
import NewsLatterBox from "./NewsLatterBox";
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const Contact = () => {
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    show: false,
    type: 'success',
    title: '',
    message: ''
  });
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Toast functions
  const showToast = (type: 'success' | 'error', title: string, message: string) => {
    setToast({
      show: true,
      type,
      title,
      message
    });
  };

  const hideToast = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(prev => ({ ...prev, show: false }));
  };

  const startToastTimer = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    toastTimerRef.current = setTimeout(() => {
      hideToast();
    }, 5000);
  };

  const pauseToastTimer = () => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  // Auto hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      startToastTimer();
      return () => {
        if (toastTimerRef.current) {
          clearTimeout(toastTimerRef.current);
        }
      };
    }
  }, [toast.show]);

  // Validation functions
  const validateName = (name: string): string | null => {
    if (!name || name.trim().length === 0) {
      return "Name is required";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    if (name.trim().length > 50) {
      return "Name must be less than 50 characters";
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
      return "Name can only contain letters and spaces";
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    if (!email || email.trim().length === 0) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address";
    }
    if (email.trim().length > 100) {
      return "Email must be less than 100 characters";
    }
    return null;
  };

  const validateMessage = (message: string): string | null => {
    if (!message || message.trim().length === 0) {
      return "Message is required";
    }
    if (message.trim().length < 10) {
      return "Message must be at least 10 characters long";
    }
    if (message.trim().length > 1000) {
      return "Message must be less than 1000 characters";
    }
    return null;
  };

  const validateForm = (formData: { name: string; email: string; message: string }) => {
    const newErrors: {
      name?: string;
      email?: string;
      message?: string;
    } = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const messageError = validateMessage(formData.message);
    if (messageError) newErrors.message = messageError;
    
    return newErrors;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const form = e.target as HTMLFormElement;
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem('email') as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()
    };

    // Validate form
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const subject = 'New Contact Form Submission from AGRICO';
    const website = 'AGRICO';

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_AccessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject,
          website
        }),
      });

      const result = await response.json();
      if (result.success) {
        showToast('success', 'Message Sent Successfully!', 'Thank you for contacting us. We\'ll get back to you soon!');
        form.reset();
        setErrors({});
      } else {
        showToast('error', 'Something Went Wrong', result.message || 'Please try again later or contact us directly.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Network Error', 'Failed to send message. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }




  return (
    <section id="contact" className="relative py-16 md:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-lime-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
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
            📞 Get In Touch
          </div>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
            Need Help?{" "}
            <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
              Contact Us
            </span>
              </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl max-w-4xl mx-auto">
            Our support team will get back to you ASAP via email. We're here to help with any questions about AGRICO.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Send us a Message
                </h3>
                <p className="mb-8 text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                      <label
                        htmlFor="name"
                          className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                          Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                          onChange={(e) => {
                            const value = e.target.value.trim();
                            if (errors.name && value.length >= 2 && /^[a-zA-Z\s]+$/.test(value)) {
                              setErrors(prev => ({ ...prev, name: undefined }));
                            }
                          }}
                          className={`w-full rounded-xl border px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                            errors.name 
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                    </div>
                      <div>
                      <label
                        htmlFor="email"
                          className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                          Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                          onChange={(e) => {
                            const value = e.target.value.trim();
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (errors.email && value.length > 0 && emailRegex.test(value) && value.length <= 100) {
                              setErrors(prev => ({ ...prev, email: undefined }));
                            }
                          }}
                          className={`w-full rounded-xl border px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                            errors.email 
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Enter your message (minimum 10 characters)"
                        onChange={(e) => {
                          const value = e.target.value.trim();
                          if (errors.message && value.length >= 10 && value.length <= 1000) {
                            setErrors(prev => ({ ...prev, message: undefined }));
                          }
                        }}
                        className={`w-full rounded-xl border px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none ${
                          errors.message 
                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                            : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-lime-500 focus:ring-2 focus:ring-lime-500/20'
                        }`}
                      ></textarea>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {errors.message}
                        </p>
                      )}
                    </div>
                    <div>
                    <button
                      type="submit"
                        disabled={isSubmitting}
                        className={`group relative w-full px-8 py-4 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 hover:scale-105'
                        }`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                      Send Message
                            </>
                          )}
                        </span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
          <div className="lg:col-span-5">
            <NewsLatterBox />
          </div>
        </div>
      </div>

      {/* Custom Toast - Rendered via Portal */}
      {typeof window !== 'undefined' && toast.show && createPortal(
        <div className="fixed top-24 right-4 left-4 sm:left-auto sm:top-4 z-[999999] animate-slide-in"
             onMouseEnter={pauseToastTimer}
             onMouseLeave={startToastTimer}>
          <div className={`relative group max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden ${
            toast.type === 'success' 
              ? 'border-l-4 border-l-lime-500' 
              : 'border-l-4 border-l-red-500'
          }`}>
            {/* Background Gradient */}
            <div className={`absolute inset-0 opacity-10 ${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-lime-500 to-green-500' 
                : 'bg-gradient-to-r from-red-500 to-pink-500'
            }`}></div>
            
            <div className="relative p-6">
              <div className="flex items-start">
                {/* Icon */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  toast.type === 'success' 
                    ? 'bg-gradient-to-r from-lime-500 to-green-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  {toast.type === 'success' ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {toast.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {toast.message}
                  </p>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={hideToast}
                  className="flex-shrink-0 ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Progress Bar - Static for better hover control */}
            <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
              <div className={`h-full ${
                toast.type === 'success' 
                  ? 'bg-gradient-to-r from-lime-500 to-green-500' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}></div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Contact;
