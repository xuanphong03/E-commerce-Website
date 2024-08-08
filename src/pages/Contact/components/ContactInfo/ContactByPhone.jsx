import { FiPhone } from 'react-icons/fi';

function ContactByPhone() {
  return (
    <article className="">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
          <FiPhone />
        </span>
        <h2 className="text-lg font-medium capitalize text-black">
          Liên hệ trực tiếp
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-base text-black">
        <p>Chúng tôi luôn sẵn sàng 24/7, 7 ngày một tuần.</p>
        <p>Số điện thoại: 086 578 359</p>
      </div>
    </article>
  );
}

export default ContactByPhone;
