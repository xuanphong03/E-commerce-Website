import PropTypes from 'prop-types';

import './ContactForm.css';

ContactInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

function ContactInput({
  id,
  label,
  errorMessage,
  register,
  isRequired = false,
}) {
  return (
    <div>
      <div className="relative rounded bg-[#F5F5F5]">
        <input
          {...register}
          autoComplete="off"
          type="text"
          id={id}
          placeholder=""
          className="w-full rounded border border-solid border-transparent bg-transparent px-4 py-3 outline-none transition-colors focus-within:border-blue-500"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 cursor-text bg-transparent text-[#6E7191] transition-all"
        >
          {label}
          {isRequired && <span className="text-[#DB4444]">*</span>}
        </label>
      </div>
      {errorMessage && (
        <p className="my-1 pl-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default ContactInput;
