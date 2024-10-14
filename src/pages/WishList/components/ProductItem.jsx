import { BsTrash3 } from 'react-icons/bs';
import { FiEye } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewTag from '~/components/NewTag/NewTag';
import SaleTag from '~/components/SaleTag';
import { formatPrice } from '~/utils/formatPrice';

export default function ProductItem({ product, onDelete }) {
  const { id } = useSelector((state) => state.user.current);

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Link to={`/products/detail/${product.id}`}>
      <article className="flex flex-col gap-1">
        <div className="relative flex items-center justify-center rounded bg-[#F5F5F5]">
          <img
            alt="product image"
            src={product.imageMain}
            className="max-h-full"
          />
          <div className="absolute left-3 top-3">
            <SaleTag salePercent={product.saleDiscountPercent} />
            {product.newStatus && (
              <div className="mt-1">
                <NewTag />
              </div>
            )}
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
          <h3 className="line-clamp-1 text-sm text-black group-hover:text-red-500">
            {product.name}
          </h3>
          <p className="flex flex-wrap items-end text-[15px] font-bold text-black">
            {product.saleDiscountPercent > 0
              ? formatPrice(product.finalPrice, 'VNĐ')
              : formatPrice(product.originalPrice, 'VNĐ')}
            <span
              className={`ml-2 text-[#808080] line-through ${product.saleDiscountPercent <= 0 ? 'hidden' : ''}`}
            >
              {formatPrice(product.originalPrice, 'VNĐ')}
            </span>
          </p>
        </div>
      </article>
    </Link>
  );
}
