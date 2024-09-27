import Aos from 'aos';
import { useEffect } from 'react';
import { FaShopify, FaUser } from 'react-icons/fa';
import { MdHighQuality } from 'react-icons/md';

function CoreValues() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section>
      <h2 className="mb-10 text-center text-2xl font-semibold uppercase">
        Giá trị cốt lõi
      </h2>
      <div className="flex gap-10">
        <article
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="0"
          data-aos-offset="0"
          className="flex max-w-[33.3333%] basis-1/3 gap-5"
        >
          <div className="h-fit w-fit rounded-full border border-solid border-gray-200 bg-gray-200 p-2 text-6xl leading-none text-red-500">
            <MdHighQuality />
          </div>
          <div>
            <h4 className="mb-2 font-semibold uppercase">Chất lượng</h4>
            <p>
              Chúng tôi luôn ưu tiên chọn những chất liệu bền bỉ và an toàn, đảm
              bảo sự thoải mái cho người mặc
            </p>
          </div>
        </article>
        <article
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="100"
          data-aos-offset="0"
          className="flex max-w-[33.3333%] basis-1/3 gap-5"
        >
          <div className="h-fit w-fit rounded-full border border-solid border-gray-200 bg-gray-200 p-2 text-6xl leading-none text-red-500">
            <FaShopify />
          </div>
          <div>
            <h4 className="mb-2 font-semibold uppercase">Thiết kế độc đáo</h4>
            <p>
              Mỗi thiết kế đều mang dấu ấn riêng biệt, từ cổ điển đến hiện đại,
              phù hợp với nhiều phong cách khác nhau.
            </p>
          </div>
        </article>
        <article
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="200"
          data-aos-offset="0"
          className="flex max-w-[33.3333%] basis-1/3 gap-5"
        >
          <div className="h-fit w-fit rounded-full border border-solid border-gray-200 bg-gray-200 p-2 text-6xl leading-none text-red-500">
            <FaUser />
          </div>
          <div>
            <h4 className="mb-2 font-semibold uppercase">
              Khách hàng là trung tâm
            </h4>
            <p>
              Mọi ý kiến đóng góp của khách hàng đều quan trọng với chúng tôi.
              Chúng tôi luôn nỗ lực để mang lại sự hài lòng tuyệt đối.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default CoreValues;
