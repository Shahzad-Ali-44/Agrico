"use client";
import React, { useState } from "react";

const RiceDiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<{ class: string; confidence: number; symptoms: string; treatment: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setResult(null);
      setError(null);
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
      const response = await fetch("https://ricemodelbackend-production.up.railway.app/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("An error occurred while processing the image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 px-8 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg dark:shadow-md w-full max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
        Rice Crop Disease Detection
      </h2>
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="w-full">
          <label htmlFor="image-upload" className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
            Upload Image:
          </label>
          <input
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-600"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 ${loading ? "bg-lime-600" : "bg-lime-600 hover:bg-lime-700"} text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-lime-500`}
          disabled={loading}
        >
          {loading ? "Detecting..." : "Detect Disease"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-6 text-sm">{error}</p>}
      {result && (
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-inner w-full  border border-gray-200 dark:border-gray-600">
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Detected Disease: {result.class}
          </p>
          <p className="text-md font-semibold text-gray-600 dark:text-gray-300 mt-2">
            Confidence: {(result.confidence * 100).toFixed(2)}%
          </p>
          <p className="text-md font-semibold text-gray-600 dark:text-gray-300 mt-2">
            Symptoms: {result.symptoms}
          </p>
          <p className="text-md font-semibold text-gray-600 dark:text-gray-300 mt-2">
            Treatment: {result.treatment}
          </p>
        </div>
      )}
    </div>
  );
};

export default RiceDiseaseDetection;
