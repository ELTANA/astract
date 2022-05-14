import { useState, useEffect } from 'react'
import { astractAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useSignUp = () => {
  // useNavigaete to redirect on successful sign up
  const navigate = useNavigate()

  // STATES
  const [isCancelled, setIisCancelled] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [success, setSuccess] = useState(null)
  const [userName, setUuserName] = useState(null)
  const [error, setError] = useState(null)

  // DISPATCH Func
  const { dispatch } = useAuthContext()

  const signup = async (email, password, passwordConfirm, displayName) => {
    setSuccess(null)
    setUuserName(null)
    setError(null)
    setIsPending(true)

    if (password !== passwordConfirm) {
      // throw new Error('Passwords do not Match!')
      return setError('Passwords do not Match!')
    } else {
      //
      try {
        // SIGN UP USER
        const res = await astractAuth.createUserWithEmailAndPassword(email, password)

        //
        if (res) {
          // ADD USER's DISPLAY NAME
          await res.user.updateProfile({ displayName })
          // console.log(res.user)
          // console.log(res.user.displayName)

          // DISPATCH LOGIN ACTION
          dispatch({ type: 'LOGIN', payload: res.user })

          // UPDATE STATE
          // if (!isCancelled) {
          setSuccess(`${res.user.displayName} is now signed up, Please Log in to Continue!`)
          setUuserName(`${res.user.displayName}`)
          setIsPending(false)
          setError(null)
          // }

          // NAVIGATE TO LOGIN PAGE AFTER 3secs
          if (res.user.displayName) {
            setTimeout(() => {
              navigate('/login', { replace: true })
            }, 3000)
          }
          //
        } else {
          throw new Error('Could not complete Sign Up!')
        }
        //
      } catch (err) {
        //
        if (!isCancelled) {
          // console.error(err.message)
          setError(err.message)
          setIsPending(false)
        }
      }
      //
    }
  }

  useEffect(() => {
    return setIisCancelled(true)
  }, [])

  return { success, error, isPending, signup, userName }
}
