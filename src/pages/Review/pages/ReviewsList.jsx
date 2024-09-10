import { useState } from 'react';
import PurchasedProduct from '../components/PurchasedProduct';
import ReviewProductForm from '../components/ReviewProductForm';

function ReviewsList() {
  const [isReviewing, setIsReviewing] = useState(false);
  const FAKE_DATA = {
    name: 'Áo hoodie',
    image: 'https://img.ws.mms.shopee.vn/afea95f5aa3866c013dcc57f791744cf',
    color: 'Trắng',
    size: 'XL',
    rate_status: false,
    order_date: '20/11/2024',
  };
  const reviewProduct = (data) => {
    setIsReviewing(true);
    console.log('123');
  };

  const handleCancel = () => {
    setIsReviewing(false);
  };
  const handleSubmit = async (data) => {
    try {
      console.log(data);
      setIsReviewing(false);
    } catch (error) {
      throw new Error('Đánh giá sản phẩm thất bại');
    }
  };
  return (
    <>
      <div>
        <div className="flex justify-between pb-5">
          <h2 className="max-w-[20%] basis-1/5 font-medium">Ảnh</h2>
          <h2 className="max-w-[20%] basis-1/5 font-medium">Tên sản phẩm</h2>
          <h2 className="max-w-[10%] basis-[10%] font-medium">Phân loại</h2>
          <h2 className="max-w-[10%] basis-[10%] text-center font-medium">
            Ngày mua hàng
          </h2>
          <h2 className="max-w-[20%] basis-1/5 text-center font-medium">
            Trạng thái
          </h2>
          <h2 className="max-w-[20%] basis-1/5 text-center font-medium">
            Đánh giá
          </h2>
        </div>
        <hr></hr>
        <div>
          {[...Array(10)].map((_, index) => (
            <PurchasedProduct
              key={index}
              product={FAKE_DATA}
              onReview={reviewProduct}
            />
          ))}
        </div>
      </div>
      {isReviewing && (
        <ReviewProductForm onCancel={handleCancel} onSubmit={handleSubmit} />
      )}
    </>
  );
}

export default ReviewsList;
