import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
import { Container, Card, Form, Image } from 'react-bootstrap'
import PinLeft from '../assets/images/pin_left.png'
import PinMid from '../assets/images/pin.png'
import PinRight from '../assets/images/pin_right.png'

const FormContainer = ({
  className,
  pinClass,
  formTitle,
  onSubmit,
  formBottomText,
  linkText,
  linkTo,
  children
}) => {
  return (
    <Container fluid className={className}>
      <div className='form--row'>
        <Card className='form--card'>
          <div className={pinClass}>
            <Image fluid className='pin' src={PinLeft} alt='pin' />
            <Image fluid className='pin' src={PinMid} alt='pin' />
            <Image fluid className='pin' src={PinRight} alt='pin' />
          </div>

          <Card.Body className='form--card_body'>
            <Card.Title className='text-center pb-4'>
              <h1>{formTitle}</h1>
            </Card.Title>

            <Form onSubmit={onSubmit}>{children}</Form>

            <Card.Text className='text-center card--footer'>
              {formBottomText}
              <Card.Link className='link text-center' href={linkTo}>
                {linkText}
              </Card.Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Container>
  )
}

export default FormContainer

FormContainer.defaultProps = {
  className: 'form--container',
  pinClass: 'form--pins'
}

FormContainer.propTypes = {
  className: PropTypes.string,
  pinClass: PropTypes.string,
  formTitle: PropTypes.string,
  formBottomText: PropTypes.string,
  linkText: PropTypes.string,
  linkTo: PropTypes.any,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
}
