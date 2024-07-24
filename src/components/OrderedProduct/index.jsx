import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

OrderedProduct.propTypes = {};

function OrderedProduct({
  productName,
  productType,
  productQuantity,
  productPrice,
  productImage,
}) {
  return (
    <article className="border-gray mb-4 border-b border-solid pb-4">
      <Link className="group flex justify-between">
        <div className="flex w-[70%] gap-10">
          <div className="size-24 shrink-0 bg-black">
            <img alt="product" className="max-h-full" src={productImage} />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="line-clamp-2 text-lg transition-all group-hover:text-[#DB4444] group-hover:underline">
              {productName}
            </h3>
            <div className="text-sm text-[#0000008a]">
              <p>
                Loại sản phẩm: <span>{productType}</span>
              </p>
              <p>
                Số lượng: <span>x{productQuantity}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="flex">Giá: {productPrice} VNĐ</p>
        </div>
      </Link>
    </article>
  );
}

export default OrderedProduct;
