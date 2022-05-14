import PropTypes from 'prop-types'

const InputField = ({
  inputGroupClass,
  name,
  label,
  labelClassName,
  type,
  inputClassName,
  placeholder,
  value,
  onChange,
  isRequired
  // error,
}) => {
  return (
    <div className={inputGroupClass}>
      <label htmlFor={name} className={`form-label ${labelClassName}`}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={isRequired}
        // style={error && { border: 'solid 1px red' }}
      />
      {/* {error && <small>{error}</small>} */}
    </div>
  )
}

export default InputField

InputField.defaultProps = {
  type: 'text'
}

InputField.propTypes = {
  labelClassName: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'email',
    'number',
    'password',
    'checkbox',
    'date',
    'time',
    'datetime-local'
  ]),
  placeholder: PropTypes.string.isRequired,
  inputGroupClass: PropTypes.string,
  inputClassName: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  isRequired: PropTypes.any
}
