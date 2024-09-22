// import React from 'react';
// import PropTypes from 'prop-types';

// PurchasedProduct.propTypes = {};

// function PurchasedProduct({ onReview, product }) {
//   //     name: 'Áo hoodie',
//   //     image: 'https://img.ws.mms.shopee.vn/afea95f5aa3866c013dcc57f791744cf',
//   //     color: 'Trắng',
//   //     size: 'XL',
//   //     rate_status: false,
//   //     order_date: '20/11/2024',
//   const handleReviewProduct = () => {
//     if (onReview) {
//       onReview(product);
//     }
//   };
//   return (
//     <div className="flex justify-between py-5">
//       <div className="max-w-[20%] basis-1/5">
//         <img
//           alt="product image"
//           src={product.image}
//           className="size-20 object-cover"
//         />
//       </div>
//       <div className="max-w-[20%] basis-1/5">{product.name}</div>
//       <div className="max-w-[10%] basis-[10%]">
//         Màu {product.color}, size {product.size}
//       </div>
//       <div className="max-w-[10%] basis-[10%] text-center">
//         {product.order_date}
//       </div>
//       <div className="max-w-[20%] basis-1/5 text-center">Chưa đánh giá</div>
//       <div className="max-w-[20%] basis-1/5 text-center">
//         <button
//           onClick={handleReviewProduct}
//           className="rounded-full bg-green-500 px-5 py-1 text-sm text-white transition-opacity hover:opacity-80"
//         >
//           Đánh giá sản phẩm
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PurchasedProduct;
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

PurchasedProduct.propTypes = {};

function PurchasedProduct({ onReview, product }) {
  //     name: 'Áo hoodie',
  //     image: 'https://img.ws.mms.shopee.vn/afea95f5aa3866c013dcc57f791744cf',
  //     color: 'Trắng',
  //     size: 'XL',
  //     rate_status: false,
  //     order_date: '20/11/2024',
  const handleReviewProduct = () => {
    if (onReview) {
      onReview(product);
    }
  };
  return (
    <div className="flex justify-between py-5">
      <div className="max-w-[10%] basis-1/5">
        <img
          alt="product image"
          src={product.image}
          className="size-20 object-cover"
        />
      </div>
      <div className="max-w-[20%] basis-1/5">{product.identification_pro}</div>
      <div className="max-w-[10%] basis-[10%] text-center">
        Màu {product.color}, size {product.size}
      </div>
      <div className="max-w-[10%] basis-[10%] text-center">
        {moment(product.createDate).format('L')}
      </div>
      <div className="max-w-[20%] basis-1/5 text-center">
        {product.rate_status === true ? 'Đã đánh giá' : 'Chưa đánh giá'}
      </div>
      <div className="max-w-[20%] basis-1/5 text-center">
        <button
          onClick={handleReviewProduct}
          className="rounded-full bg-green-500 px-5 py-1 text-sm text-white transition-opacity hover:opacity-80"
        >
          Đánh giá sản phẩm
        </button>
      </div>
    </div>
  );
}

export default PurchasedProduct;
