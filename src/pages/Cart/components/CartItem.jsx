import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './CartItem.css';
import { formatPrice } from '~/utils/formatPrice';

CartItem.propTypes = {
  data: PropTypes.object.isRequired,
};

function CartItem({ data }) {
  const [quantity, setQuantity] = useState(() => data.count);

  const handleChangeQuantity = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity % 1 === 0 && newQuantity < 1000) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="mt-10 flex w-full px-10 py-5 shadow-table">
      <div className="flex max-w-[25%] basis-1/4 items-center gap-5">
        <div className="h-10">
          <img className="max-h-full" alt="product image" src={data.imgURL} />
        </div>
        <h4>{data.productName}</h4>
      </div>
      <div className="flex max-w-[25%] basis-1/4 items-center justify-center">
        {formatPrice(data.unitPrice, 'VNĐ')}
      </div>
      <div className="flex max-w-[25%] basis-1/4 items-center justify-center">
        <div className="flex h-11 w-24 items-center justify-between rounded border-[1.5px] border-solid border-[#999999] px-3 py-1">
          <input
            className="w-14 px-2 outline-none"
            name="productQuantity"
            type="text"
            value={quantity}
            onChange={handleChangeQuantity}
          />

          <div className="flex flex-col">
            <IoIosArrowUp
              onClick={() => setQuantity((prevValue) => prevValue + 1)}
              className="cursor-pointer rounded-sm transition-all hover:bg-slate-400 hover:text-[#FAFAFA]"
            />
            <IoIosArrowDown
              onClick={() => {
                if (quantity - 1 >= 0) {
                  setQuantity((prevValue) => prevValue - 1);
                }
              }}
              className="cursor-pointer rounded-sm transition-all hover:bg-slate-400 hover:text-[#FAFAFA]"
            />
          </div>
        </div>
      </div>
      <div className="flex max-w-[25%] basis-1/4 items-center justify-center">
        {formatPrice(data.totalPrice, 'VNĐ')}
      </div>
    </div>
  );
}

export default CartItem;
