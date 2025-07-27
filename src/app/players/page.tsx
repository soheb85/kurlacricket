/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import SuccessAlert from "@/components/UtilityComponent/SuccessAlert";

// Interfaces remain the same
interface PlayerFormData {
  playerId: number;
  name: string;
  phone: string;
  role: string;
  jerseyName: string;
  jerseyNumber: string;
  jerseySize: string;
  area: string;
  screenshot: File | null;
}

interface Errors {
  [key: string]: string | undefined; 
}

const PlayerRegistrationPage = () => {
  const [pId, setPId] = useState<number>(0);
  const [formData, setFormData] = useState<PlayerFormData>({
    playerId: pId,
    name: "",
    phone: "",
    role: "",
    jerseyName: "",
    jerseyNumber: "",
    jerseySize: "",
    area: "",
    screenshot: null,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [preview, setPreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // New state to hold the fetched Player ID
  const [playerId, setPlayerId] = useState<number | null>(null);

  const tournamentId = "RCT- 1";

  // Fetch the next player ID when the component mounts
  useEffect(() => {
    const fetchNextId = async () => {
      try {
        const response = await fetch("/api/player/id");
        if (!response.ok) throw new Error("Failed to fetch player ID");
        const data = await response.json();
        setPlayerId(data.nextId);
        setPId(data.nextId);
      } catch (error: any) {
        console.error(error);
        setApiError("Could not load Player ID. Please refresh the page.");
      }
    };
    fetchNextId();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setApiError(null);

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0] || null;

      if (file) {
        // --- NEW: File Type Validation ---
        const allowedTypes = ["image/jpeg","image/jpg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            screenshot: "Invalid file type. Only JPG and PNG images are allowed.",
          }));
          setPreview(null); // Clear preview of invalid file
          fileInput.value = ""; // Reset the file input so user can select again
          setFormData({ ...formData, screenshot: null }); // Clear from form state
          return; // Stop further processing
        }
        // --- End of Validation ---

        // If validation passes, clear any previous error
        setErrors((prev) => ({ ...prev, screenshot: undefined }));
        setFormData({ ...formData, screenshot: file });

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // If no file is selected (e.g., user cancels file selection)
        setFormData({ ...formData, screenshot: null });
        setPreview(null);
        setErrors((prev) => ({ ...prev, screenshot: "Upload payment screenshot (JPG/PNG only)." }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter 10-digit number";
    if (!formData.role) newErrors.role = "Preferred Role is required";
    if (!formData.jerseyName) newErrors.jerseyName = "Jersey Name is required";
    if (!/^\d+$/.test(formData.jerseyNumber))
      newErrors.jerseyNumber = "Only numbers allowed";
    if (!formData.jerseySize) newErrors.jerseySize = "Select jersey size";
    if (!formData.area) newErrors.area = "Select area";
    // We check for the file in state, which is cleared if the type is invalid
    if (!formData.screenshot)
      newErrors.screenshot = "Upload payment screenshot (JPG/PNG only).";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError(null);

    // Add a check to ensure playerId is loaded before submitting
    if (playerId === null) {
      setApiError(
        "Player ID hasn't loaded yet. Please wait or refresh the page."
      );
      return;
    }

    if (!validate()) return;
    setIsSubmitting(true);

    const data = new FormData();
    // Append the fetched playerId to the form data
    data.append("playerId", String(playerId));

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch("/api/player", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit registration.");
      }

      setShowSuccessAlert(true);
      // Optionally reset form data after successful submission
      setFormData({
        playerId: pId, // Keep the last fetched pId or re-fetch next
        name: "",
        phone: "",
        role: "",
        jerseyName: "",
        jerseyNumber: "",
        jerseySize: "",
        area: "",
        screenshot: null,
      });
      setPreview(null); // Clear image preview
      setErrors({}); // Clear any previous errors
      setPlayerId(null); // Reset playerId to trigger a new fetch
    } catch (error: any) {
      console.error("Submission failed:", error);
      setApiError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SuccessAlert
        visible={showSuccessAlert}
        message="Your registration has been submitted successfully!"
        onClose={() => setShowSuccessAlert(false)}
      />
      <div className="font-outfit max-w-xl mx-auto mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          Player Registration Form
        </h3>
        <div>
          <Image
            src={"/barcode.jpeg"}
            width={500}
            height={200}
            alt="Payment Barcode"
            className="w-[30vh] mx-auto"
          />
        </div>
        <div className="border border-gray-300 rounded-xl bg-yellow-50 dark:bg-gray-800 p-4 mt-4 shadow-md">
          <h3 className="text-xl font-bold text-red-600 mb-3">
            📋 Registration Rules Rainy Cricket Tournament 2025
          </h3>

          <ul className="list-decimal list-inside space-y-2 text-gray-800 dark:text-gray-100">
            <li>
              First pay the <span className="text-red-500 font-semibold">₹ 300</span> registration fee on GPay Number:{" "}
              <span className="font-semibold text-blue-600">9324458770</span> ya barcode se payment karo,{" "}
              <strong>phir hi form bharo</strong>.
            </li>
            <li>
              <strong>Har field zaroori hai</strong> – please fill all the fields properly. Empty fields accept nahi honge.
            </li>
            <li>
              <strong>Only upload payment screenshot</strong>, apna photo ya kuch aur mat bhejo.
            </li>
            <li>
              Form submit karne ke baad, WhatsApp group join karne ka link milega.{" "}
              <strong>Us group ko zaroor join karo</strong> for further updates.
            </li>
            <li>
              Agar <strong>payment screenshot valid nahi hai</strong> ya galat hai, toh player ko auction mein include nahi kiya jayega. Payment genuine hona chahiye.
            </li>
            <li>Join the Whatsapp Group After Submit your Form!!!</li>
            <li>
              Any Issue to fill the form Contact on whatsapp only{" "}
              <span className="text-red-500 font-semibold">+91 9324458770</span> Please Do not call!
            </li>
          </ul>

          <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-300">
            🟢 Follow all instructions carefully to confirm your registration.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
          <div className="flex justify-between">
            <h2 className="font-semibold text-red-500 text-[18px]">
              Tournament Id - {tournamentId}
            </h2>
            {/* Display the loaded Player ID */}
            <h2 className="font-semibold text-green-500 text-[18px]">
              Player ID - {playerId === null ? "Loading..." : playerId}
            </h2>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Player Name"
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <input
            type="text"
            name="role"
            placeholder="Preferred Role (e.g. Batsman)"
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            value={formData.role}
            onChange={handleChange}
          />
          {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}

          <input
            type="text"
            name="jerseyName"
            placeholder="Jersey Name"
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            value={formData.jerseyName}
            onChange={handleChange}
          />
          {errors.jerseyName && (
            <p className="text-red-500 text-sm">{errors.jerseyName}</p>
          )}

          <input
            type="text"
            name="jerseyNumber"
            placeholder="Jersey Number"
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            value={formData.jerseyNumber}
            onChange={handleChange}
          />
          {errors.jerseyNumber && (
            <p className="text-red-500 text-sm">{errors.jerseyNumber}</p>
          )}

          <select
            disabled
            className="w-full p-2 border rounded bg-gray-200 dark:bg-gray-600 text-black font-semibold dark:text-gray-400"
          >
            <option value="online">Payment Mode: Only Online</option>
          </select>

          <select
            name="jerseySize"
            value={formData.jerseySize}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Jersey Size</option>
            {["34", "36", "38", "40", "42", "44", "46", "48"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.jerseySize && (
            <p className="text-red-500 text-sm">{errors.jerseySize}</p>
          )}

          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Area</option>
            {[
              "Nehru Nagar",
              "Jagruti Nagar",
              "Kurla West",
              "Qureshi Nagar",
              "Thakkar Bappa",
              "Shiv Shrusti",
            ].map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}

          <div>
            <label className="block text-[19px] font-semibold mb-1 text-red-700 dark:text-white">
              Upload Payment Screenshot
            </label>
            <input
              type="file"
              name="screenshot"
              // NEW: Update the accept attribute
              accept="image/jpeg, image/jpg, image/png"
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            />
            {errors.screenshot && (
              <p className="text-red-500 text-sm">{errors.screenshot}</p>
            )}
            {preview && (
              <Image
                src={preview}
                alt="Payment Screenshot"
                width={130}
                height={50}
                className="mt-2 rounded-md h-40 w-auto"
              />
            )}
          </div>

          {apiError && (
            <p className="text-red-500 text-center font-semibold">{apiError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || playerId === null} // Disable button while submitting OR if ID hasn't loaded
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PlayerRegistrationPage;