import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRating from '~/components/StarRating';
import { formatPrice } from '~/utils/formatPrice';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';
import SectionTag from '~/components/SectionTag';
import './CustomizedScrollbar.css';
import FeedbackList from './components/FeedbackList';
import productApi from '~/apis/productApi';
import { placeholder80x80, placeholder500x500 } from '~/constants/placeholder';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import cartApi from '~/apis/cartApi';

function ProductDetail() {
  const user = useSelector((state) => state.user.current);
  const isAuthenticated = !!user.id;
  let { id } = useParams();
  const [checkedColor, setCheckedColor] = useState(null);
  const [checkedSize, setCheckedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [outStockSizeList, setOutStockSizeList] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });

    (async () => {
      try {
        const response = await productApi.getDetail({ id });
        setProductDetail(response);
      } catch (error) {
        throw new Error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const handleAddProductToCart = () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thực hiện yêu cầu');
      return;
    } else if (checkedColor === null) {
      toast.info('Vui lòng chọn màu sắc của sản phẩm');
      return;
    } else if (checkedSize === null) {
      toast.info('Vui lòng chọn kích cỡ của sản phẩm');
      return;
    }

    const requestData = {
      user_id: user.id,
      cart_item: {
        itemDetail_id: productDetail.id,
        name: productDetail.name,
        image: productDetail.imageMain,
        quantity: quantityProduct,
        color: checkedColor,
        size: checkedSize,
        unitPrice: productDetail.finalPrice,
        totalPrice: productDetail.finalPrice * quantityProduct,
      },
    };

    try {
      (async () => {
        // Call API thêm sản phẩm vào giỏ hàng
        await cartApi.create(requestData);
      })();
      toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      toast.success('Thêm sản phẩm vào giỏ hàng thất bại!');
    }
  };
  const getOutStockSizeList = (color) => {
    const { quantityDetails } = productDetail;
    const _outStockSizeList = [];

    const variants = quantityDetails.find((item) => item.color === color);
    variants.sizes.forEach((variant) => {
      if (variant.quantity === 0) {
        _outStockSizeList.push(variant.size);
      }
    });
    return _outStockSizeList;
  };
  const handleChangeColor = (color) => {
    const isOutOfStock = checkOutOfStock(color);
    if (isOutOfStock) {
      return;
    }
    setCheckedColor(color);
    const _outStockSizeList = getOutStockSizeList(color);
    setOutStockSizeList(_outStockSizeList);

    // Reset checked size if it's out of stock for the new color
    if (_outStockSizeList.includes(checkedSize)) {
      setCheckedSize(null);
    }
  };

  const handleChangeSize = (size) => {
    if (outStockSizeList.includes(size)) {
      return;
    }
    setCheckedSize(size);
  };

  const checkOutOfStock = (color) => {
    const { quantityDetails } = productDetail;
    const newQuantityDetails = quantityDetails.map((colorItem) => {
      const totalQuantity = colorItem.sizes.reduce(
        (prevValue, currentValue) => {
          return prevValue + currentValue.quantity;
        },
        0,
      );
      return { ...colorItem, totalQuantity };
    });
    const _color = newQuantityDetails.find((prod) => prod.color === color);
    return _color.totalQuantity === 0;
  };

  // const checkQuantityBySize = (size) => {};

  return (
    <main className="pb-36 pt-10">
      <div className="mx-auto max-w-[1400px]">
        <section className="flex gap-10">
          <div className="flex max-h-[500px] basis-3/5 gap-2">
            <div className="flex basis-1/4 flex-col items-center justify-between gap-4">
              {[...Array(4)].map((_, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4"
                  >
                    <img
                      alt="product image"
                      className="max-h-full max-w-full object-cover"
                      src={placeholder80x80}
                    />
                  </div>
                );
              })}
            </div>
            <div className="basis-3/4">
              <div className="flex h-full w-full items-center justify-center rounded-md bg-[#f5f5f5] p-10">
                <img
                  alt="product image"
                  className="max-h-full max-w-full object-cover"
                  src={productDetail.imageMain || placeholder500x500}
                />
              </div>
            </div>
          </div>
          <article className="flex basis-2/5 flex-col justify-between px-5">
            <div>
              <h1 className="mb-4 text-2xl font-semibold capitalize leading-none tracking-[0.72px]">
                {productDetail.name}
              </h1>
              <div className="mb-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <StarRating productReviewRate={0} />
                  <p className="text-[#808080]">(0 Đánh giá)</p>
                </div>
                <div className="h-4 w-[1px] bg-[#808080]"></div>
                <p className="flex items-center gap-2">
                  Tình trạng:{' '}
                  {productDetail.totalQuantity > 0 ? (
                    <span className="text-[#0F6]">
                      Còn hàng ({productDetail.totalQuantity})
                    </span>
                  ) : (
                    <span className="text-red-500">Hết hàng</span>
                  )}
                </p>
              </div>
              <div className="mb-4 flex items-end gap-5 text-3xl">
                {productDetail.saleDiscountPercent > 0 && (
                  <h4 className="text-2xl text-[#929292] line-through">
                    {formatPrice(productDetail.originalPrice, 'VNĐ')}
                  </h4>
                )}
                <h4 className="flex items-start gap-2">
                  {formatPrice(productDetail.finalPrice, 'VNĐ')}
                  {productDetail.saleDiscountPercent > 0 && (
                    <span className="flex items-center justify-center rounded bg-[#DB4444] px-1 text-xs text-[#fafafa]">
                      Giảm {productDetail.saleDiscountPercent}%
                    </span>
                  )}
                </h4>
              </div>
              <p className="mb-6 w-4/5 break-words text-sm">
                Mô tả: {productDetail.description}
              </p>

              <div className="mb-4 flex items-center gap-4">
                <h4 className="min-w-20 text-base tracking-[0.6px]">
                  Màu sắc:
                </h4>
                <div className="flex items-center gap-4">
                  {productDetail.colours?.map((color) => {
                    const isOutOfStock = checkOutOfStock(color);
                    return (
                      <label
                        key={color}
                        className={`${isOutOfStock ? 'cursor-not-allowed bg-[#FAFAFA] text-[#C3D2EA]' : 'cursor-pointer text-[#333333]'} ${checkedColor === color ? 'border-[#DB4444]' : 'border-gray'} flex items-center justify-center rounded-md border-2 border-solid px-4 py-2 text-sm transition-all`}
                      >
                        <input
                          onChange={() => handleChangeColor(color)}
                          hidden
                          name="colors"
                          value="xs"
                          type="checkbox"
                        />
                        {color}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-4">
                <h4 className="min-w-20 text-base tracking-[0.6px]">
                  Kích cỡ:
                </h4>
                <div className="flex items-center gap-4">
                  {productDetail.sizes?.map((size) => {
                    const isOutOfStock = outStockSizeList.includes(size);
                    return (
                      <label
                        key={size}
                        className={`${isOutOfStock ? 'cursor-not-allowed bg-[#FAFAFA] text-[#C3D2EA]' : 'cursor-pointer text-[#333333]'} ${checkedSize === size ? 'border-[#DB4444]' : 'border-gray'} flex items-center justify-center rounded-md border-2 border-solid px-4 py-2 text-sm transition-all`}
                      >
                        <input
                          onChange={() => handleChangeSize(size)}
                          hidden
                          name="sizes"
                          value="xs"
                          type="checkbox"
                        />
                        {size}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between">
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
                    className="h-10 w-full border-x border-solid border-[rgba(0,0,0,0.5)] px-4 text-center text-xl font-medium leading-[140%] outline-none"
                  />
                  <span
                    onClick={increaseQuantityProduct}
                    className="flex size-10 shrink-0 cursor-pointer items-center justify-center bg-[#DB4444] text-2xl text-[#fafafa]"
                  >
                    <FiPlus />
                  </span>
                </div>
                <button
                  onClick={handleAddProductToCart}
                  className={`${!quantityProduct > 0 ? 'cursor-not-allowed opacity-50' : ''} flex min-w-64 items-center justify-center gap-2 rounded border border-solid border-[#DB4444] bg-[#FFEEE8] px-5 py-2 text-[#DB4444]`}
                >
                  <FaCartPlus />
                  Thêm giỏ hàng
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
              <div className="flex items-center justify-between gap-5">
                <div className="basis-1/2 rounded bg-[#F0F0EE] px-10 py-4 text-center font-medium leading-tight text-[#2c2c2c]">
                  FREESHIP đơn hàng giá trị từ 2 triệu đồng
                </div>
                <div className="basis-1/2 rounded bg-[#F0F0EE] px-10 py-4 text-center font-medium leading-tight text-[#2c2c2c]">
                  Miễn phí đổi trả phát sinh từ nhà sản xuất
                </div>
              </div>
            </div>
          </article>
        </section>
        <section className="my-20">
          <FeedbackList />
        </section>
        <section>
          <div>
            <SectionTag content="Sản phẩm liên quan" />
          </div>
        </section>
      </div>
    </main>
  );
}

export default ProductDetail;
