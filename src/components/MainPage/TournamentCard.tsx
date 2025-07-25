"use client";
import React from "react";
import Image from "next/image";
import CarouselDots from "../UtilityComponent/CarouselDots";
import Link from "next/link";

type Tournament = {
  id: number;
  image: string;
  name: string;
  venue: string;
  date: string;
  time: string;
};

const tournaments: Tournament[] = [
  {
    id: 1,
    image: "/rct_img.png",
    name: "Rainy Cricket Tournament",
    venue: "Dr. Babasaheb Ground",
    date: "15, 16, 17th August 2025",
    time: "10:00 AM",
  },
];

const TournamentCard = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-12 px-4 font-outfit">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        🏏 Live & Upcoming Tournaments
      </h2>

      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {tournaments.map((tournament) => (
          <Link href={`/tournaments/${tournament.id}`} key={tournament.id}>
            <div className="min-w-[260px] max-w-[260px] rounded-2xl shadow-md bg-white dark:bg-gray-800 border dark:border-gray-700 hover:scale-[1.03] transition-transform cursor-pointer">
              <div className="w-full h-40 relative rounded-t-2xl overflow-hidden">
                <Image
                  src={tournament.image}
                  alt={tournament.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-[#16a34a] dark:text-green-400 mb-1 truncate">
                  {tournament.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📍 <span className="font-medium">{tournament.venue}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📅 {tournament.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  🕒 {tournament.time}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <CarouselDots />
      </div>
    </div>
  );
};

export default TournamentCard;
