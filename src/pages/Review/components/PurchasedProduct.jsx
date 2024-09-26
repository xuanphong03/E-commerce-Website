// export default PurchasedProduct;
import moment from 'moment';

function PurchasedProduct({ onReview, product }) {
  const handleReviewProduct = () => {
    if (onReview) {
      onReview(product);
    }
  };
  return (
    <div className="mt-2 flex justify-between border border-solid border-gray-300 px-2 py-5">
      <div className="max-w-[10%] basis-1/5">
        <img
          alt="product image"
          src={product.image}
          className="size-20 object-cover"
        />
      </div>
      <div className="max-w-[20%] basis-1/5">{product.identification_pro}</div>
      <div className="max-w-[10%] basis-[10%] text-center">
        Màu {product.color}, size {product.size}
      </div>
      <div className="max-w-[10%] basis-[10%] text-center">
        {moment(product.createDate).format('DD/MM/YYYY')}
      </div>
      <div className="max-w-[20%] basis-1/5 text-center">
        {product.rate_status === true ? 'Đã đánh giá' : 'Chưa đánh giá'}
      </div>
      <div className="max-w-[20%] basis-1/5 text-center">
        <button
          onClick={handleReviewProduct}
          className="rounded-sm bg-green-500 px-5 py-2 text-sm text-white transition-opacity hover:opacity-80"
        >
          Đánh giá sản phẩm
        </button>
      </div>
    </div>
  );
}

export default PurchasedProduct;
