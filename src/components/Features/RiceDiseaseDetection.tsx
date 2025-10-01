"use client";
import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const RiceDiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<{ class: string; confidence: number; symptoms: string; treatment: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file only.');
      return;
    }
    
    setImage(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearAll = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    if (!image) {
      setError("Please upload an image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        setShowModal(true);
      }
    } catch (err) {
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 px-8 bg-white/80 dark:bg-gray-800/80 sm:backdrop-blur-sm text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg sm:shadow-xl dark:shadow-md sm:dark:shadow-lg w-full max-w-3xl mx-auto border border-gray-200/50 dark:border-gray-700/50 gpu-hint perf-hint">
      <div className="text-center mb-8">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-lime-500 to-green-500 text-white shadow-lg">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Upload & Analyze
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Simply upload a rice leaf image to get instant disease detection
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="w-full">
          <label htmlFor="image-upload" className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-200">
            Upload Rice Leaf Image
          </label>
          
          <div
            className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${
              isDragOver
                ? 'border-lime-500 bg-lime-50 dark:bg-lime-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-lime-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {imagePreview && image ? (
              <div className="p-6" key={`preview-${image.name}`}>
                <div className="relative">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      clearAll();
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-20"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {image.name}
                </p>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p className="mb-2">
                    <span className="font-medium text-lime-600 dark:text-lime-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">PNG, JPG, JPEG up to 10MB</p>
                </div>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              id="image-upload"
              onChange={handleImageChange}
              accept="image/*"
              className={`absolute inset-0 w-full h-full opacity-0 ${imagePreview ? 'pointer-events-none' : 'cursor-pointer'}`}
            />
          </div>
        </div>

        <button
          type="submit"
          className={`group relative w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 hover:scale-105 hover:shadow-lg hover:shadow-lime-500/25"
          }`}
          disabled={loading}
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Detect Disease
              </>
            )}
          </span>
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        </div>
      )}
      
      {typeof window !== 'undefined' && createPortal(
        <ResultsModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setImage(null);
            setImagePreview(null);
            setResult(null);
            setError(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          imagePreview={imagePreview}
          image={image}
          result={result}
        />,
        document.body
      )}
      
    </div>
  );
};

const ResultsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  imagePreview: string | null;
  image: File | null;
  result: { class: string; confidence: number; symptoms: string; treatment: string } | null;
}> = ({ isOpen, onClose, imagePreview, image, result }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 sm:backdrop-blur-sm md:backdrop-blur-md perf-hint gpu-hint">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime-500/10 rounded-full blur-2xl sm:blur-3xl sm:animate-float gpu-hint"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-2xl sm:blur-3xl sm:animate-float-delayed gpu-hint"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl sm:blur-3xl sm:animate-float-slow gpu-hint"></div>
      </div>
      
      <div className="bg-gradient-to-br from-white via-lime-50/30 to-green-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-2xl sm:rounded-3xl shadow-md sm:shadow-2xl max-w-5xl w-full mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto border border-white/20 dark:border-gray-700/50 sm:backdrop-blur-sm gpu-hint">
        <div className="relative p-4 sm:p-8 border-b border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 min-w-0">
              <div className="min-w-0 flex-1">
                <div className="mb-1 sm:mb-2 inline-flex items-center rounded-full bg-lime-100 px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-lime-800 dark:bg-lime-900/30 dark:text-lime-300">
                   AI Analysis Complete
                </div>
                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">
                  Disease Detection Results
                </h3>
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 hidden sm:block">
                  Advanced AI-powered rice disease analysis
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-300 hover:scale-110 p-2 rounded-xl hover:bg-white/10 dark:hover:bg-gray-700/50 flex-shrink-0 ml-2"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                   Uploaded Image
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Your uploaded rice leaf image
                </p>
              </div>
              <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-2 sm:p-4 shadow-md sm:shadow-lg">
                  <Image
                    src={imagePreview}
                    alt="Uploaded rice leaf"
                    width={400}
                    height={288}
                    className="w-full h-48 sm:h-64 lg:h-72 object-cover rounded-lg sm:rounded-xl shadow-md"
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-black/70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium sm:backdrop-blur-sm">
                    📁 {image?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                   AI Analysis Results
                </h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  Detailed disease detection findings
                </p>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-lime-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl border border-lime-200/50 dark:border-gray-600/50 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-lime-500 to-green-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-lg">Detected Disease</span>
                    </div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-lime-700 dark:text-lime-300 ml-10 sm:ml-13 break-words">{result.class}</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl border border-blue-200/50 dark:border-gray-600/50 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-lg">AI Confidence</span>
                    </div>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400 ml-10 sm:ml-13">{(result.confidence * 100).toFixed(2)}%</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl border border-orange-200/50 dark:border-gray-600/50 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-lg">Symptoms</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-10 sm:ml-13 leading-relaxed">{result.symptoms}</p>
                  </div>
                </div>
                
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-10 sm:opacity-20 group-hover:opacity-20 sm:group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative p-3 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl border border-green-200/50 dark:border-gray-600/50 shadow-sm sm:shadow-lg hover:shadow-md sm:hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-2 sm:mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 text-sm sm:text-lg">Treatment Plan</span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 ml-10 sm:ml-13 leading-relaxed">{result.treatment}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative p-4 sm:p-6 lg:p-8 border-t border-white/20 dark:border-gray-700/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
              Powered by AGRICO
            </div>
            <button
              onClick={onClose}
              className="group relative w-full sm:w-auto px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg hover:from-lime-700 hover:to-green-700 transition-all duration-300 hover:scale-105 shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl sm:rounded-2xl blur-sm sm:blur opacity-0 group-hover:opacity-5 sm:group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiceDiseaseDetection;
