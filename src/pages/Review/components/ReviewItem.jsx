// import PropTypes from 'prop-types';
// import { Rating } from '@mui/material';

// ReviewItem.propTypes = {
//   product: PropTypes.object,
// };

// function ReviewItem({ product }) {
//   return (
//     <>
//       <div className="flex py-10">
//         <div className="max-w-[10%] basis-[10%]">
//           <img
//             alt="product image"
//             src={product.mainImage}
//             className="size-16 object-cover"
//           />
//         </div>
//         <div className="max-w-[20%] basis-1/5 break-words">{product.name}</div>
//         <div className="max-w-[10%] basis-[10%]">
//           Màu {product.color}, size {product.size}
//         </div>
//         <div className="max-w-[10%] basis-[10%]">
//           <Rating
//             precision={0.5}
//             size="small"
//             name="read-only"
//             value={product.rating}
//             readOnly
//           />
//         </div>
//         <div className="max-w-[40%] basis-2/5 px-5">{product.comment}</div>
//         <div className="max-w-[10%] basis-[10%] text-right">
//           {product.order_date}
//         </div>
//       </div>
//       <hr></hr>
//     </>
//   );
// }

// export default ReviewItem;

import PropTypes from 'prop-types';
import { Rating } from '@mui/material';
import moment from 'moment';
import 'moment/locale/vi';
import { useEffect } from 'react';

ReviewItem.propTypes = {
  product: PropTypes.object,
};

function ReviewItem({ product }) {
  useEffect(() => {
    // Đặt ngôn ngữ là tiếng Việt
    moment.locale('vi');
  }, []);
  return (
    <>
      <div className="flex py-10">
        <div className="max-w-[10%] basis-[10%]">
          <img
            alt="product image"
            src={product.image}
            className="size-16 object-cover"
          />
        </div>
        <div className="max-w-[20%] basis-1/5 break-words px-5">
          {product.identification_pro}
        </div>
        <div className="max-w-[10%] basis-[10%] px-2 text-center">
          Màu {product.color}, size {product.size}
        </div>
        <div className="max-w-[10%] basis-[10%] px-4">
          <Rating
            precision={0.5}
            size="small"
            name="read-only"
            value={product.rating}
            readOnly
          />
        </div>
        <div className="max-w-[40%] basis-2/5 px-5 text-center">
          {product.content}
        </div>
        <div className="max-w-[10%] basis-[10%] text-center">
          {moment(product.createDate).format('L')}
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default ReviewItem;
