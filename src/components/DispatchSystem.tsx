'use client'

import { useStore } from '@/lib/store'
import { MapPin, Clock, Users, ArrowRight, CheckCircle } from 'lucide-react'

const statusColors = { pending: 'text-yellow-400', assigned: 'text-blue-400', en_route: 'text-cyan-400', completed: 'text-green-400' }

export default function DispatchSystem() {
  const { dispatches, pods } = useStore()

  return (
    <div className="h-full flex">
      <div className="flex-1 relative bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <svg className="w-full h-full opacity-10">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={i} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#f43f5e" strokeWidth="0.5" />
            ))}
          </svg>
          {/* Pod markers */}
          {pods.filter(p => p.status === 'active').slice(0, 10).map((pod, i) => {
            const x = 15 + (i % 4) * 22
            const y = 20 + Math.floor(i / 4) * 25
            return (
              <div key={pod.id} className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
                <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/30">
                  <span className="text-[8px] font-bold text-white">{pod.id.split('-')[1]}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <p className="text-sm font-medium">Dispatch Map</p>
          <p className="text-xs text-rose-400 mt-1">Mapbox GL integration ready</p>
        </div>
      </div>

      <div className="w-96 bg-gray-900 border-l border-gray-800 p-4 overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Active Dispatches</h3>
        <div className="space-y-3">
          {dispatches.map(d => (
            <div key={d.id} className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">{d.podId}</span>
                <span className={`text-xs capitalize ${statusColors[d.status]}`}>{d.status.replace('_', ' ')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-gray-300 truncate">{d.pickup}</span>
                <ArrowRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-gray-300 truncate">{d.dropoff}</span>
              </div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{d.passengers}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{d.eta} min ETA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
