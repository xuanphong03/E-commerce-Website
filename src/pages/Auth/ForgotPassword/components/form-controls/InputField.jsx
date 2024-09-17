import PropTypes from 'prop-types';
import './InputField.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.object.isRequired,
  errorMessage: PropTypes.string,
  autofocus: PropTypes.bool,
};
function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  errorMessage,
  autofocus = false,
}) {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };
  return (
    <div>
      <label htmlFor={id} className="mb-2 block">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...register}
          autoComplete="off"
          autoFocus={autofocus}
          type={
            type !== 'password' ? type : isShowPassword ? 'text' : 'password'
          }
          placeholder=""
          className="input-secondary w-full rounded-md border border-solid border-gray-200 py-2 pl-3 pr-8 text-sm outline-none focus:border-gray-700"
        />
        <label className="input-placeholder pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1 text-sm text-gray-500 transition-all">
          {placeholder}
        </label>
        {type === 'password' && (
          <span
            onClick={handleToggleShowPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-lg"
          >
            {isShowPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
        {errorMessage && (
          <p className="absolute -bottom-5 px-1 text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default InputField;
