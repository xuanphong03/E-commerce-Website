import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { MdDone, MdOutlineSmsFailed } from 'react-icons/md';
import { Link } from 'react-router-dom';

StatusUpdatePassword.propTypes = {
  resetPasswordStatus: PropTypes.bool.isRequired,
};

function StatusUpdatePassword({ resetPasswordStatus }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-2 text-xl font-light uppercase">
        {resetPasswordStatus === true ? (
          <Fragment>
            <MdDone className="text-3xl text-green-500" /> Đặt lại mật khẩu
            thành công
          </Fragment>
        ) : (
          <Fragment>
            <MdOutlineSmsFailed className="text-3xl text-red-500" />
            Đặt lại mật khẩu thất bại
          </Fragment>
        )}
      </div>
      <div className="mt-5 flex justify-center">
        <Link
          to="/"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
        >
          Trở về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default StatusUpdatePassword;
