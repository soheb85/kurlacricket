// components/SponsorCard.tsx
'use client'
import React from 'react'


const SponsorCard = () => {
  return (
    <div className="relative w-full md:w-[400px] h-[230px] rounded-2xl overflow-hidden shadow-lg px-4 py-4 bg-cover bg-center font-outfit" style={{ backgroundImage: 'url(/sponsor_bg.jpg)' }}>
      <div className="absolute inset-0 bg-black/70 dark:bg-white z-10" />
      <div className="relative z-20 text-white dark:text-black">
        <h2 className="text-xl font-bold  mb-2">🏏 Become a Sponsor</h2>
        <ul className="list-disc list-inside text-sm space-y-1 font-semibold">
          <li>Your Logo on T-shirts</li>
          <li>Winning Trophy by You</li>
          <li>Live Match Banner Ads</li>
          <li>Social Media Promotions</li>
          <li>Audience Announcements</li>
        </ul>
        <button className="mt-4 px-4 py-1 rounded bg-yellow-500 text-black text-sm font-semibold hover:bg-yellow-400">
          Contact Us
        </button>
      </div>
    </div>
  )
}

export default SponsorCard
