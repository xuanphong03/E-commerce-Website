import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoWarning } from 'react-icons/io5';

PopUp.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

function PopUp({ message, type, onCancel, onConfirm }) {
  const [primaryColor, setPrimaryColor] = useState(() => {
    let color = 'black';
    switch (type) {
      case 'success':
        color = 'green-500';
        break;
      case 'error':
        color = 'red-500';
        break;
      case 'info':
        color = 'blue-500';
        break;
      case 'warning':
        color = 'yellow-300';
        break;
    }
    return color;
  });
  const handleCancel = () => {
    onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="absolute flex min-w-80 flex-col items-center gap-4 rounded bg-white px-10 py-5">
        {type === 'warning' && (
          <IoWarning className={`text-6xl text-${primaryColor}`} />
        )}
        <p>{message}</p>
        <div className="flex w-full items-center justify-end gap-2 pt-4">
          <button
            onClick={handleCancel}
            className="rounded-sm bg-gray-300 px-4 py-1 text-white hover:bg-opacity-80"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="rounded-sm bg-green-500 px-4 py-1 text-white hover:bg-opacity-80"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
