import React from 'react'
export default function Header({onNavigate}){
  return (
    <header className="bg-white/5 backdrop-blur-sm border-b border-white/6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/src/assets/logo.png" alt="logo" className="w-12 h-12 rounded-md shadow" />
          <div>
            <div className="text-lg font-semibold">أمجاد وطن</div>
            <div className="text-xs text-gray-300">بطولات - مجتمع - تميز</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={()=>onNavigate('landing')} className="px-3 py-2 rounded hover:bg-white/5">الرئيسية</button>
          <button onClick={()=>onNavigate('register')} className="px-3 py-2 rounded bg-gradient-to-l from-[var(--primary)] to-[var(--accent)] text-white shadow">سجل الآن</button>
          <button onClick={()=>onNavigate('admin')} className="px-3 py-2 rounded hover:bg-white/5">لوحة التحكم</button>
        </nav>
      </div>
    </header>
  )
}
