import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import reviewApi from '~/apis/reviewApi';
import PurchasedProduct from '../components/PurchasedProduct';
import ReviewProductForm from '../components/ReviewProductForm';

function ReviewsList() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { name } = useSelector((state) => state.user.current);

  const [reviewList, setReviewList] = useState([]);
  useEffect(() => {
    fetchListReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchListReview = async () => {
    try {
      const response = await reviewApi.getAllReviewUnfinished(name);
      setReviewList(response);
    } catch (error) {
      throw new Error('Failed to fetch unfinished all reviews');
    }
  };

  const reviewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  const handleSubmit = async (reviewData) => {
    try {
      console.log('Submitted review data:', reviewData);
      setSelectedProduct(null);
    } catch (error) {
      throw new Error('Failed to submit review');
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between pb-5">
          <h2 className="max-w-[10%] basis-1/5 font-medium">Ảnh</h2>
          <h2 className="max-w-[30%] basis-1/5 font-medium">Tên sản phẩm</h2>
          <h2 className="max-w-[10%] basis-[10%] text-center font-medium">
            Phân loại
          </h2>
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
        <hr />

        <div>
          {reviewList.length > 0 ? (
            reviewList.map((product, index) => (
              <PurchasedProduct
                key={index}
                product={product}
                onReview={() => reviewProduct(product)}
              />
            ))
          ) : (
            <p className="py-5">Không có đánh giá nào.</p>
          )}
        </div>
      </div>

      {selectedProduct && (
        <ReviewProductForm
          product={selectedProduct}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default ReviewsList;
