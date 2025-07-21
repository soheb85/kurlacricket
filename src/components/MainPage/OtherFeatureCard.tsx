"use client";
import React, { useState } from "react";
import {
  BadgeCheck,
  Video,
  Users,
  Trophy,
  DollarSign,
  Calendar,
  Award,
} from "lucide-react";

const FeatureCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      title: "Digital Tournament Banner Service",
      emoji: "🎨",
      description:
        "We help you design digital banners for your tournaments with all important details to attract more players and viewers.",
      items: [
        {
          icon: BadgeCheck,
          text: "Tournament Name & Logo Display",
          color: "text-green-500",
        },
        {
          icon: Trophy,
          text: "Total Teams & Players Count",
          color: "text-yellow-500",
        },
        {
          icon: Users,
          text: "Players Registration with Fees",
          color: "text-cyan-500",
        },
        { icon: DollarSign, text: "Entry Fee Details", color: "text-rose-500" },
        {
          icon: Video,
          text: "YouTube Live Mention (Yes/No)",
          color: "text-red-500",
        },
      ],
    },
    {
      title: "Turf Organised and Booking",
      emoji: "🏟️",
      description:
        "Effortlessly book and manage turf facilities for your matches with our streamlined scheduling system.",
      items: [
        {
          icon: Calendar,
          text: "Easy Online Booking System",
          color: "text-blue-500",
        },
        {
          icon: Users,
          text: "Team Scheduling Support",
          color: "text-cyan-500",
        },
        {
          icon: BadgeCheck,
          text: "Verified Turf Quality",
          color: "text-green-500",
        },
        {
          icon: DollarSign,
          text: "Transparent Pricing",
          color: "text-rose-500",
        },
        {
          icon: Trophy,
          text: "Custom Match Arrangements",
          color: "text-yellow-500",
        },
      ],
    },
    {
      title: "Reasonable Ball and Cricket Trophys",
      emoji: "🏏",
      description:
        "Get high-quality cricket balls and Trophy at affordable prices to elevate your game.",
      items: [
        {
          icon: Award,
          text: "Tennex, Headly, Rubber Cricket Balls",
          color: "text-red-500",
        },
        {
          icon: BadgeCheck,
          text: "Original & Good Quality",
          color: "text-green-500",
        },
        {
          icon: DollarSign,
          text: "Affordable Pricing",
          color: "text-rose-500",
        },
        {
          icon: Users,
          text: "Wide Range for All Trophy",
          color: "text-cyan-500",
        },
        {
          icon: Trophy,
          text: "Winner, Runner-up, Man of the Series, MOM, Best Bowler,Best Batsman",
          color: "text-yellow-500",
        },
      ],
    },
    {
      title: "Custom Cricket Jerseys",
      emoji: "👕",
      description: "Design your own team jerseys with logos, names & numbers",
      items: [
        {
          icon: BadgeCheck,
          text: "Custom Design with Team Logo",
          color: "text-blue-500",
        },
        {
          icon: Users,
          text: "Name & Number on Back for All Players",
          color: "text-green-500",
        },
        {
          icon: DollarSign,
          text: "Pocket-Friendly Rates",
          color: "text-amber-500",
        },
        {
          icon: Award,
          text: "High Quality Dry-Fit Material",
          color: "text-purple-500",
        },
        {
          icon: Trophy,
          text: "Fast Delivery Before Tournament",
          color: "text-rose-500",
        },
      ],
    },
    {
      title: "Cricket Auction System",
      emoji: "💰",
      description:
        "Engage players & teams with our exciting digital auction platform",
      items: [
        {
          icon: Users,
          text: "Player Registration with Stats",
          color: "text-blue-500",
        },
        {
          icon: DollarSign,
          text: "Bidding System for Team Selection",
          color: "text-green-500",
        },
        {
          icon: Trophy,
          text: "Create Teams Dynamically",
          color: "text-yellow-500",
        },
        {
          icon: Video,
          text: "Live Auction Broadcast Option",
          color: "text-purple-500",
        },
        {
          icon: Award,
          text: "Scoreboard & Player Performance Track",
          color: "text-red-500",
        },
      ],
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="font-outfit w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Our Features
      </h2>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 group bg-white p-6 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">{feature.emoji}</span>{" "}
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                {feature.description}
              </p>
              <ul className="text-sm grid grid-col-1 place-content-center space-y-3 text-gray-700">
                {feature.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 group-hover:text-gray-800 transition-colors"
                  >
                    <item.icon
                      className={`w-5 h-5 ${item.color} flex-shrink-0`}
                    />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 p-1.5 rounded-full transition-colors"
          aria-label="Previous slide"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 text-gray-800 p-1.5 rounded-full transition-colors"
          aria-label="Next slide"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center items-center gap-2 py-4">
        {features.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-gray-800 scale-125"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureCarousel;
