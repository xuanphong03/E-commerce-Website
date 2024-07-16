import { FiEye } from 'react-icons/fi';

import { BsTrash3 } from 'react-icons/bs';
import SaleTag from '~/components/SaleTag';
import NewTag from '~/components/NewTag/NewTag';
import StarRating from '~/components/StarRating';

export default function ProductItem(props) {
  const {
    productImage,
    productName,
    productPrice,
    productSalePercent,
    productSalePrice,
    productReviewNumber,
    productReviewRate,
    isNewProduct = false,
    isInWishList = false,
  } = props;

  return (
    <article className="flex flex-col gap-4">
      <div className="relative flex h-[250px] items-center justify-center rounded bg-[#F5F5F5]">
        <img alt="product image" src={productImage} className="max-h[80%]" />
        <div className="absolute left-3 top-3">
          <SaleTag salePercent={productSalePercent} />
          {isNewProduct && (
            <div className="mt-1">
              <NewTag />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-10 cursor-pointer items-center justify-center rounded-b bg-black text-white transition-all hover:bg-[#DB4444]">
          <p className="py-2">Thêm vào giỏ hàng</p>
        </div>
        <div className="absolute right-3 top-3">
          {!isInWishList ? (
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
              <FiEye />
            </button>
          ) : (
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
              <BsTrash3 />
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-2 line-clamp-1 font-medium text-black">
          {productName}
        </h3>
        <p className="mb-2 font-poppins font-medium text-[#DB4444]">
          ${productSalePercent > 0 ? productSalePrice : productPrice}
          <span
            className={`ml-3 text-[#808080] line-through ${productSalePercent <= 0 ? 'hidden' : ''}`}
          >
            ${productPrice}
          </span>
        </p>
        {!isInWishList && (
          <div className="flex items-center gap-2">
            <StarRating productReviewRate={productReviewRate} />
            <span className="text-sm font-semibold text-[#A0A0A0]">
              ({productReviewNumber})
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
