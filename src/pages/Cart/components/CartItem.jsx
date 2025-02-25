import PropTypes from 'prop-types';
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { placeholder30x40 } from '~/constants/placeholder';
import { formatPrice } from '~/utils/formatPrice';
import './CartItem.css';

CartItem.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function CartItem({ data, onChange }) {
  const [quantity, setQuantity] = useState(data.quantity);

  const handleChangeQuantity = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity % 1 !== 0) return;
    if (newQuantity > data.totalQuantity) {
      setQuantity(data.totalQuantity);
      onChange({ ...data, quantity: data.totalQuantity });
      return;
    }

    newQuantity = newQuantity <= 100 ? newQuantity : 100;
    setQuantity(newQuantity);
    onChange({ ...data, quantity: newQuantity });
  };

  const increaseQuantity = () => {
    if (quantity + 1 > data.totalQuantity)
      return toast.warning('Sản phẩm không đủ số lượng');
    if (quantity < 100) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);

      if (onChange) {
        onChange({ ...data, quantity: quantity + 1 });
      }
    }
  };

  const decreaseQuantity = () => {
    if (quantity >= 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      if (onChange) {
        onChange({ ...data, quantity: quantity - 1 });
      }
    }
  };

  return (
    <div className="mt-10 flex w-full px-10 py-5 shadow-table">
      <div className="flex max-w-1/5 basis-1/5 items-center gap-5">
        <div className="h-10">
          <img
            className="max-h-full"
            alt="product image"
            src={data.image || placeholder30x40}
          />
        </div>
        <h4>{data.name}</h4>
      </div>
      <div className="flex basis-[15%] items-center justify-center">
        {formatPrice(data.unitPrice, 'VNĐ')}
      </div>
      <div className="flex max-w-1/10 basis-1/10 items-center justify-center">
        {data.size}
      </div>
      <div className="flex max-w-1/10 basis-1/10 items-center justify-center">
        {data.color}
      </div>
      <div className="flex max-w-1/10 basis-1/10 items-center justify-center">
        {data.totalQuantity}
      </div>
      <div className="flex max-w-1/5 basis-1/5 items-center justify-center">
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
              onClick={increaseQuantity}
              className="cursor-pointer rounded-sm transition-all hover:bg-slate-400 hover:text-[#FAFAFA]"
            />
            <IoIosArrowDown
              onClick={decreaseQuantity}
              className="cursor-pointer rounded-sm transition-all hover:bg-slate-400 hover:text-[#FAFAFA]"
            />
          </div>
        </div>
      </div>
      <div className="flex basis-[15%] items-center justify-center">
        {formatPrice(data.totalPrice, 'VNĐ')}
      </div>
    </div>
  );
}

export default CartItem;
