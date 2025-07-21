'use client'

import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const tournaments = [
  {
    id: 1,
    name: 'Rainy Cricket Tournament',
    image: '/rct_img.png',
    location: 'Dr. Babasaheb Ground',
    date: '15, 16, 17th August 2025',
    time: '10:00 AM',
    entryFee: 10000,
    playerFee: 300,
    teamLimit: 8,
    playerLimit: 12,
    youtubeLive: true,
  },
  {
    id: 2,
    name: 'Summer Cricket Fest',
    image: '/tcf_img.png',
    location: 'BKC Stadium',
    date: '27th July 2025',
    time: '2:00 PM',
    entryFee: 1500,
    playerFee: 150,
    teamLimit: 8,
    playerLimit: 11,
    youtubeLive: false,
  },
]

const Page = () => {
  const params = useParams()
  const id = parseInt(params?.id as string)
  const tournament = tournaments.find((t) => t.id === id)

  const [registerType, setRegisterType] = useState<'team' | 'player' | null>(null)

  if (!tournament) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto p-6 font-outfit">
      <div className="relative w-full h-60 rounded-xl overflow-hidden shadow-md mb-6">
        <Image
          src={tournament.image}
          alt={tournament.name}
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-3xl font-bold mb-2">{tournament.name}</h1>
      <p className="text-gray-600 mb-1">📍 Location: {tournament.location}</p>
      <p className="text-gray-600 mb-1">📅 Date: {tournament.date}</p>
      <p className="text-gray-600 mb-1">🕒 Time: {tournament.time}</p>
      <p className="text-gray-600 mb-1">🎟️ Entry Fee: ₹{tournament.entryFee}</p>
      <p className="text-gray-600 mb-1">🧍 Player Fee: ₹{tournament.playerFee}</p>
      <p className="text-gray-600 mb-1">🏏 Teams: {tournament.teamLimit}</p>
      <p className="text-gray-600 mb-1">👥 Players per Team: {tournament.playerLimit}</p>
      <p className="text-gray-600 mb-4">
        📺 YouTube Live: {tournament.youtubeLive ? 'Yes' : 'No'}
      </p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setRegisterType('team')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register as Team
        </button>
        <button
          onClick={() => setRegisterType('player')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register as Player
        </button>
      </div>

      {registerType === 'team' && (
  <div className="border border-gray-300 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      Team Registration Form
    </h3>
    <form className="space-y-3">
      <input
        type="text"
        placeholder="Team Name"
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />
      <input
        type="text"
        placeholder="Icon Name"
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Owner First Name"
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          placeholder="Owner Last Name"
          className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
        />
      </div>

      <select
        defaultValue=""
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      >
        <option value="" disabled>Select Payment Method</option>
        <option value="cash">Cash</option>
        <option value="online">Online</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  </div>
)}


   {registerType === 'player' && (
  <div className="border border-gray-300 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
    <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
      Player Registration Form
    </h3>
    <form className="space-y-3">
      <input
        type="text"
        placeholder="Player Name"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Preferred Role (e.g. Batsman)"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <input
        type="text"
        placeholder="Jersey Name"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />
      <input
        type="number"
        placeholder="Jersey Number"
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      />

      {/* Payment Method */}
      <select
        defaultValue=""
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      >
        <option disabled value="">
          Select Payment Method
        </option>
        <option value="cash">Cash</option>
        <option value="online">Online</option>
      </select>

      {/* Jersey Size */}
      <select
        defaultValue=""
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      >
        <option disabled value="">
          Select Jersey Size
        </option>
        {["34", "36", "38", "40", "42", "44", "46", "48"].map(size => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>

      {/* Area */}
      <select
        defaultValue=""
        className="w-full p-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
      >
        <option disabled value="">
          Select Area
        </option>
        {[
          "Nehru Nagar",
          "Jagruti Nagar",
          "Kurla West",
          "Qureshi Nagar",
          "Thakkar Bappa",
          "Shiv Shrusti"
        ].map(area => (
          <option key={area} value={area}>{area}</option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Submit
      </button>
    </form>
  </div>
)}



    </div>
  )
}

export default Page
