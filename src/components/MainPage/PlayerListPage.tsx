/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IPlayer } from '@/models/Players'; // Assuming you have a Player type defined

interface PlayerData extends IPlayer {
  _id: string;
}

const PlayerListPage = () => {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Fetch player data on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('/api/player');
        if (!response.ok) {
          throw new Error('Failed to fetch player data');
        }
        const data = await response.json();
        setPlayers(data.players || []);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchPlayers();
  }, []);

  // Open modal with selected image
  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Registered Players
      </h2>

      {loading && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold">{error}</div>
      )}

      {!loading && !error && players.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          No players registered yet.
        </div>
      )}

      {!loading && !error && players.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-600">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Player ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Jersey Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Jersey Number
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Jersey Size
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Area
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800 dark:text-white">
                  Screenshot
                </th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr
                  key={player._id}
                  className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.playerId}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.role}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.jerseyName}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.jerseyNumber}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.jerseySize}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                    {player.area}
                  </td>
                  <td className="px-4 py-3">
                    {player.screenshot ? (
                      <button
                        onClick={() => openModal(player.screenshot)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View
                      </button>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for displaying screenshot */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Payment Screenshot
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="relative w-full h-96">
              <Image
                src={selectedImage}
                alt="Payment Screenshot"
                layout="fill"
                objectFit="contain"
                className="rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerListPage;
