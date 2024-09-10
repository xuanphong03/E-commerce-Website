import React from 'react';
import PropTypes from 'prop-types';
import ReviewItem from '../components/ReviewItem';

ReviewsProduct.propTypes = {};

function ReviewsProduct(props) {
  const FAKE = {
    name: 'Áo hoodie',
    mainImage: 'https://img.ws.mms.shopee.vn/afea95f5aa3866c013dcc57f791744cf',
    color: 'Đỏ',
    size: 'M',
    rating: 3,
    order_date: '09/10/2024',
    comment:
      'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available',
  };

  return (
    <div>
      <div className="flex pb-5">
        <h2 className="max-w-[10%] basis-[10%] font-medium">Ảnh</h2>
        <h2 className="max-w-[20%] basis-1/5 font-medium">Tên sản phẩm</h2>
        <h2 className="max-w-[10%] basis-[10%] font-medium">Phân loại</h2>
        <h2 className="max-w-[10%] basis-[10%] font-medium">Điểm đánh giá</h2>
        <h2 className="max-w-[40%] basis-2/5 text-center font-medium">
          Nội dung đánh giá
        </h2>
        <h2 className="max-w-[10%] basis-[10%] text-right font-medium">
          Thời gian
        </h2>
      </div>
      <hr></hr>
      <div>
        {[...Array(10)].map((_, index) => (
          <ReviewItem key={index} product={FAKE} />
        ))}
      </div>
    </div>
  );
}

export default ReviewsProduct;
