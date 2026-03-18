'use client'

import { useStore } from '@/lib/store'
import { Box, MapPin, Users, Zap, Shield } from 'lucide-react'
import VehicleViewer from '@/components/VehicleViewer'
import DispatchSystem from '@/components/DispatchSystem'
import PassengerExperience from '@/components/PassengerExperience'
import ChargingNetwork from '@/components/ChargingNetwork'
import SafetyDashboard from '@/components/SafetyDashboard'

const tabs = [
  { id: 'viewer', label: 'Vehicle Viewer', icon: Box },
  { id: 'dispatch', label: 'Dispatch System', icon: MapPin },
  { id: 'passenger', label: 'Passenger Experience', icon: Users },
  { id: 'charging', label: 'Charging Network', icon: Zap },
  { id: 'safety', label: 'Safety Dashboard', icon: Shield },
]

export default function HomePage() {
  const { activeTab, setActiveTab, pods } = useStore()
  const activePods = pods.filter(p => p.status === 'active').length

  const render = () => {
    switch (activeTab) {
      case 'viewer': return <VehicleViewer />
      case 'dispatch': return <DispatchSystem />
      case 'passenger': return <PassengerExperience />
      case 'charging': return <ChargingNetwork />
      case 'safety': return <SafetyDashboard />
      default: return <VehicleViewer />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">PodCar</h1>
              <p className="text-xs text-gray-400">AV Pod Platform</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-rose-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}>
              <tab.icon className="w-5 h-5" /> {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="bg-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-400">Fleet</p>
            <p className="text-lg font-bold">{pods.length} Pods</p>
            <p className="text-xs text-rose-400">{activePods} Active</p>
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">{render()}</main>
    </div>
  )
}
