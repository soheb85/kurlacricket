/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'

const tournaments = [
  {
    id: 1,
    name: 'Rainy Cricket Tournament',
    image: '/rct_img.png',
    location: 'Dr. Babasaheb Ground',
    date: '15, 16, 17th August 2025',
    time: '10:00 AM',
    entryFee: 6000,
    playerFee: 300,
    teamLimit: 8,
    playerLimit: 10,
    youtubeLive: true,
  },
]

const Page = () => {
  // const [count,setCount] = useState(0);
  const router = useRouter();
  const params = useParams()
  const id = parseInt(params?.id as string)
  const tournament = tournaments.find((t) => t.id === id)

  // const [registerType, setRegisterType] = useState<'player' | null>(null)
  

  if (!tournament) {
    notFound()
  }

useEffect(() => {
  const fetchNextId = async () => {
      try {
        const response = await fetch("/api/player/id");
        if (!response.ok) throw new Error("Failed to fetch player ID");
        const data = await response.json();
        console.log(data);
        // setCount(data.nextId);
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchNextId();
},[])

  

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
      <div className='px-2 py-2'>
        <h1>• 1st Price :- <span className='text-orange-500 font-semibold'>20,000 + Trophy</span></h1>
      </div>
      <div className='px-2 py-2'>
        <h1>• 2nd Price :- <span className='text-orange-500 font-semibold'>17,000 + Trophy</span></h1>
      </div>
      <div className='pb-2 font-semibold'>
        <h1 className='text-[19px] text-teal-400'>• Every Match will be a <span>Man of the Match</span> Trophy</h1>
      </div>
      <p className="text-gray-600 mb-1 font-semibold">🧍 Player Fee: <span className='text-red-700 font-bold text-[20px]'>₹ {tournament.playerFee}</span>  ( T-Shirt )</p>
      <p className="text-gray-600 mb-1">🏏 Teams: {tournament.teamLimit}</p>
      <p className="text-gray-600 mb-1">👥 Players per Team: {tournament.playerLimit}</p>
      <p className="text-gray-600 mb-4">
        📺 YouTube Live: {tournament.youtubeLive ? 'Let You Know Soon!!' : 'No'}
      </p>
      <h2 className='text-blue-500 py-2'>🏏 Only 2 All over india cricket player allowed</h2>
      <p className="text-red-600 mb-1 pb-2">👥 Only First 80 Form Consider for Tournament!!!</p>

      
      


      <div className="flex space-x-4 mb-6">
        {/* <button
          onClick={() => setRegisterType('team')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register as Team
        </button> */}
        <button
          onClick={() => router.push('/players')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register as Player
        </button>
        {/* <div className='py-2 text-[18px] font-bold'>
        <h1>Total Form :-  <span className='text-amber-500 px-1'>{count- (count == 0 ? 0:1)} / 80</span></h1>
      </div> */}
      </div>
      

      {/* {registerType === 'team' && (
  <div className="border border-gray-300 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      Team Registration Form
    </h3>
    <form className="space-y-3">
      <h2 className='font-semibold text-red-500'>Tournament Id - {tournament.id}</h2>
    <input
        type="text"
        placeholder="Team Name"
        className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-white"
      />
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
)} */}


    </div>
  )
}

export default Page
