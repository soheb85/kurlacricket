'use client'

import { useEffect, useState } from "react";
import LogoSplash from '../components/MainPage/LogoSplash';
import HeroPage from "@/components/MainPage/HeroPage";
import SponsorCard from "@/components/MainPage/SponsorCard";
import SpecialThanksCard from "@/components/MainPage/SpecialThanksCard";
import TournamentCard from "@/components/MainPage/TournamentCard";
import OtherFeatureCard from "@/components/MainPage/OtherFeatureCard";

export default function Home() {
  const[loading, setLoading] = useState(true);
const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Wait before showing main page
          return 100;
        }
        return prev + 1;
      });
    }, 30); // speed of loading

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LogoSplash progress={progress} />;
  }

  return (
    <div className="">
      <div>
        <HeroPage/>
        <div className="px-4 py-10 flex flex-col items-center gap-6 font-outfit">
      <h1 className="text-[17px] font-bold text-center text-white dark:text-green-400 dark:bg-white bg-black p-2 rounded-lg">📢 Become a Cricket Tournament Sponsor</h1>
      <p className="text-center max-w-md text-amber-600 font-semibold">
        Partner with us to promote your brand across live matches, banners, and event promotions.
      </p>
      <SponsorCard />
    </div>
      </div>
      <div className="px-4 py-10 space-y-12">
      {/* Other sections */}
      <SpecialThanksCard />
    </div>
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <TournamentCard />
      <OtherFeatureCard/>
    </main>
    
    </div>
  );
}
