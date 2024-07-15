import { useState } from 'react';
import SaleTag from '../SaleTag';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import StarRating from '../StarRating';
import NewTag from '../NewTag/NewTag';

export default function ProductItem(props) {
  const {
    productImage,
    productName,
    productPrice,
    productSalePercent,
    productSalePrice,
    productReviewNumber,
    productReviewRate,
    favorite = false,
    isNewProduct = false,
  } = props;
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);
  return (
    <article className="flex flex-col gap-4">
      <div
        onMouseEnter={() => setShowAddToCart(true)}
        onMouseLeave={() => setShowAddToCart(false)}
        className="relative flex h-[250px] items-center justify-center rounded bg-[#F5F5F5]"
      >
        <img alt="product image" src={productImage} className="max-h[80%]" />
        <div className="absolute left-3 top-3">
          <SaleTag salePercent={productSalePercent} />
          {isNewProduct && (
            <div className="mt-1">
              <NewTag />
            </div>
          )}
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 flex cursor-pointer items-center justify-center rounded-b bg-black text-white ${showAddToCart ? 'h-10' : 'h-0'} transition-all`}
        >
          <p className="py-2">Thêm vào giỏ hàng</p>
        </div>
        <div className="absolute right-3 top-3">
          <button
            className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white"
            onClick={() => setIsFavorite(true)}
          >
            {!isFavorite ? (
              <FaRegHeart />
            ) : (
              <FaHeart className="text-[#DB4444]" />
            )}
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <FiEye />
          </button>
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
        <div className="flex items-center gap-2">
          <StarRating productReviewRate={productReviewRate} />
          <span className="text-sm font-semibold text-[#A0A0A0]">
            ({productReviewNumber})
          </span>
        </div>
      </div>
    </article>
  );
}
