"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { useTheme } from "next-themes";

const NewsLatterBox = () => {
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
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

  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const value = e.target.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (errors.email && value.length > 0 && emailRegex.test(value) && value.length <= 100) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const value = e.target.value.trim();
    if (errors.name && value.length >= 2 && /^[a-zA-Z\s]+$/.test(value) && value.length <= 50) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };
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

  const validateForm = (formData: { name: string; email: string }) => {
    const newErrors: { name?: string; email?: string } = {};
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = {
      name: name.trim(),
      email: email.trim()
    };
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const subject = 'New Contact Form Submission from AGRICO';
    const website = 'AGRICO'

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
          message: `${formData.name} (${formData.email}) just subscribed to newsletter!`,
          subject,
          website
        }),
      });

      const result = await response.json();
      if (result.success) {
        showToast('success', 'Welcome to AGRICO!', 'You\'ll receive our latest updates.');
        setEmail("");
        setName("");
        setErrors({});
      } else {
        showToast('error', 'Subscription Failed', result.message || 'Please try again later.');
      }
    } catch (error) {
      console.error(error);
      showToast('error', 'Network Error', 'Failed to subscribe. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Stay Updated
      </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Subscribe to receive the latest news, updates, and offers from AGRICO.
      </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
              className={`w-full rounded-xl border px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                errors.name 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
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
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
              className={`w-full rounded-xl border px-6 py-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 ${
                errors.email 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
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
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group relative w-full px-8 py-4 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
                  Subscribe Now
                </>
              )}
        </span>
          </button>
        </form>
      </div>

      {typeof window !== 'undefined' && toast.show && createPortal(
        <div className="fixed top-24 right-4 left-4 sm:left-auto sm:top-4 z-[999999] animate-slide-in"
             onMouseEnter={pauseToastTimer}
             onMouseLeave={startToastTimer}>
          <div className={`relative group max-w-sm w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-sm overflow-hidden ${
            toast.type === 'success' 
              ? 'border-l-4 border-l-blue-500' 
              : 'border-l-4 border-l-red-500'
          }`}>
            <div className={`absolute inset-0 opacity-10 ${
              toast.type === 'success' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                : 'bg-gradient-to-r from-red-500 to-pink-500'
            }`}></div>
            
            <div className="relative p-6">
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                  toast.type === 'success' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
                }`}>
                  {toast.type === 'success' ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {toast.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {toast.message}
                  </p>
                </div>
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
            <div className="absolute bottom-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full">
              <div className={`h-full ${
                toast.type === 'success' 
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}></div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default NewsLatterBox;
