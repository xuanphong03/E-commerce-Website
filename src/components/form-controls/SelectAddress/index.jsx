import PropTypes from 'prop-types';

SelectAddress.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  register: PropTypes.object,
  errorMessage: PropTypes.string,
};

function SelectAddress({ label, options, register, errorMessage }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <label className="font-medium" htmlFor="select-address">
        {label}
      </label>
      <select
        {...register}
        id="select-address"
        className="w-full rounded-md border border-gray-300 p-2 outline-none"
      >
        <option value="">{`---Chọn ${label}---`}</option>
        {options?.map((option) => {
          return (
            <option value={option.id} key={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default SelectAddress;
