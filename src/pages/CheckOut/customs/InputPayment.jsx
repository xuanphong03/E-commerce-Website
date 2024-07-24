import PropTypes from 'prop-types';

InputPayment.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  register: PropTypes.object,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
};

function InputPayment({
  id,
  label,
  autofocus,
  register,
  errorMessage,
  required = false,
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="capitalize text-[#2c2c2c]">
        {label}
        {required && <span className="text-[#DB4444]">*</span>}
      </label>
      <div>
        <input
          {...register}
          id={id}
          type="text"
          autoComplete="off"
          autoFocus={autofocus}
          className="mb-1 block h-10 w-full rounded bg-[#f5f5f5] px-2 py-2 outline-blue-500"
        />
        {errorMessage && (
          <p className="px-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}

export default InputPayment;
