import '../form-controls.css';
import PropTypes from 'prop-types';

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  register: PropTypes.object.isRequired,

  errorMessage: PropTypes.string,
  autofocus: PropTypes.bool,
};

function InputField({ id, label, errorMessage, register, autofocus = false }) {
  return (
    <div className="relative h-10 w-full border-b-2 border-solid border-[#C0C0C0] font-poppins focus-within:border-[#315CEA]">
      <input
        {...register}
        autoComplete="off"
        className="h-full w-full px-1 outline-none"
        id={id}
        type="text"
        placeholder=""
        autoFocus={autofocus}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-[#999999] transition-all"
      >
        {label}
      </label>
      {errorMessage && (
        <span className="absolute left-0 top-[calc(100%+4px)] px-1 text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

export default InputField;
