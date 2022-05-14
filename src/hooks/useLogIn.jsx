import { useState, useEffect } from 'react'
import { astractAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogIn = () => {
  // STATES
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [isCancelled, setIisCancelled] = useState(false)
  // DISPATCH Func
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsPending(true)

    // SIGN THE USER OUT

    if ((email && password) === '') {
      // throw new Error('Passwords do not Match!')
      return setError('Email or Passwords Fields Must not be Empty!')
    } else {
      try {
        const res = await astractAuth.signInWithEmailAndPassword(email, password)

        if (res) {
          // DISPATCH LOG OUT ACTION
          dispatch({ type: 'LOGIN', payload: res.user })

          // UPDATE STATE
          if (!isCancelled) {
            setIsPending(false)
            setError(null)
          }
          //
        }
        //
      } catch (err) {
        // if (!isCancelled) {
        console.error(err.message)
        setError(err.message)
        setIsPending(false)
        // }
      }
    }
  }

  useEffect(() => {
    return setIisCancelled(true)
  }, [])

  return { login, error, isPending }
}
