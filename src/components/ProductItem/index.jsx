import NewTag from '../NewTag/NewTag';
import SaleTag from '../SaleTag';

import { Link } from 'react-router-dom';
import { formatPrice } from '~/utils/formatPrice';

export default function ProductItem({ product }) {
  return (
    <Link to={`/products/detail/${product.id}`}>
      <article className="flex flex-col gap-4">
        <div className="relative flex items-center justify-center rounded bg-[#F5F5F5]">
          <img
            alt="product image"
            src={product.imageMain}
            className="max-w-full"
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
        </div>
        <div className="group">
          <h3 className="line-clamp-1 text-sm text-black group-hover:text-red-500">
            {product.name}
          </h3>
          <p className="mb-2 flex flex-wrap items-end text-[15px] font-bold text-black">
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
