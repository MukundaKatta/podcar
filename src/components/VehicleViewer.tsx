'use client'

import { useRef, useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { Box, RotateCcw, Battery, Users, Gauge } from 'lucide-react'

export default function VehicleViewer() {
  const { pods, selectedPod, selectPod } = useStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [viewPod, setViewPod] = useState(pods[0])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = canvas.clientWidth * 2
    canvas.height = canvas.clientHeight * 2
    ctx.scale(2, 2)

    const animate = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      const cx = w / 2, cy = h / 2

      // Background
      ctx.fillStyle = '#0a0a1a'
      ctx.fillRect(0, 0, w, h)

      // Grid floor
      ctx.strokeStyle = '#1a1a3a'
      ctx.lineWidth = 0.5
      for (let i = -10; i <= 10; i++) {
        const x1 = cx + i * 30 * Math.cos(rotation * 0.01)
        const y1 = cy + 80 + i * 8
        ctx.beginPath()
        ctx.moveTo(x1 - 200, y1)
        ctx.lineTo(x1 + 200, y1)
        ctx.stroke()
      }

      // Pod body (isometric view)
      const podW = 120, podH = 60, podD = 80
      const px = cx - podW / 2, py = cy - podD / 2

      // Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.beginPath()
      ctx.ellipse(cx, cy + 70, podW * 0.6, 15, 0, 0, Math.PI * 2)
      ctx.fill()

      // Pod type colors
      const typeColors = { shuttle: '#f43f5e', personal: '#3b82f6', cargo: '#f97316' }
      const color = typeColors[viewPod.type]

      // Body
      const grad = ctx.createLinearGradient(px, py, px + podW, py + podD)
      grad.addColorStop(0, color)
      grad.addColorStop(1, `${color}80`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.roundRect(px, py, podW, podD, 20)
      ctx.fill()

      // Roof
      ctx.fillStyle = `${color}40`
      ctx.beginPath()
      ctx.roundRect(px + 10, py - 15, podW - 20, 20, 10)
      ctx.fill()

      // Windows
      ctx.fillStyle = '#0a0a2a'
      ctx.beginPath()
      ctx.roundRect(px + 15, py + 8, podW - 30, podD * 0.4, 8)
      ctx.fill()

      // Window reflection
      ctx.fillStyle = 'rgba(255,255,255,0.05)'
      ctx.beginPath()
      ctx.roundRect(px + 18, py + 10, (podW - 36) * 0.6, podD * 0.2, 4)
      ctx.fill()

      // Wheels
      ctx.fillStyle = '#1a1a2e'
      ctx.beginPath()
      ctx.ellipse(cx - podW * 0.3, cy + podD * 0.4, 12, 8, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(cx + podW * 0.3, cy + podD * 0.4, 12, 8, 0, 0, Math.PI * 2)
      ctx.fill()

      // LED strip
      ctx.strokeStyle = viewPod.status === 'active' ? '#22c55e' : viewPod.status === 'charging' ? '#3b82f6' : '#eab308'
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(px + 15, py + podD - 5)
      ctx.lineTo(px + podW - 15, py + podD - 5)
      ctx.stroke()

      // Sensors (dots on corners)
      const sensorColor = '#00ff88'
      ;[[px + 5, py + 5], [px + podW - 5, py + 5], [px + 5, py + podD - 5], [px + podW - 5, py + podD - 5]].forEach(([sx, sy]) => {
        ctx.fillStyle = sensorColor
        ctx.beginPath()
        ctx.arc(sx, sy, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Type label
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 14px system-ui'
      ctx.textAlign = 'center'
      ctx.fillText(viewPod.name, cx, cy + podD + 30)
      ctx.fillStyle = '#888'
      ctx.font = '12px system-ui'
      ctx.fillText(`${viewPod.type.toUpperCase()} POD`, cx, cy + podD + 48)

      animRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(animRef.current)
  }, [viewPod, rotation])

  return (
    <div className="h-full flex">
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700 grid grid-cols-4 gap-4">
          <div className="text-center">
            <Battery className="w-5 h-5 mx-auto text-green-400 mb-1" />
            <p className="text-sm font-bold">{viewPod.battery.toFixed(0)}%</p>
            <p className="text-[10px] text-gray-400">Battery</p>
          </div>
          <div className="text-center">
            <Users className="w-5 h-5 mx-auto text-blue-400 mb-1" />
            <p className="text-sm font-bold">{viewPod.passengers}/{viewPod.maxPassengers}</p>
            <p className="text-[10px] text-gray-400">Passengers</p>
          </div>
          <div className="text-center">
            <Gauge className="w-5 h-5 mx-auto text-rose-400 mb-1" />
            <p className="text-sm font-bold">{viewPod.speed.toFixed(0)} mph</p>
            <p className="text-[10px] text-gray-400">Speed</p>
          </div>
          <div className="text-center">
            <Box className="w-5 h-5 mx-auto text-violet-400 mb-1" />
            <p className="text-sm font-bold capitalize">{viewPod.type}</p>
            <p className="text-[10px] text-gray-400">Type</p>
          </div>
        </div>
      </div>

      <div className="w-72 bg-gray-900 border-l border-gray-800 p-4 overflow-y-auto">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Select Pod</h3>
        <div className="space-y-2">
          {pods.slice(0, 12).map(pod => (
            <button key={pod.id} onClick={() => setViewPod(pod)}
              className={`w-full text-left p-3 rounded-xl transition-all ${
                viewPod.id === pod.id ? 'bg-rose-600/20 border border-rose-500' : 'bg-gray-800 border border-transparent hover:border-gray-700'
              }`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{pod.name}</span>
                <span className={`w-2 h-2 rounded-full ${
                  pod.status === 'active' ? 'bg-green-400' : pod.status === 'charging' ? 'bg-blue-400' :
                  pod.status === 'idle' ? 'bg-yellow-400' : 'bg-gray-400'
                }`} />
              </div>
              <div className="flex gap-2 mt-1 text-xs text-gray-400">
                <span className="capitalize">{pod.type}</span>
                <span>{pod.battery.toFixed(0)}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
