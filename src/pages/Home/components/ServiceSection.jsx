import { FaArrowUp } from 'react-icons/fa';

import ServiceIcon01 from '~/assets/images/service01.png';
import ServiceIcon02 from '~/assets/images/service02.png';
import ServiceIcon03 from '~/assets/images/service03.png';

ServiceSection.propTypes = {};

function ServiceSection() {
  const handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <section className="relative mx-auto flex w-full items-start justify-center pb-[140px]">
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon01} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            GIAO HÀNG MIỄN PHÍ VÀ NHANH CHÓNG
          </h2>
          <p className="text-center font-poppins text-sm">
            Giao hàng miễn phí cho tất cả các đơn hàng trên $140
          </p>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon02} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            DỊCH VỤ KHÁCH HÀNG 24/7
          </h2>
          <p className="text-center font-poppins text-sm">
            Hỗ trợ khách hàng một cách thân thiện 24/7
          </p>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon03} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            Đảm bảo hoàn trả tiền
          </h2>
          <p className="text-center font-poppins text-sm">
            Chúng tôi trả lại tiền trong vòng 30 ngày
          </p>
        </div>
      </div>
      <button
        onClick={handleScrollTop}
        className="absolute bottom-10 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-colors hover:bg-[#ccc]"
      >
        <FaArrowUp />
      </button>
    </section>
  );
}

export default ServiceSection;
