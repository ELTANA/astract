import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const PrivateOutlet = () => {
  const { user } = AuthContext()

  return user ? <Outlet /> : <Navigate to='/login' />
}
