import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import reviewApi from '~/apis/reviewApi';
import ReviewItem from '../components/ReviewItem';

function ReviewsProduct() {
  const { name } = useSelector((state) => state.user.current);
  const [reviewList, setReviewList] = useState([]);

  const getReviewList = async () => {
    try {
      const response = await reviewApi.getAllReviewComplete(name);
      setReviewList(response);
    } catch (error) {
      throw new Error('Failed to get all reviews');
    }
  };

  useEffect(() => {
    getReviewList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div className="flex items-center border border-solid border-gray-300 px-2 py-5">
        <h2 className="max-w-1/5 basis-1/5 px-5 font-medium">Tên sản phẩm</h2>
        <h2 className="max-w-1/5 basis-1/5 px-2 text-center font-medium">
          Phân loại
        </h2>
        <h2 className="max-w-1/5 basis-1/5 text-center font-medium">
          Điểm đánh giá
        </h2>
        <h2 className="max-w-1/5 basis-1/5 px-5 font-medium">
          Nội dung đánh giá
        </h2>
        <h2 className="max-w-1/5 basis-1/5 text-center font-medium">
          Thời gian
        </h2>
      </div>
      <hr></hr>
      <div>
        {reviewList.length > 0 ? (
          reviewList.map((product, index) => (
            <ReviewItem key={index} product={product} />
          ))
        ) : (
          <p className="py-5">Không có đánh giá nào.</p>
        )}
      </div>
    </Fragment>
  );
}

export default ReviewsProduct;
