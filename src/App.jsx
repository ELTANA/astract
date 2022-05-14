import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// import { PrivateOutlet } from './components/PrivateOutlet'
import NavBar from './components/NavBar'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import DashBoard from './pages/DashBoard/DashBoard'
import ErrorPage from './pages/ErrorPage/ErrorPage'

const App = () => {
  const { authIsReady, user } = useAuthContext()

  // TO VERIFY IF USER IS AN ADMIN
  let admin, nonAdmin
  if (user) {
    user.uid === `OcdWKravCHPvNnodffWJ87qE77u2` ? (admin = user) : (nonAdmin = user)
    // console.log(admin)
    // console.log('User:', user)
  }

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={user ? <Navigate to='/dashboard' /> : <Home />} />
            <Route path='/signup' element={user ? <Navigate to='/dashboard' /> : <SignUp />} />
            <Route path='/login' element={user ? <Navigate to='/dashboard' /> : <Login />} />
            <Route path='/dashboard' element={!user ? <Navigate to='/login' /> : <DashBoard />} />
            <Route
              path='/admin'
              element={user && admin ? <Admin /> : <Navigate to='/dashboard' />}
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App
