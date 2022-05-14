import PropTypes from 'prop-types'

const Button = ({ classNames, buttonText }) => {
  return (
    <button type='submit' className={classNames}>
      {buttonText}
    </button>
  )
}

export default Button

Button.defaultProps = {
  type: 'submit',
  className: 'btn form-control py-2 mt-2 mb-3 fs-5'
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classNames: PropTypes.string
}
