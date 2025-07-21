'use client'
import React from 'react'
import Image from 'next/image'

const SpecialThanksCard = () => {
  return (
    <div className="font-outfit w-full max-w-5xl mx-auto bg-gradient-to-r from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-2xl rounded-2xl overflow-hidden border dark:border-gray-700 border-gray-200">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-1/2 w-full h-64 md:h-auto">
          <Image
            src="/imrankhan_img.png" // or use your uploaded image path
            alt="Imran Khan - Founder of KPL"
            fill
            className="object-contain"
          />
          <div className="absolute bottom-0 bg-black/60 w-full text-white text-center py-2 text-sm md:text-base font-semibold">
            Founder & President of KPL
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-[#dc2626] dark:text-[#f87171] mb-4 tracking-wide">
            Special Thanks
          </h2>

          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-3">
            We express our heartfelt gratitude to <span className="font-semibold text-black dark:text-white">Imran Khan</span>, the President and Founder of <span className="font-bold text-[#2563eb] dark:text-[#60a5fa]">Kurla Premier League (KPL)</span>.
            His vision and dedication have opened doors for many young cricket enthusiasts to showcase their talent.
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
            This website furthers his mission — reaching more players, providing them with a platform to grow, and encouraging active participation in tournaments. We&apos;re proud to support his initiative and make cricket accessible to everyone in our community.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SpecialThanksCard
