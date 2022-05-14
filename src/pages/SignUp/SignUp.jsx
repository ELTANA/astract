import { useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'
// import { useNavigate } from 'react-router-dom'

// COMPONENT IMPORTS
import FormContainer from '../../components/FormContainer'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { Toast } from 'react-bootstrap'
import Admin from '../../assets/images/user_male.webp'

// STYLES & IMAGES
import './SignUp.scss'

//
const SignUp = () => {
  // CONTROLLED FORM INPUTS STATES
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  // REACT-BOOTSTRAP TOAST CLOSE ICON STATE
  const [show, setShow] = useState(true)
  const toggleShow = () => setShow(!show)

  // STATES & Funcs FROM useSignUp Hook
  const { success, error, isPending, signup } = useSignUp()

  // SET CONTROLLED FORM INPUTS STATES
  const onDisplayNameChange = (event) => {
    setDisplayName(event.target.value)
  } // DISPLAY NAME INPUT FIELD
  const onEmailChange = (event) => {
    setEmail(event.target.value)
  } // EMAIL INPUT FIELD
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  } // PASSWORD INPUT FIELD
  const onPasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value)
  } // CONFIRM PASSWORD INPUT FIELD

  // HANDLE SIGN UP FORM SUBMIT
  const handleSignUpSubmit = (e) => {
    e.preventDefault()

    // SIGN USER UP USING IMPORTED HOOK
    signup(email, password, passwordConfirm, displayName)

    // CLEAR INPUT FIELDS
    setDisplayName('')
    setEmail('')
    setPassword('')
    setPasswordConfirm('')
  }

  return (
    <FormContainer
      className='form--container bg--signup'
      pinClass='form--pins'
      formTitle='Sign Up'
      onSubmit={handleSignUpSubmit}
      formBottomText='Have an Account?'
      linkText='Log In'
      linkTo='/login'>
      {success && (
        <Toast
          show={show}
          animation
          onClose={toggleShow}
          position='top-center'
          className='bg-success mb-3'>
          <Toast.Header className='alert-success text-success'>
            <img src={Admin} className='avatar_small' alt='admin avatar' />
            <strong className=' ms-2 me-auto'>Admin</strong>
            <small className=' border-left border-success'>just now</small>
          </Toast.Header>
          <Toast.Body className='text-center'>{success}</Toast.Body>
        </Toast>
      )}

      {error && (
        <div className='alert-danger p-2 mb-3 rounded-3'>
          <p>{error}</p>
        </div>
      )}

      <InputField
        inputGroupClass='form-group mb-3 fs-6'
        name='userNameInput'
        label='User Name'
        type='text'
        inputClassName='form-control fs-6'
        placeholder='Enter User Name'
        onChange={onDisplayNameChange}
        value={displayName}
        required
      />

      <InputField
        inputGroupClass='form-group mb-3 fs-6'
        name='emailInput'
        label='Email'
        type='email'
        inputClassName='form-control fs-6'
        placeholder='Enter Email'
        onChange={onEmailChange}
        value={email}
        required
      />

      <InputField
        inputGroupClass='form-group mb-3 fs-6'
        name='passwordInput'
        label='Password'
        type='password'
        inputClassName='form-control fs-6'
        placeholder='Enter Password'
        onChange={onPasswordChange}
        value={password}
        required
      />

      <InputField
        inputGroupClass='form-group mb-3 fs-6'
        name='passwordConfirmInput'
        label='Confrim Password'
        type='password'
        inputClassName='form-control fs-6'
        placeholder='Confrim Password'
        onChange={onPasswordConfirmChange}
        value={passwordConfirm}
        required
      />

      {!isPending && (
        <Button classNames='btn btn-primary form-control mt-4 mb-3 fs-6' buttonText='Sign Up' />
      )}

      {isPending && (
        <Button
          classNames='btn btn-primary form-control mt-4 mb-3 fs-6'
          buttonText='Loading...'
          disabled
        />
      )}
    </FormContainer>
  )
}

export default SignUp
