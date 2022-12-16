import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Getuser({ session }) {

  const supabase = useSupabaseClient()
  const user = useUser()

  const [full_name, setFullname] = useState(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsername()
  }, [session])

  async function getUsername() {

     try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        setFullname(null)
      }

      if (data) {
        setFullname(data.full_name)
      }
      } catch (error) {
      //alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
        {full_name}
    </div>
  )
}