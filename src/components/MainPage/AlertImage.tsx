'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const AlertImage = () => {
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!showAlert) return null

  return (
    <div className="fixed inset-0 bg-black/80 font-outfit  bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl w-[85%] max-w-md">
        {/* Close button */}
        <button
          onClick={() => setShowAlert(false)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 text-[40px]"
        >
          &times;
        </button>

        {/* Image */}
        <div className="w-[100%] mb-4">
          <Image
            src="/sp_banner.png" // replace with actual image in /public folder
            alt="Tournament"
            width={400}
            height={200}
            className="rounded-lg w-full h-auto"
          />
        </div>

        {/* Message */}
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
          Rainy Cricket Tournament 2025
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-1">
          Supported by: <strong>Mr. Swapnil Mhatre and M/s Sonali Swapnil Mhatre</strong>
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Thanks for the support and encouragement to promote youth sports in Kurla!
        </p>

        {/* Button */}
        <button
          onClick={() => {
            setShowAlert(false)
            router.push('/tournaments/1')
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full font-semibold"
        >
          Click to go Rainy Cricket Tournament Page
        </button>
      </div>
    </div>
  )
}

export default AlertImage

