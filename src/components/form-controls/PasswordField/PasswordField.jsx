import PropTypes from 'prop-types';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import '../form-controls.css';
import { useState } from 'react';

PasswordField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,

  errorMessage: PropTypes.string,
  autofocus: PropTypes.bool,
};

function PasswordField({
  id,
  label,
  errorMessage,
  register,
  autofocus = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevStatus) => !prevStatus);
  };

  return (
    <div className="relative h-10 w-full border-b-2 border-solid border-[#C0C0C0] focus-within:border-black">
      <input
        {...register}
        className="input-primary h-full w-full px-1 outline-none"
        id={id}
        type={`${!showPassword ? 'password' : 'text'}`}
        placeholder=""
        autoFocus={autofocus}
        autoComplete="off"
      />
      <label
        htmlFor="signup-name"
        className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-[#999999] transition-all"
      >
        {label}
      </label>
      <span
        onClick={handleShowPassword}
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
      >
        {!showPassword ? <FaEye /> : <FaEyeSlash />}
      </span>
      {errorMessage && (
        <span className="absolute left-0 top-[calc(100%+4px)] px-1 text-sm text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default PasswordField;
