import React from 'react'

export default function TopNav({ user = { name: 'Alex Customer', avatar: '' } }) {
  return (
    <header className="flex items-center justify-between gap-4 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="text-slate-600 hover:text-slate-800 md:hidden">☰</button>
        <div className="text-lg font-semibold text-slate-900">ResolveIt</div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-full hover:bg-slate-100">
          <span className="sr-only">Notifications</span>
          🔔
          <span className="absolute -top-1 -right-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">3</span>
        </button>
        <button className="p-2 rounded-full hover:bg-slate-100">⚙️</button>
        <div className="flex items-center gap-3 rounded-full border border-slate-100 px-3 py-1">
          <div className="h-8 w-8 rounded-full bg-slate-200" />
          <div className="text-sm text-slate-700">{user.name}</div>
        </div>
      </div>
    </header>
  )
}
