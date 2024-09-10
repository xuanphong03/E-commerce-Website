import { useSelector } from 'react-redux';
import { Rating } from '@mui/material';
import { FiEye } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import { formatPrice } from '~/utils/formatPrice';
import SaleTag from '~/components/SaleTag';
import NewTag from '~/components/NewTag/NewTag';

export default function ProductItem({ product, onDelete }) {
  const { id } = useSelector((state) => state.user.current);
  const handleDelete = () => {
    try {
      const data = {
        use_id: id,
        product_name: product.name,
      };
      if (onDelete) {
        onDelete(data);
      }
    } catch (error) {
      throw new Error('Error delete product from wish list');
    }
  };

  return (
    <article className="flex flex-col gap-4">
      <div className="relative flex h-[250px] items-center justify-center rounded bg-[#F5F5F5]">
        <img
          alt="product image"
          src={product.imageMain}
          className="max-h-[80%]"
        />
        <div className="absolute left-3 top-3">
          <SaleTag salePercent={product.saleDiscountPercent} />
          {product.newStatus && (
            <div className="mt-1">
              <NewTag />
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex h-10 cursor-pointer items-center justify-center rounded-b bg-black text-white transition-all hover:bg-[#DB4444]">
          <p className="py-2">Thêm vào giỏ hàng</p>
        </div>
        <div className="absolute right-3 top-3">
          {!product.isFavorite ? (
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]">
              <FiEye />
            </button>
          ) : (
            <button
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]"
            >
              <BsTrash3 />
            </button>
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-2 line-clamp-1 font-medium text-black">
          {product.name}
        </h3>
        <p className="mb-2 font-medium text-[#DB4444]">
          {formatPrice(product.finalPrice, 'VNĐ')}
          <span
            className={`ml-3 text-[#808080] line-through ${product.saleDiscountPercent <= 0 ? 'hidden' : ''}`}
          >
            {formatPrice(product.originalPrice, 'VNĐ')}
          </span>
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Rating
            name="read-only"
            value={Number(product.rating)}
            precision={0.5}
            size="small"
            readOnly
          />
          <span className="font-semibold text-[#A0A0A0]">
            ({product.nrating})
          </span>
        </div>
      </div>
    </article>
  );
}
