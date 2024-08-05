import { useEffect, useState } from 'react';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/CartItem';
import CartItem from './components/CartItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatPrice } from '~/utils/formatPrice';
import { toast } from 'react-toastify';
import cartApi from '~/apis/cartApi';

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
  const user = useSelector((state) => state.user.current);
  const { id } = user;
  const [cart_items, setCart_items] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [discountCouponCode, setDiscountCouponCode] = useState('');
  const shippingFee = totalPayment > 2000000 ? 0 : 500000;

  useEffect(() => {
    try {
      (async () => {
        const response = await cartApi.getAll({ user_id: id });
        const { cart_items, totalPayment, totalQuantity } = response;
        setCart_items(cart_items);
        setTotalPayment(totalPayment);
        setTotalQuantity(totalQuantity);
      })();
    } catch (error) {
      toast.error('API GET ALL CART LỖI');
    }
  }, []);

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
          {cart_items.length ? (
            cart_items.map((cart) => (
              <div key={cart.itemDetail_id}>
                <CartItem data={cart} />
              </div>
            ))
          ) : (
            <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center gap-5 shadow-table">
              <div className="h-[100px]">
                <img
                  className="max-h-full"
                  src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
                  alt="empty cart"
                />
              </div>
              <p className="text-center text-[#2c2c2c]">
                Giỏ hàng của bạn hiện chưa có sản phẩm nào. <br></br>Quay lại
                trang sản phẩm để thêm sản phẩm vào giỏ hàng
              </p>
            </div>
          )}
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
              <span>{formatPrice(totalPayment, 'VNĐ')}</span>
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
              <span>{formatPrice(totalPayment - discountPrice, 'VNĐ')}</span>
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
