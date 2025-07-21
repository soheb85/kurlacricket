'use client';
import React from 'react';
import Image from 'next/image';

const HeroPage = () => {
    const partners = [
  '/kct_logo.png',
  '/AA_property_logo.png',
  '/sarafootwear_logo.png',
  '/image.png',
  '/kpl_logo.png'
];
  return (
    <div>
    <div className="container px-2 mx-auto font-outfit">
      <div className="relative w-full max-w-md mx-auto rounded-xl shadow-lg overflow-hidden">
        {/* Image as background */}
        <div className="relative h-55">
          <Image
            src="/nehru_nagar_ground.png"
            alt="Kurla Cricket Tournament"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 flex flex-col items-start justify-center text-white p-4">
            <div className='h-8 px-2 bg-black/70 rounded-lg'>
                <h1 className="text-lg font-bold ">Welcome to <span className='text-orange-500'>Kurla</span> Cricket <span className='text-green-500'>Tournament</span></h1>
            </div>
            <p className="text-xs mt-1 text-center">All tournament details available</p>
            <p className="text-xs mb-8 text-center">Click below to view tournaments</p>
            <button className="mt-10 px-4 py-1 mr-40 bg-green-500 rounded-full text-sm font-semibold hover:bg-green-600 outline-none ">
              View Tournaments
            </button>
          </div>
        </div>
      </div>
    </div>
    <div>
        <div className='flex items-center justify-center mt-8 font-black text-xl'>
            <h2>Partners and Cricket Club</h2>
        </div>
         <div className="overflow-hidden w-full py-4">
        <div className="flex animate-scroll-left gap-10 w-max">
          {partners.concat(partners).map((logo, index) => (
            <Image
              key={index}
              src={logo}
              alt={`Partner ${index + 1}`}
              width={80}
              height={80}
              className="rounded-full object-contain"
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default HeroPage;
