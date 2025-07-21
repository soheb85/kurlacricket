'use client'
import React from 'react'
import Image from 'next/image'
import CarouselDots from '../UtilityComponent/CarouselDots'

type Tournament = {
  id: number
  image: string
  name: string
  venue: string
  date: string
  time: string
}

const tournaments: Tournament[] = [
  {
    id: 1,
    image: '/rct_img.png',
    name: 'Rainy Cricket Tournament',
    venue: 'Dr.Babasaheb Ground',
    date: '15, 16, 17th August 2025',
    time: '10:00 AM',
  },
  {
    id: 2,
    image: '/tcf_img.png',
    name: 'Summer Cricket Fest',
    venue: 'BKC Stadium',
    date: '27th July 2025',
    time: '2:00 PM',
  },
  {
    id: 3,
    image: '/kpl3.png',
    name: 'Junior Cup 2025',
    venue: 'Wankhede Practice Nets',
    date: '29th July 2025',
    time: '9:00 AM',
  },
  {
    id: 4,
    image: '/kpl4.png',
    name: 'Monsoon Bash',
    venue: 'Andheri Sports Complex',
    date: '1st August 2025',
    time: '11:00 AM',
  },
  {
    id: 5,
    image: '/kpl5.png',
    name: 'Legends Night Cricket',
    venue: 'Kurla Night Turf',
    date: '3rd August 2025',
    time: '7:00 PM',
  }
]

const TournamentCard = () => {
  return (
    <div>
    <div className="font-outfit w-full py-12 px-4 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        🏏 Live & Upcoming Tournaments
      </h2>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="min-w-[260px] max-w-[260px] rounded-xl shadow-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
          >
            <div className="w-full h-40 relative rounded-t-xl overflow-hidden">
              <Image
                src={tournament.image}
                alt={tournament.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-3">
              <h3 className="font-semibold text-lg text-[#16a34a] dark:text-green-400 mb-1">{tournament.name}</h3>
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
        ))}
      </div>
    </div>
    <div>
      <CarouselDots/>
    </div>
    </div>
  )
}

export default TournamentCard
