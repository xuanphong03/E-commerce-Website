import AboutBackground from '~/assets/images/about-bg.png';

import React from 'react';
import PropTypes from 'prop-types';

Introduce.propTypes = {};

function Introduce(props) {
  return (
    <section className="flex items-center">
      <article className="max-w-[50%] basis-1/2">
        <h2 className="mb-10 text-justify font-inter text-[54px] font-semibold leading-[64px] tracking-[3.24px]">
          Giới thiệu về chúng tôi
        </h2>
        <div className="flex max-w-[80%] flex-col gap-6">
          <p className="leading-[162.5%]">
            Ra mắt vào năm 2024, Exclusive là nơi mua sắm trực tuyến hàng đầu
            Việt Nam với sự hiện diện tích cực ở tp.Hà Nội. Được hỗ trợ bởi
            nhiều giải pháp tiếp thị, dữ liệu và dịch vụ phù hợp, Exclusive có
            10.500 người bán và 300 thương hiệu và phục vụ 3 triệu khách hàng
            trên toàn đất nước.
          </p>
          <p className="leading-[162.5%]">
            Exclusive có hơn 1 triệu sản phẩm để cung cấp, tốc độ tăng trưởng
            rất nhanh. Độc quyền cung cấp nhiều loại tài sản khác nhau, từ người
            tiêu dùng.
          </p>
        </div>
      </article>
      <div className="max-w-[50%] basis-1/2">
        <img alt="about background" src={AboutBackground} className="w-full" />
      </div>
    </section>
  );
}

export default Introduce;
