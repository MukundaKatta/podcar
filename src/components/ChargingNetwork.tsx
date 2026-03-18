'use client'

import { useStore } from '@/lib/store'
import { Zap, Battery, MapPin } from 'lucide-react'

export default function ChargingNetwork() {
  const { hubs } = useStore()
  const totalPorts = hubs.reduce((s, h) => s + h.totalPorts, 0)
  const totalAvailable = hubs.reduce((s, h) => s + h.available, 0)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Charging Network</h2>
        <p className="text-gray-400">Pod charging infrastructure management</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Zap className="w-8 h-8 text-yellow-400 mb-3" />
          <p className="text-2xl font-bold">{hubs.length}</p>
          <p className="text-xs text-gray-400">Charging Hubs</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <Battery className="w-8 h-8 text-green-400 mb-3" />
          <p className="text-2xl font-bold">{totalPorts}</p>
          <p className="text-xs text-gray-400">Total Ports</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <MapPin className="w-8 h-8 text-rose-400 mb-3" />
          <p className="text-2xl font-bold">{totalAvailable}</p>
          <p className="text-xs text-gray-400">Available Now</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {hubs.map(hub => {
          const used = hub.totalPorts - hub.available
          const pct = (used / hub.totalPorts) * 100
          return (
            <div key={hub.id} className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{hub.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${hub.speed === 'fast' ? 'bg-yellow-600/20 text-yellow-400' : 'bg-blue-600/20 text-blue-400'}`}>
                  {hub.speed}
                </span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Ports: {used}/{hub.totalPorts}</span>
                <span>{pct.toFixed(0)}% used</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 mb-3">
                <div className="h-3 rounded-full" style={{ width: `${pct}%`, backgroundColor: pct > 80 ? '#ef4444' : pct > 50 ? '#eab308' : '#22c55e' }} />
              </div>
              <div className="grid grid-cols-6 gap-1">
                {Array.from({ length: hub.totalPorts }, (_, i) => (
                  <div key={i} className={`h-4 rounded ${i < used ? 'bg-rose-500' : 'bg-gray-700'}`} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
