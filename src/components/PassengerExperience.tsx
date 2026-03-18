'use client'

import { useState } from 'react'
import { Users, Star, Music, Thermometer, Volume2, Wifi, Coffee, Lightbulb } from 'lucide-react'

export default function PassengerExperience() {
  const [temp, setTemp] = useState(72)
  const [music, setMusic] = useState(40)
  const [lightMode, setLightMode] = useState('ambient')

  return (
    <div className="h-full flex items-center justify-center bg-gray-950 p-8">
      <div className="w-[420px] bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="bg-rose-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-bold">PodCar Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              <span className="text-xs">Connected</span>
            </div>
          </div>
        </div>

        {/* Ride info */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400">Currently heading to</p>
              <p className="text-lg font-bold">Ferry Building</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">ETA</p>
              <p className="text-lg font-bold text-rose-400">8 min</p>
            </div>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div className="bg-rose-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-6">
          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span className="text-sm">Temperature</span>
              </div>
              <span className="text-sm font-bold">{temp}F</span>
            </div>
            <input type="range" min="60" max="85" value={temp} onChange={e => setTemp(Number(e.target.value))}
              className="w-full accent-rose-500" />
          </div>

          {/* Music */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-violet-400" />
                <span className="text-sm">Ambient Music</span>
              </div>
              <span className="text-sm font-bold">{music}%</span>
            </div>
            <input type="range" min="0" max="100" value={music} onChange={e => setMusic(Number(e.target.value))}
              className="w-full accent-rose-500" />
          </div>

          {/* Lighting */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Interior Lighting</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['ambient', 'warm', 'cool', 'off'].map(mode => (
                <button key={mode} onClick={() => setLightMode(mode)}
                  className={`py-2 rounded-lg text-xs font-medium capitalize ${
                    lightMode === mode ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-400'
                  }`}>
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-gray-800 rounded-xl py-3 text-sm hover:bg-gray-700">
              <Coffee className="w-4 h-4 text-amber-400" /> Request Stop
            </button>
            <button className="flex items-center justify-center gap-2 bg-gray-800 rounded-xl py-3 text-sm hover:bg-gray-700">
              <Volume2 className="w-4 h-4 text-blue-400" /> Quiet Mode
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="p-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400 mb-3">Rate your ride experience</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} className="p-1 hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
