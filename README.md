# PodCar

**Autonomous Vehicle Pod Fleet Management Platform**

PodCar is a management platform for autonomous pod-based vehicle fleets. Monitor pods in real time with 3D visualization and Mapbox maps, dispatch rides, manage passenger experiences, track charging infrastructure, and review safety metrics.

## Features

- **3D Vehicle Viewer** -- Interactive Three.js visualization of pod vehicles
- **Dispatch System** -- Real-time ride dispatching with Mapbox-powered route mapping
- **Passenger Experience** -- Manage ride preferences, in-pod entertainment, and comfort settings
- **Charging Network** -- Monitor and manage fleet charging stations and battery levels
- **Safety Dashboard** -- Track safety incidents, sensor health, and fleet-wide risk metrics
- **Fleet Overview** -- Real-time status of all active, idle, and charging pods

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **3D Rendering:** Three.js, React Three Fiber, React Three Drei
- **Mapping:** Mapbox GL
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Backend:** Supabase
- **Charts:** Recharts
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox access token

### Installation

```bash
git clone <repository-url>
cd podcar
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   └── page.tsx                # Main application (tabbed interface)
├── components/
│   ├── VehicleViewer.tsx       # 3D pod visualization
│   ├── DispatchSystem.tsx      # Ride dispatching & routing
│   ├── PassengerExperience.tsx # Rider preferences & comfort
│   ├── ChargingNetwork.tsx     # Charging station management
│   └── SafetyDashboard.tsx     # Safety metrics & incidents
└── lib/
    └── store.ts                # Zustand state management
```

