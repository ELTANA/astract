import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogOut } from '../hooks/useLogOut'

// imports Styles and Assets
import { Navbar, Container, Nav, Image } from 'react-bootstrap'
import User from '../assets/images/user_male.webp'

const NavBar = ({ userName, linkOneClassName, linkTwoClassName }) => {
  const navigate = useNavigate()

  const { user } = useAuthContext()
  let admin, nonAdmin
  if (user) {
    user.uid === `OcdWKravCHPvNnodffWJ87qE77u2` ? (admin = user) : (nonAdmin = user)
    // console.log(admin)
    // console.log('User:', user)
  }

  const handleAdmin = () => {
    navigate('/admin')
  }

  // HANDLE LOG OUT
  const { logout } = useLogOut()

  const handleLogOut = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar collapseOnSelect sticky='top' expand='md' bg='dark' variant='dark' className='navbar'>
      <Container>
        {userName && (
          <Navbar.Brand className='d-flex justify-content-center align-items-center'>
            <Image src={User} className='avatar' alt='user' fluid />
            <span className='nav_link ms-3 m-auto'>{userName}</span>
          </Navbar.Brand>
        )}
        <Navbar.Toggle className='ms-auto' aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto nav text-center'>
            {user == admin ? (
              <>
                <Nav.Link className={linkOneClassName} onClick={handleAdmin}>
                  Admin
                </Nav.Link>
                <Nav.Link className={linkTwoClassName} href='/dashboard'>
                  My Dashboard
                </Nav.Link>
                <Nav.Link className='btn nav_btn' onClick={handleLogOut}>
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className={linkOneClassName}>My Profile</Nav.Link>
                <Nav.Link className={linkTwoClassName}>My Dashboard</Nav.Link>
                <Nav.Link className='btn nav_btn text-white' onClick={handleLogOut}>
                  Log Out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar

NavBar.propTypes = {
  userName: PropTypes.string.isRequired,
  linkOneClassName: PropTypes.string.isRequired,
  linkTwoClassName: PropTypes.string.isRequired
}
