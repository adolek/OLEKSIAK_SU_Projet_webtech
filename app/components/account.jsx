import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from '../components/avatar'
import {useRouter} from "next/router"

export default function Account({ session }) {

  const router = useRouter()

   async function signOut () {

     try {
      setLoading(true)

      let { error } = await supabase.auth.signOut()
      if (error) throw error
      alert('Logged out!')
    } catch (error) {
      alert('Error logging out !')
      console.log(error)
    } finally {
      setLoading(false)
    }
    router.reload(window.location.pathname)
  }
  
  const supabase = useSupabaseClient()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [full_name, setFull_name] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, password,email`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFull_name(data.full_name)
        setPassword(data.password)
        setEmail(data.email)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ full_name, password, email}) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString(),
        full_name,
        password,
        email
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
    router.reload(window.location.pathname)
  }

  return (
    <div className="form-widge">
      <div>
        <Avatar email={session.user.email}/>
      </div>
      <div>
        <div className="dark:text-white" htmlFor="email">Email</div>
        <input 
        id="email" 
        type="text" 
        value={session.user.email} disabled 
        onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="dark:text-white" htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          type="text"
          value={full_name || ''}
          onChange={(e) => setFull_name(e.target.value)}
        />
      </div>
      <div>
        <label className="dark:text-white" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={session.user.password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button
          className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white"
          onClick={() => updateProfile({ full_name, password ,email})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
      <div>
        <button 
          className="hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow dark:bg-gray-800 dark:text-white" onClick={signOut}>
          Log out
        </button>
      </div>
      <div>
        <button 
          className="hover:bg-red-100 text-red-800 font-semibold py-2 px-4 border border-red-400 rounded shadow " >
            red
        </button>
        <button 
          className="hover:bg-blue-100 text-blue-800 font-semibold py-2 px-4 border border-blue-400 rounded shadow " >
            blue
        </button>
        <button 
          className="hover:bg-green-100 text-green-800 font-semibold py-2 px-4 border border-green-400 rounded shadow">
            green
        </button>
      </div>
    </div>
  )
}