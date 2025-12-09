export default function Success({ participant, onHome }){
  if(!participant) return null
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-lg text-center bg-white/5 rounded-3xl p-8">
        <h2 className="text-2xl font-bold text-green-300">تم التسجيل بنجاح 🎉</h2>
        <p className="mt-3">شكراً {participant.name}، تم تسجيلك في لعبة {participant.game}. سيتم التواصل على {participant.phone}</p>
        <div className="mt-6"><button onClick={onHome} className="px-6 py-2 rounded bg-[var(--primary)]">عودة للرئيسية</button></div>
      </div>
    </div>
  )
}
