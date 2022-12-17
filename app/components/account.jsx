import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from '../components/avatar'
import {useRouter} from "next/router"

export default function Account({ session }) {

  const router = useRouter()

  const signOut = () =>{
    supabase.auth.signOut()
    router.push("/");
  }
  
  const supabase = useSupabaseClient()
  const user = useUser()

  const [loading, setLoading] = useState(true)
  const [full_name, setFull_name] = useState(null)
  const [password, setPassword] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, password`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFull_name(data.full_name)
        setPassword(data.password)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ full_name, password}) {
    try {
      setLoading(true)

      const updates = {
        id: user.id,
        updated_at: new Date().toISOString(),
        full_name,
        password,
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
    router.push("/");
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
          className="button primary block"
          onClick={() => updateProfile({ full_name, password })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={signOut}>
          Log out
        </button>
      </div>
    </div>
  )
}