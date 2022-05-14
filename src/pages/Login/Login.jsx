import { useState } from 'react'
import { useLogIn } from '../../hooks/useLogIn'
// import { useNavigate } from 'react-router-dom'

// COMPONENTS
import FormContainer from '../../components/FormContainer'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

// STYLES
import './Login.scss'

const Login = () => {
  // const navigate = useNavigate()

  // CONTROLLED FORM INPUTS
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // STATES AND Funcs FROM useLogIn HOOK
  const { login, error, isPending } = useLogIn()

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const onPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    // LOG USER IN
    login(email, password)

    // CLEAR INPUT FIELDS
    setEmail('')
    setPassword('')

    // navigate('/dashboard', { replace: true })
  }
  return (
    <FormContainer
      className='form--container bg--login'
      pinClass='display-none'
      formTitle='Log In'
      onSubmit={handleLoginSubmit}
      formBottomText="Dont't Have an Account?"
      linkText='Sign Up'
      linkTo='/signup'>
      {error && (
        <div className='alert-danger p-2 mb-3 rounded-3'>
          <p>{error}</p>
        </div>
      )}
      <InputField
        inputGroupClass='form-group mb-3 fs-5'
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
        inputGroupClass='form-group mb-3 fs-5'
        name='passwordInput'
        label='Password'
        type='password'
        inputClassName='form-control fs-6'
        placeholder='Enter Password'
        onChange={onPasswordChange}
        value={password}
        required
      />
      {/* <Button classNames='btn btn-primary form-control mt-4 mb-3 fs-5' buttonText='Log In' /> */}

      {!isPending && (
        <Button classNames='btn btn-primary form-control mt-4 mb-3 fs-6' buttonText='Log In' />
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

export default Login
