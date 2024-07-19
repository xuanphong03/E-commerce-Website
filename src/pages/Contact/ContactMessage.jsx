import PropTypes from 'prop-types';
import './ContactForm.css';

ContactMessage.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
};

function ContactMessage({
  id,
  label,
  errorMessage,
  register,
  isRequired = false,
}) {
  return (
    <div>
      <div className="relative rounded bg-[#F5F5F5]">
        <textarea
          {...register}
          autoComplete="off"
          type="text"
          id={id}
          rows={10}
          placeholder=""
          className="w-full resize-none rounded border border-solid border-transparent bg-transparent px-4 py-3 outline-none transition-colors focus-within:border-blue-500"
        ></textarea>
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-4 top-3 cursor-text bg-transparent text-[#6E7191] transition-all"
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

export default ContactMessage;
