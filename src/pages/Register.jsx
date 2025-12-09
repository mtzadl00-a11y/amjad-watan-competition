import { useState } from 'react'
import AnimatedInput from '../components/AnimatedInput'
import { supabase } from '../lib/supabase'

export default function Register({ onSuccess }){
  const [name,setName]=useState('')
  const [phone,setPhone]=useState('')
  const [game,setGame]=useState('')
  const [agree,setAgree]=useState(false)
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(false)

  const submit = async (e)=>{
    e.preventDefault(); 
    setError('')

    if(!name || !phone || !game)
      return setError('الرجاء تعبئة جميع الحقول')

    if(!agree)
      return setError('يرجى الموافقة على الشروط')

    setLoading(true)

    const { data, error } = await supabase
      .from('participants')
      .insert([{ name, phone, game }])
      .select()

    setLoading(false)

    if(error){
      console.error(error)
      setError('فشل التسجيل. حاول لاحقًا.')
      return
    }

    onSuccess(data[0])
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl bg-white/5 border border-white/6 rounded-3xl p-8 backdrop-blur-md shadow-lg">
          
          <div className="text-center mb-6">
            <img src="/src/assets/logo.png" className="w-28 mx-auto mb-3" alt="logo" />
            <h2 className="text-2xl font-bold">سجل الآن في البطولة</h2>
            <p className="text-gray-300 mt-1">املأ البيانات وسيتم حجز مقعدك فورًا</p>
          </div>

          <form onSubmit={submit} className="space-y-4">

            <AnimatedInput label="الاسم الكامل">
              <input 
                value={name}
                onChange={e=>setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/8 focus:ring-2 focus:ring-[var(--accent)] outline-none" 
              />
            </AnimatedInput>

            <AnimatedInput label="رقم الجوال">
              <input 
                value={phone}
                onChange={e=>setPhone(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/8 focus:ring-2 focus:ring-[var(--accent)] outline-none" 
              />
            </AnimatedInput>

            <AnimatedInput label="اختر اللعبة">
              <select 
                value={game}
                onChange={e=>setGame(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/10 border border-white/8 outline-none"
              >
                <option value="">-- اختر --</option>
                <option value="FIFA">FIFA</option>
                <option value="Jakaro">جاكارو</option>
                <option value="Baloot">بلوت</option>
              </select>
            </AnimatedInput>

            <div className="flex items-center gap-3">
              <input 
                type="checkbox" 
                id="agree" 
                checked={agree}
                onChange={e=>setAgree(e.target.checked)} 
              />
              <label htmlFor="agree" className="text-sm">أوافق على شروط البطولة</label>
            </div>

            {error && <div className="text-red-400">{error}</div>}

            <button 
              disabled={loading}
              className={`w-full rounded-full py-3 font-bold transition-all ${loading? 'opacity-60':'shadow-xl'} bg-gradient-to-l from-[var(--primary)] to-[var(--accent)]`}
            >
              {loading? 'جاري التسجيل...' : 'تأكيد التسجيل'}
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-300">سياسة الخصوصية • الشروط والأحكام</div>
        </div>
      </div>
    </section>
  )
}
