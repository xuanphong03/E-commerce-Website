import { useState } from 'react';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import HeaderTable from './components/HeaderTable';
import DataTable from './components/CartItem';
import CartItem from './components/CartItem';

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

const FAKE_DATA = [
  {
    id: '1',
    productName: 'San pham 1',
    productImage:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct01.png?alt=media&token=527fbc62-8677-4cb1-b00c-0d149f9c3631',
    productPrice: 650,
    productQuantity: 1,
    subtotal: 650,
  },
  {
    id: '2',
    productName: 'San pham 2',
    productImage:
      'https://firebasestorage.googleapis.com/v0/b/ecommerce-website-5ff4a.appspot.com/o/product_images%2Fproduct04.png?alt=media&token=a51497fc-4824-4523-9101-fe19ac47025f',
    productPrice: 550,
    productQuantity: 1,
    subtotal: 550,
  },
];

export default function CartPage() {
  const [cartData, setCartData] = useState(FAKE_DATA);
  return (
    <main className="mx-auto mb-[140px] max-w-[1300px] pt-[50px]">
      {/* <div className="my-[80px]">
        <Breadcrumbs pathList={paths} />
      </div> */}
      <div className="mb-[80px]">
        <div className="mb-6">
          <HeaderTable thead={['Sản phẩm', 'Giá', 'Số lượng', 'Tổng tiền']} />
          {cartData.map((data) => (
            <div key={data.id}>
              <CartItem data={data} />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button className="border-[#b3b3b3 flex items-center justify-center rounded border border-solid px-12 py-4 font-poppins font-medium text-black transition-colors hover:bg-[#DB4444] hover:text-[#fafafa]">
            Quay lại cửa hàng
          </button>
          <button className="border-[#b3b3b3 flex items-center justify-center rounded border border-solid px-12 py-4 font-poppins font-medium text-black transition-colors hover:bg-[#DB4444] hover:text-[#fafafa]">
            Cập nhật giỏ hàng
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="h-14 w-[300px] rounded border border-solid border-black px-6 py-4">
            <input
              placeholder="Mã giảm giá"
              className="w-full font-poppins text-base text-black outline-none"
            />
          </div>
          <button className="flex h-14 items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-12 py-4 font-poppins font-medium text-[#fafafa] transition-colors hover:bg-[#fafafa] hover:text-[#DB4444]">
            Áp dụng mã giảm giá
          </button>
        </div>
        <div className="w-[500px] rounded border border-solid border-black px-6 py-8 font-poppins">
          <h2 className="mb-6 text-xl font-medium capitalize leading-[140%] text-black">
            Hóa đơn giỏ hàng
          </h2>
          <div className="mb-4">
            <div className="flex justify-between py-4">
              <h3>Tổng tiền đơn hàng</h3>
              <span>$1750</span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Giảm giá</h3>
              <span>$0</span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Tiền vận chuyển</h3>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-solid border-[rgba(0,0,0,0.4)] py-4">
              <h3>Tổng hóa đơn</h3>
              <span>$1750</span>
            </div>
          </div>
          <button className="mx-auto flex h-14 items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-12 py-4 font-poppins font-medium text-[#fafafa] transition-colors hover:bg-[#fafafa] hover:text-[#DB4444]">
            Thanh toán hóa đơn
          </button>
        </div>
      </div>
    </main>
  );
}
