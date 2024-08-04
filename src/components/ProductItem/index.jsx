import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import NewTag from '../NewTag/NewTag';
import SaleTag from '../SaleTag';
import StarRating from '../StarRating';

import { BsTrash3 } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '~/pages/Auth/userSlice';
import { toast } from 'react-toastify';

export default function ProductItem({ product }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.current);
  const isAuthenticated = !!user.id;
  const [showAddToCart, setShowAddToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(product.favorite);
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }
    navigate(`/products/detail/${product.id}`);
  };

  return (
    <article className="flex flex-col gap-4">
      <div
        onMouseEnter={() => setShowAddToCart(true)}
        onMouseLeave={() => setShowAddToCart(false)}
        className="relative flex h-[250px] items-center justify-center rounded bg-[#F5F5F5]"
      >
        <img
          alt="product image"
          src={product.imageMain}
          className="max-h-[80%]"
        />
        <div className="absolute left-3 top-3">
          {product.saleDiscountPercent > 0 && (
            <SaleTag salePercent={product.saleDiscountPercent} />
          )}
          {product.newStatus && (
            <div className="mt-1">
              <NewTag />
            </div>
          )}
        </div>
        <div
          className={`absolute bottom-0 left-0 right-0 flex cursor-pointer items-center justify-center rounded-b bg-black text-white hover:bg-[#DB4444] ${showAddToCart ? 'h-10' : 'h-0'} transition-all`}
        >
          <p
            onClick={handleAddToCart}
            className={`${showAddToCart ? 'block' : 'hidden'} py-2`}
          >
            Thêm vào giỏ hàng
          </p>
        </div>
        <div className="absolute right-3 top-3">
          {!product.isInWishList ? (
            <>
              <button
                className={`mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors ${!isFavorite ? 'hover:bg-[#DB4444] hover:text-[#FAFAFA]' : 'hover:border-[#DB4444]'} border-2 border-solid border-transparent`}
                onClick={() => setIsFavorite((prevStatus) => !prevStatus)}
              >
                {!isFavorite ? (
                  <FaRegHeart />
                ) : (
                  <FaHeart className="text-[#DB4444]" />
                )}
              </button>
              <Link to={`/products/detail/${product.id}`}>
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
                  <FiEye />
                </button>
              </Link>
            </>
          ) : (
            <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
              <BsTrash3 />
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-2 line-clamp-1 font-medium text-black">
          {product.name}
        </h3>
        <p className="mb-2 flex flex-wrap items-center font-medium text-[#DB4444]">
          {product.saleDiscountPercent > 0
            ? formatPrice(product.finalPrice, 'VNĐ')
            : formatPrice(product.originalPrice, 'VNĐ')}
          <span
            className={`ml-3 text-[#808080] line-through ${product.saleDiscountPercent <= 0 ? 'hidden' : ''}`}
          >
            {formatPrice(product.originalPrice, 'VNĐ')}
          </span>
        </p>
        <div className="flex items-center gap-2">
          <StarRating productReviewRate={product.rating} />
          <span className="text-sm font-semibold text-[#A0A0A0]">
            ({product.nrating})
          </span>
        </div>
      </div>
    </article>
  );
}
