import { useState } from 'react'
export default function AdminLogin({ onSuccess }){
  const [u,setU]=useState(''); const [p,setP]=useState(''); const [err,setErr]=useState('')
  const submit=(e)=>{ e.preventDefault(); if(u==='admin' && p===import.meta.env.VITE_ADMIN_PASS){ onSuccess() } else setErr('بيانات غير صحيحة') }
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="font-bold mb-3">دخول المشرف</h3>
          <form onSubmit={submit} className="space-y-3">
            <input placeholder="المستخدم" value={u} onChange={e=>setU(e.target.value)} className="w-full p-2 rounded bg-white/10" />
            <input placeholder="كلمة المرور" type="password" value={p} onChange={e=>setP(e.target.value)} className="w-full p-2 rounded bg-white/10" />
            {err && <div className="text-red-400">{err}</div>}
            <button className="w-full bg-[var(--primary)] text-white p-2 rounded">دخول</button>
          </form>
        </div>
      </div>
    </div>
  )
}
