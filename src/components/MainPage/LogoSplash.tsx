'use client';

import Image from 'next/image';

export default function LogoSplash({ progress }: { progress: number }) {
  return (
    <div className="font-outfit h-[70vh] flex flex-col items-center justify-center text-white px-4">
      <Image
        src="/kct_logo.png"
        alt="Kurla Cricket Tournament"
        width={150}
        height={150}
        className="mb-6"
      />

      {/* Progress Bar */}
      <div className="w-[50%] max-w-xs h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
        <div
          className="bg-orange-500 h-full transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Percentage Text */}
      <p className="text-sm text-black dark:text-white font-semibold">Loading <span className='text-green-500 font-bold'>{progress}%</span></p>
    </div>
  );
}
