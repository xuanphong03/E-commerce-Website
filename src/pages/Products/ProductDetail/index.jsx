import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import StarRating from '~/components/StarRating';
import { formatPrice } from '~/utils/formatPrice';
import { use } from 'i18next';
import { FiMinus, FiPlus } from 'react-icons/fi';
import IconReturn from '~/assets/icons/Icon-return.svg';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import SectionTag from '~/components/SectionTag';
import './CustomizedScrollbar.css';
import FeedbackList from './components/FeedbackList';
import productApi from '~/apis/productApi';
ProductDetail.propTypes = {};

function ProductDetail() {
  let { id } = useParams();
  const [checkedColor, setCheckedColor] = useState(null);
  const [checkedSize, setCheckedSize] = useState(null);
  const [colors, setColors] = useState([
    'blue',
    'gray',
    'green',
    'red',
    'black',
    'white',
  ]);
  const [sizes, setSizes] = useState(['XS', 'S', 'M', 'L', 'XL']);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [quantityProduct, setQuantityProduct] = useState(1);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    (async () => {
      try {
        const response = await productApi.getDetail({ id });
        setProductDetail(response);
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, [id]);

  const changeColor = (index) => {
    setCheckedColor(index);
  };
  const increaseQuantityProduct = () => {
    if (quantityProduct >= 100) return;
    setQuantityProduct((prev) => prev + 1);
  };
  const decreaseQuantityProduct = () => {
    if (quantityProduct <= 0) return;
    setQuantityProduct((prev) => prev - 1);
  };

  const changeQuantityProduct = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity % 1 === 0 && newQuantity >= 0 && newQuantity <= 100) {
      setQuantityProduct(newQuantity);
    }
  };

  return (
    <main className="pb-36 pt-10">
      <div className="mx-auto max-w-[1200px]">
        <section className="flex gap-10">
          <div className="flex basis-3/5 gap-2">
            <div className="flex basis-1/4 flex-col items-center gap-4">
              <div className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src="https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02269.png"
                />
              </div>
              <div className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src="https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02269.png"
                />
              </div>
              <div className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src="https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02269.png"
                />
              </div>
              <div className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src="https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02269.png"
                />
              </div>
            </div>
            <div className="basis-3/4">
              <div className="flex h-full w-full items-center justify-center rounded-md bg-[#f5f5f5] p-10">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src="https://khothietke.net/wp-content/uploads/2021/04/PNGKhothietke.net-02269.png"
                />
              </div>
            </div>
          </div>
          <article className="flex basis-2/5 flex-col justify-between px-5">
            <div>
              <h1 className="mb-4 font-inter text-2xl font-semibold leading-none tracking-[0.72px]">
                {productDetail.name}
              </h1>
              <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <StarRating productReviewRate={0} />
                  <p className="font-poppins text-[#808080]">
                    ({productDetail.nrating} Đánh giá)
                  </p>
                </div>
                <div className="h-4 w-[1px] bg-[#808080]"></div>
                <p className="text-[#0F6]">Còn hàng</p>
              </div>
              <h4 className="mb-6 font-inter text-2xl tracking-[0.72px]">
                {formatPrice(productDetail.price, 'VNĐ')}
              </h4>
              <p className="mb-6 w-4/5 break-words font-poppins text-sm">
                {productDetail.description}
              </p>
              {productDetail.colour && productDetail.colour.length && (
                <div className="mb-6 flex items-center gap-6 border-t border-solid border-black pt-6">
                  <h4 className="text-xl leading-none tracking-[0.6px]">
                    Colors:
                  </h4>
                  <div className="flex items-center gap-2">
                    {colors.map((color, index) => {
                      return (
                        <label
                          key={color}
                          className={`${checkedColor === index ? 'border-2 border-solid border-black' : ''} flex size-5 cursor-pointer items-center justify-center overflow-hidden rounded-full`}
                        >
                          <span
                            className={`${checkedColor === index ? 'size-3' : 'size-full'} ${color !== 'white' && color !== 'black' ? `bg-${color}-400` : `bg-${color}`} ${color === 'white' ? 'border-2 border-solid border-black' : ''} flex rounded-full`}
                          ></span>
                          <input
                            onChange={() => changeColor(index)}
                            hidden
                            type="radio"
                            name="colors"
                            value={color}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {productDetail.size && productDetail.size.length && (
                <div className="mb-6 flex items-center gap-6 font-inter">
                  <h4 className="text-xl tracking-[0.6px]">Size</h4>
                  <div className="flex items-center gap-4">
                    {sizes.map((size, index) => (
                      <label
                        key={size}
                        className={`${checkedSize === index ? 'border-[#DB4444] bg-[#DB4444] text-[#fafafa]' : 'border-black bg-white'} flex size-8 cursor-pointer items-center justify-center rounded border-2 border-solid font-poppins text-sm font-medium transition-all`}
                      >
                        <input
                          onChange={() => setCheckedSize(index)}
                          hidden
                          name="sizes"
                          value="xs"
                          type="checkbox"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between gap-6">
                <div className="flex w-40 overflow-hidden rounded border border-solid border-[rgba(0,0,0,0.5)]">
                  <span
                    onClick={decreaseQuantityProduct}
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-2xl"
                  >
                    <FiMinus />
                  </span>
                  <input
                    value={quantityProduct}
                    onChange={changeQuantityProduct}
                    type="text"
                    className="h-10 w-full border-x border-solid border-[rgba(0,0,0,0.5)] px-4 text-center font-poppins text-xl font-medium leading-[140%] outline-none"
                  />
                  <span
                    onClick={increaseQuantityProduct}
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center bg-[#DB4444] text-2xl text-[#fafafa]"
                  >
                    <FiPlus />
                  </span>
                </div>
                <button
                  className={`${!quantityProduct > 0 ? 'cursor-not-allowed opacity-50' : ''} rounded bg-[#DB4444] px-12 font-poppins font-medium text-[#fafafa]`}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setIsFavorite((prev) => !prev)}
                  className="flex size-10 items-center justify-center rounded border border-solid border-black text-xl"
                >
                  {isFavorite ? (
                    <FaHeart className="text-[#DB4444]" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
              </div>
              <div className="flex gap-4 rounded border border-solid border-[#b0b0b0] px-4 py-6">
                <div className="size-10">
                  <img className="max-w-full" alt="icon" src={IconReturn} />
                </div>
                <div className="font-poppins font-medium">
                  <h4>Return Delivery</h4>
                  <p className="text-xs">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="my-20">
          <FeedbackList />
        </section>
      </div>
    </main>
  );
}

export default ProductDetail;
