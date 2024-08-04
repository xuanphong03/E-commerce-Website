import { useState } from 'react';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/CartItem';
import CartItem from './components/CartItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice';

const paths = [
  {
    id: 1,
    to: '/',
    name: 'Home',
  },
  {
    id: 2,
    to: '/cart',
    name: 'Cart',
  },
];

const RESPONSE_GET_ALL = {
  user: 1,
  totalPayment: 2000000,
  totalQuantity: 20,
  carts: [
    {
      id: 1,
      name: 'Product 01',
      size: 'L',
      color: 'Đỏ',
      image:
        'https://product.hstatic.net/1000026602/product/img_0095_9890f80f95df47cba45438e38f9f74d1_master.jpg',
      quantity: 3,
      unitPrice: 200000,
      totalPrice: 600000,
    },
    {
      id: 2,
      name: 'Product 02',
      size: 'XL',
      color: 'Xanh',
      image:
        'https://product.hstatic.net/1000026602/product/00009070_e116726e40ed4bdd908cad5c98fb9e79_master.jpg',
      quantity: 5,
      unitPrice: 200000,
      totalPrice: 1000000,
    },
  ],
};

export default function CartPage() {
  const [cartList, setCartList] = useState(RESPONSE_GET_ALL);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discountCouponCode, setDiscountCouponCode] = useState('');

  const { cart } = useSelector((state) => state.user);
  const { items, totalCost } = cart;
  const shippingFee = cartList.totalPayment > 500000 ? 0 : 100000;

  const handleChangeDiscountCouponCode = (e) => {
    const { value } = e.target;
    setDiscountCouponCode(value);
  };

  const handleGetDiscountCoupon = () => {
    if (!discountCouponCode) return;
    // Call api lấy coupon code ở đây
  };

  return (
    <main className="mx-auto mb-[140px] max-w-[1300px] pt-[50px]">
      {/* <div className="my-[80px]">
        <Breadcrumbs pathList={paths} />
      </div> */}
      <div className="mb-[80px]">
        <div className="mb-6">
          <HeaderTable
            thead={[
              'Sản phẩm',
              'Giá',
              'Kích cỡ',
              'Màu sắc',
              'Số lượng',
              'Tổng tiền',
            ]}
          />
          {cartList.carts.map((cart) => (
            <div key={cart.id}>
              <CartItem data={cart} />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button className="border-[#b3b3b3 flex items-center justify-center rounded border border-solid px-12 py-4 font-medium text-black transition-colors hover:bg-[#DB4444] hover:text-[#fafafa]">
            Quay lại cửa hàng
          </button>
          <button className="border-[#b3b3b3 flex items-center justify-center rounded border border-solid px-12 py-4 font-medium text-black transition-colors hover:bg-[#DB4444] hover:text-[#fafafa]">
            Cập nhật giỏ hàng
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="h-14 w-[300px] rounded border border-solid border-black px-6 py-4">
            <input
              value={discountCouponCode}
              onChange={handleChangeDiscountCouponCode}
              placeholder="Mã giảm giá"
              className="w-full text-base text-black outline-none"
            />
          </div>
          <button
            onClick={handleGetDiscountCoupon}
            className="flex h-14 items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-12 py-4 font-medium text-[#fafafa] transition-colors hover:bg-[#fafafa] hover:text-[#DB4444]"
          >
            Áp dụng mã giảm giá
          </button>
        </div>
        <div className="w-[500px] rounded border border-solid border-black px-6 py-8">
          <h2 className="mb-6 text-xl font-medium capitalize leading-[140%] text-black">
            Hóa đơn giỏ hàng
          </h2>
          <div className="mb-4">
            <div className="flex justify-between py-4">
              <h3>Tổng tiền đơn hàng</h3>
              <span>{formatPrice(cartList.totalPayment, 'VNĐ')}</span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Giảm giá</h3>
              <span>{formatPrice(discountPrice, 'VNĐ')}</span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Tiền vận chuyển</h3>
              <span>
                {shippingFee > 0 ? formatPrice(shippingFee, 'VNĐ') : 'Miễn phí'}
              </span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Tổng hóa đơn</h3>
              <span>
                {formatPrice(cartList.totalPayment - discountPrice, 'VNĐ')}
              </span>
            </div>
          </div>
          <Link to="/checkout">
            <button className="mx-auto flex h-14 items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-12 py-4 font-medium text-[#fafafa] transition-colors hover:bg-[#fafafa] hover:text-[#DB4444]">
              Thanh toán hóa đơn
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
