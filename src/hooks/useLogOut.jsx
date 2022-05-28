import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { astractAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogOut = () => {
  const navigate = useNavigate()

  // STATES
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIisCancelled] = useState(false)
  // DISPATCH Func
  const { dispatch } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // SIGN THE USER OUT
    try {
      await astractAuth.signOut()

      // DISPATCH LOG OUT ACTION
      dispatch({ type: 'LOGOUT' })

      // UPDATE STATE
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }

      navigate('/login', { replace: true })
      //
    } catch (err) {
      if (!isCancelled) {
        // console.error(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return setIisCancelled(true)
  }, [])

  return { logout, error, isPending }
}
