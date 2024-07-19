import { FiPhone } from 'react-icons/fi';

function ContactByPhone() {
  return (
    <article>
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
          <FiPhone />
        </span>
        <h2 className="text-lg font-medium capitalize text-black">
          Gọi cho chúng tôi
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-base text-black">
        <p>
          Chúng tôi luôn sẵn sàng 24/7, <br></br>7 ngày một tuần.
        </p>
        <p>Số điện thoại: +84 0865783359</p>
      </div>
    </article>
  );
}

export default ContactByPhone;
