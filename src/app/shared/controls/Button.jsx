import "./Button.css";
const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  size = "medium",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`button-custom-style ${variant} ${className} ${size}`}
  >
    {children}
  </button>
);

export default Button;
