'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { Shield, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react'

export default function SafetyDashboard() {
  const { incidents } = useStore()
  const [filter, setFilter] = useState('all')
  const filtered = filter === 'all' ? incidents : incidents.filter(i => i.severity === filter)
  const unresolved = incidents.filter(i => !i.resolved).length
  const critical = incidents.filter(i => i.severity === 'critical').length

  const sevColors: Record<string, string> = { critical: 'bg-red-600 text-red-100', high: 'bg-orange-600 text-orange-100', medium: 'bg-yellow-600 text-yellow-100', low: 'bg-blue-600 text-blue-100' }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Safety Dashboard</h2>
          <p className="text-gray-400">Pod safety monitoring and incident tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-green-400" />
          <div>
            <p className="text-xl font-bold text-green-400">97.8%</p>
            <p className="text-xs text-gray-400">Safety Score</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-2xl font-bold">{incidents.length}</p>
          <p className="text-xs text-gray-400">Total Incidents</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-2xl font-bold text-red-400">{critical}</p>
          <p className="text-xs text-gray-400">Critical</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-2xl font-bold text-yellow-400">{unresolved}</p>
          <p className="text-xs text-gray-400">Unresolved</p>
        </div>
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <p className="text-2xl font-bold text-green-400">{incidents.length - unresolved}</p>
          <p className="text-xs text-gray-400">Resolved</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'critical', 'high', 'medium', 'low'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${filter === s ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Pod</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Severity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filtered.map(inc => (
              <tr key={inc.id} className="hover:bg-gray-800/50">
                <td className="px-4 py-3 text-sm">{inc.id}</td>
                <td className="px-4 py-3 text-sm">{inc.podId}</td>
                <td className="px-4 py-3 text-sm capitalize">{inc.type.replace(/_/g, ' ')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${sevColors[inc.severity]}`}>{inc.severity}</span>
                </td>
                <td className="px-4 py-3">
                  {inc.resolved
                    ? <span className="text-green-400 text-sm flex items-center gap-1"><CheckCircle className="w-4 h-4" />Resolved</span>
                    : <span className="text-yellow-400 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />Open</span>}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{new Date(inc.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
