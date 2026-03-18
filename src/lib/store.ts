import { create } from 'zustand'

export interface Pod {
  id: string; name: string; type: 'shuttle' | 'personal' | 'cargo'
  status: 'active' | 'idle' | 'charging' | 'maintenance'; lat: number; lng: number
  battery: number; passengers: number; maxPassengers: number; speed: number
}

export interface Dispatch {
  id: string; podId: string; pickup: string; dropoff: string
  status: 'pending' | 'assigned' | 'en_route' | 'completed'; passengers: number; eta: number
}

export interface ChargingHub {
  id: string; name: string; lat: number; lng: number
  totalPorts: number; available: number; speed: 'standard' | 'fast'
}

export interface SafetyIncident {
  id: string; podId: string; type: string; severity: 'low' | 'medium' | 'high' | 'critical'
  description: string; resolved: boolean; timestamp: string
}

const pods: Pod[] = Array.from({ length: 24 }, (_, i) => ({
  id: `pod-${i + 1}`,
  name: `PodCar-${String(i + 1).padStart(3, '0')}`,
  type: (['shuttle', 'personal', 'cargo'] as const)[i % 3],
  status: (['active', 'idle', 'charging', 'maintenance'] as const)[i % 4],
  lat: 37.77 + (Math.random() - 0.5) * 0.06,
  lng: -122.42 + (Math.random() - 0.5) * 0.06,
  battery: 20 + Math.random() * 80,
  passengers: i % 3 === 0 ? Math.floor(Math.random() * 4) : 0,
  maxPassengers: i % 3 === 2 ? 0 : i % 3 === 0 ? 8 : 4,
  speed: Math.random() * 25,
}))

const dispatches: Dispatch[] = Array.from({ length: 10 }, (_, i) => ({
  id: `disp-${i + 1}`,
  podId: `pod-${(i % 24) + 1}`,
  pickup: ['Union Square', 'Ferry Building', 'Fisherman\'s Wharf', 'Golden Gate Park', 'SOMA'][i % 5],
  dropoff: ['Mission Bay', 'Marina', 'Castro', 'Haight', 'Noe Valley'][i % 5],
  status: (['pending', 'assigned', 'en_route', 'completed'] as const)[i % 4],
  passengers: 1 + Math.floor(Math.random() * 3),
  eta: 3 + Math.floor(Math.random() * 15),
}))

const hubs: ChargingHub[] = Array.from({ length: 6 }, (_, i) => ({
  id: `hub-${i + 1}`,
  name: `Hub ${['Downtown', 'SOMA', 'Marina', 'Mission', 'Sunset', 'Richmond'][i]}`,
  lat: 37.77 + (Math.random() - 0.5) * 0.05,
  lng: -122.42 + (Math.random() - 0.5) * 0.05,
  totalPorts: [12, 8, 16, 10, 8, 6][i],
  available: Math.floor(Math.random() * [12, 8, 16, 10, 8, 6][i]),
  speed: (['standard', 'fast'] as const)[i % 2],
}))

const incidents: SafetyIncident[] = Array.from({ length: 15 }, (_, i) => ({
  id: `inc-${i + 1}`,
  podId: `pod-${(i % 24) + 1}`,
  type: ['sensor_error', 'hard_brake', 'obstacle_detection', 'connectivity_loss', 'passenger_alert'][i % 5],
  severity: (['low', 'medium', 'high', 'critical'] as const)[i % 4],
  description: `Safety incident ${i + 1}: ${['Sensor calibration needed', 'Hard brake event', 'Unexpected obstacle', 'Network timeout', 'Passenger pressed SOS'][i % 5]}`,
  resolved: i % 3 !== 0,
  timestamp: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString(),
}))

interface AppState {
  activeTab: string; pods: Pod[]; dispatches: Dispatch[]; hubs: ChargingHub[]
  incidents: SafetyIncident[]; selectedPod: Pod | null
  setActiveTab: (t: string) => void; selectPod: (p: Pod | null) => void
}

export const useStore = create<AppState>((set) => ({
  activeTab: 'viewer', pods, dispatches, hubs, incidents, selectedPod: null,
  setActiveTab: (t) => set({ activeTab: t }),
  selectPod: (p) => set({ selectedPod: p }),
}))
