import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Papa from 'papaparse'

export default function Dashboard(){
  const [list,setList]=useState([])
  const [q,setQ]=useState('')
  const [filter,setFilter]=useState('')

  async function load(){
    const { data, error } = await supabase.from('participants').select('*').order('created_at',{ascending:false})
    if(error){ console.error(error); return }
    setList(data)
  }
  useEffect(()=>{ load() },[])

  const del = async (id)=>{
    if(!confirm('تأكيد حذف؟')) return
    const { error } = await supabase.from('participants').delete().eq('id',id)
    if(error){ alert('فشل الحذف'); console.error(error); return }
    setList(prev=>prev.filter(p=>p.id!==id))
  }

  const exportCSV = ()=>{
    const csv = Papa.unparse(list)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`participants_${Date.now()}.csv`; a.click(); URL.revokeObjectURL(url)
  }

  const visible = list.filter(p=>{ if(filter && p.game!==filter) return false; if(!q) return true; const t=`${p.name} ${p.phone}`.toLowerCase(); return t.includes(q.toLowerCase()) })

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 bg-white/5 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">لوحة التحكم - المشاركين</h3>
          <div className="flex gap-2">
            <input placeholder="ابحث" value={q} onChange={e=>setQ(e.target.value)} className="p-2 rounded bg-white/10" />
            <select value={filter} onChange={e=>setFilter(e.target.value)} className="p-2 rounded bg-white/10">
              <option value="">كل الألعاب</option>
              <option value="FIFA">FIFA</option>
              <option value="Jakaro">جاكارو</option>
              <option value="Baloot">بلوت</option>
            </select>
            <button onClick={exportCSV} className="bg-green-600 text-white px-3 py-2 rounded">تصدير CSV</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead><tr className="text-right"><th className="p-2">الاسم</th><th className="p-2">الجوال</th><th className="p-2">اللعبة</th><th className="p-2">تاريخ</th><th className="p-2">إجراءات</th></tr></thead>
            <tbody>
              {visible.map(p=> (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">{p.phone}</td>
                  <td className="p-2">{p.game}</td>
                  <td className="p-2 text-sm text-gray-300">{new Date(p.created_at).toLocaleString()}</td>
                  <td className="p-2">
                    <button onClick={()=>navigator.clipboard.writeText(JSON.stringify(p))} className="text-sm underline ml-2">نسخ</button>
                    <button onClick={()=>del(p.id)} className="text-sm text-red-400 ml-2">حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
