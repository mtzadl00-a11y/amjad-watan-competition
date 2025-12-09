import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Success from './pages/Success'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Participants from './pages/Participants'

export default function App(){
  const [route,setRoute]=useState('landing')
  const [lastRegistered, setLastRegistered] = useState(null)

  return (
    <div className="min-h-screen flex flex-col text-gray-100">
      <Header onNavigate={r=>setRoute(r)} />
      <main className="flex-1">
        
{route==='landing' && (
  <Landing 
    onRegister={() => setRoute('register')}
    onParticipants={() => setRoute('participants')}
  />
)}

        {route==='register' && <Register onSuccess={(p)=>{setLastRegistered(p); setRoute('success')}} />}
        {route==='success' && <Success participant={lastRegistered} onHome={()=>setRoute('landing')} />}
        {route==='admin' && <AdminLogin onSuccess={()=>setRoute('dashboard')} />}
{route==='participants' && <Participants onBack={()=>setRoute('landing')} />}

        {route==='dashboard' && <Dashboard />}
      </main>
      <Footer />
    </div>
  )
}
