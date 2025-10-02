import "./Input.css";
const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  name,
  id,
  disabled = false,
  className = "",
  ...rest
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    name={name}
    id={id}
    disabled={disabled}
    className={className}
    {...rest}
  />
);

export default Input;
