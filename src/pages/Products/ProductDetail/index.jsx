import { Rating } from '@mui/material';
import { Fragment, memo, useCallback, useEffect, useState } from 'react';
import { FaCartPlus, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import cartApi from '~/apis/cartApi';
import favoriteApi from '~/apis/favoriteApi';
import productApi from '~/apis/productApi';
import reviewApi from '~/apis/reviewApi';
import SizeGuidePanel from '~/components/SizeGuidePanel';
import { placeholder500x500, placeholder80x80 } from '~/constants/placeholder';
import { addToCart } from '~/pages/Cart/cartSlice';
import { formatPrice } from '~/utils/formatPrice';
import FeedbackList from './components/FeedbackList';
import RelatedProducts from './components/RelatedProducts';

// Component hiển thị ảnh chính
const MainImage = memo(({ activeImage }) => {
  return (
    <div className="flex w-full items-center justify-center overflow-hidden rounded-md">
      <img
        alt="product image"
        className="max-w-full object-cover"
        src={activeImage || placeholder500x500}
      />
    </div>
  );
});

// Component hiển thị danh sách các ảnh nhỏ
const ImageList = memo(({ images, handleChangeImage }) => {
  return (
    <ul className="flex h-[700px] w-[110px] flex-col items-center gap-5 overflow-y-auto">
      {images.length <= 0 &&
        [...Array(4)].map((_, index) => {
          return (
            <li
              key={index}
              className="flex h-28 w-32 items-center justify-center rounded-md bg-[#f5f5f5] p-4"
            >
              <img
                alt="product image"
                className="max-w-full object-cover"
                src={placeholder80x80}
              />
            </li>
          );
        })}
      {images.length > 0 &&
        images.map((image) => {
          return (
            <li
              onClick={() => handleChangeImage(image)}
              key={uuidv4()}
              className="flex max-w-full cursor-pointer items-center justify-center overflow-hidden rounded-md"
            >
              <img
                alt="product image"
                className="max-w-full object-cover"
                src={image || placeholder80x80}
              />
            </li>
          );
        })}
    </ul>
  );
});

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user.current);
  const isAuthenticated = !!id;
  let { productId } = useParams();
  const [feedbacksList, setFeedbackList] = useState([]);
  const [checkedColor, setCheckedColor] = useState(null);
  const [checkedSize, setCheckedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [outStockSizeList, setOutStockSizeList] = useState([]);
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [images, setImages] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Lấy danh sách đánh giá sản phẩm
  const getAllReviewByProduct = async (productName) => {
    try {
      const response = await reviewApi.getAllReviewsByProduct(productName);
      setFeedbackList(response);
    } catch (error) {
      throw new Error('Err');
    }
  };
  // Lấy danh sách sản phẩm liên quan
  const getRelatedProducts = async (subCategory, productName) => {
    try {
      const response = await productApi.getRelatedProduct(subCategory, {
        _userId: id,
        _limit: 4,
        _page: 1,
      });
      setRelatedProducts(response.data);
    } catch (error) {
      throw new Error('Failed to get related products');
    }
  };
  // Tăng số lượng sản phẩm muốn thêm vào giỏ hàng
  const increaseQuantityProduct = () => {
    if (quantityProduct >= 100) return;
    setQuantityProduct((prev) => prev + 1);
  };
  // Giảm số lượng sản phẩm muốn thêm vào giỏ hàng
  const decreaseQuantityProduct = () => {
    if (quantityProduct <= 0) return;
    setQuantityProduct((prev) => prev - 1);
  };
  // Thay đổi số lượng sản phẩm muốn thêm vào giỏ hàng
  const changeQuantityProduct = (e) => {
    let newQuantity = Number(e.target.value);
    if (newQuantity % 1 === 0 && newQuantity >= 0) {
      if (newQuantity <= 100) {
        setQuantityProduct(newQuantity);
      } else {
        setQuantityProduct(100);
      }
    }
  };
  // Thêm sản phẩm vào giỏ hàng
  const handleAddProductToCart = () => {
    if (!isAuthenticated) {
      return toast.info('Vui lòng đăng nhập để thực hiện yêu cầu');
    } else if (checkedColor === null) {
      return toast.warning('Vui lòng chọn màu sắc của sản phẩm');
    } else if (checkedSize === null) {
      return toast.warning('Vui lòng chọn kích cỡ của sản phẩm');
    } else if (quantityProduct <= 0) {
      return toast.warning('Số lượng sản phẩm phải lớn hơn 0');
    }

    // Kiểm tra số lượng sản phẩm thêm vào giỏ hàng với số lượng trong kho
    const quantityInStock = productDetail.quantityDetails
      ?.find(({ color }) => color === checkedColor)
      .sizes.find(({ size }) => size === checkedSize).quantity;

    if (quantityProduct > quantityInStock) {
      return toast.error(
        'Số lượng sản phẩm đã vượt quá số lượng trong giỏ hàng',
      );
    }

    const requestData = {
      user_id: id,
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
        // Dispatch action để cập nhật giỏ hàng trong Redux
        dispatch(addToCart({ quantity: quantityProduct }));
      })();
      setQuantityProduct(1);
      toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    } catch (error) {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại!');
    }
  };
  // Kiểm tra số lượng sản phẩm trong kho
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
  // Thay đổi màu sản phẩm muốn thêm vào giỏ hàng
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
  // Thay đổi kích thước sản phẩm muốn thêm vào giỏ hàng
  const handleChangeSize = (size) => {
    if (outStockSizeList.includes(size)) {
      return;
    }
    setCheckedSize(size);
  };
  // Kiểm tra hết hàng
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
  // Thay đổi trạng thái yêu thích sản phẩm
  const handleToggleFavoriteProduct = async () => {
    if (!isAuthenticated) {
      toast.info('Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích');
      return;
    }
    try {
      const params = {
        product_name: productDetail.name,
        use_id: id,
      };
      if (!isFavorite) {
        await favoriteApi.add(params);
        setIsFavorite(true);
        toast.success('Đã thêm vào danh sách yêu thích', {
          autoClose: 1500,
        });
      } else {
        await favoriteApi.delete(params);
        setIsFavorite(false);
        toast.success('Đã xóa khỏi danh sách yêu thích', {
          autoClose: 1500,
        });
      }
    } catch (error) {
      throw new Error('Error toggle favorite product detail!');
    }
  };
  const handleChangeImage = useCallback((image) => {
    setActiveImage(image);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const params = { id: productId };
        if (isAuthenticated) {
          params._userId = id;
        }
        const response = await productApi.getDetail(params);
        const subImages = response.images;
        setProductDetail(response);
        await getAllReviewByProduct(response.name);
        await getRelatedProducts(response.subCategory, response.name);
        setIsFavorite(response.isFavorite);
        setRating(response.rating);
        setCategory(response.category);
        setActiveImage(response.imageMain);
        setImages([response.imageMain, ...subImages]);
      } catch (error) {
        throw new Error(error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, id]);

  return (
    <Fragment>
      {showSizeGuide && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-20">
          <SizeGuidePanel
            onClose={() => setShowSizeGuide(false)}
            type={category}
          />
        </div>
      )}
      <main className="pb-36 pt-10">
        <div className="container mx-auto space-y-20">
          <section className="flex gap-10">
            <div className="flex shrink-0 basis-1/2 gap-10">
              <ImageList
                images={images}
                handleChangeImage={handleChangeImage}
              />
              <div className="w-[calc(100%-110px)]">
                <MainImage activeImage={activeImage} />
              </div>
            </div>
            <article className="flex basis-1/2 flex-col gap-10 pl-20 pr-10">
              <div>
                <h1 className="mb-2 text-2xl font-semibold capitalize leading-none tracking-[0.72px]">
                  {productDetail.name}
                </h1>
                <div className="mb-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Rating
                      name="read-only"
                      value={rating}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <p className="text-[#808080]">
                      ({productDetail.nrating} Đánh giá)
                    </p>
                  </div>
                  <div className="h-4 w-[1px] bg-[#808080]"></div>
                  <p className="flex items-center gap-2">
                    {productDetail.totalQuantity > 0 ? (
                      <span className="text-[#0F6]">
                        Còn hàng ({productDetail.totalQuantity})
                      </span>
                    ) : (
                      <span className="text-red-500">Hết hàng</span>
                    )}
                  </p>
                  <div className="h-4 w-[1px] bg-[#808080]"></div>
                  <p>Đã bán: {productDetail.quantitySold}</p>
                </div>
                <div className="mb-4">
                  <div className="flex items-end gap-2">
                    <h4 className="flex items-start gap-2 text-3xl font-semibold">
                      {formatPrice(productDetail.finalPrice, 'VNĐ')}
                    </h4>
                    {productDetail.saleDiscountPercent > 0 && (
                      <h4 className="text-xl font-medium text-[#B5B5B5] line-through">
                        {formatPrice(productDetail.originalPrice, 'VNĐ')}
                      </h4>
                    )}
                  </div>
                  {productDetail.saleDiscountPercent > 0 && (
                    <p className="mt-1 flex gap-2 text-sm text-red-500">
                      Tiết kiệm{' '}
                      {formatPrice(
                        productDetail.originalPrice - productDetail.finalPrice,
                        'VNĐ',
                      )}
                      <span className="flex h-5 w-10 items-end justify-center bg-yellow-400 text-black">
                        -{productDetail.saleDiscountPercent}%
                      </span>
                    </p>
                  )}
                </div>
                <p className="mb-4 w-full break-words rounded text-sm">
                  <b>Mô tả sản phẩm:</b> <br></br> {productDetail.description}
                </p>
                <div className="mb-4 flex flex-col gap-2 text-sm">
                  <h4 className="min-w-20 font-bold tracking-[0.6px]">
                    Màu sắc
                  </h4>
                  <div className="flex items-center gap-3">
                    {productDetail.colours?.map((color) => {
                      const isOutOfStock = checkOutOfStock(color);
                      return (
                        <label
                          key={uuidv4()}
                          className={`${isOutOfStock ? 'cursor-not-allowed bg-[#FAFAFA] text-[#C3D2EA]' : 'cursor-pointer text-[#333333]'} ${checkedColor === color ? 'border-[#DB4444]' : 'border-gray'} flex items-center justify-center rounded border-2 border-solid px-4 py-2 text-sm transition-all`}
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

                <div className="mb-4 flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <h4 className="min-w-20 font-bold tracking-[0.6px]">
                      Kích thước
                    </h4>
                    <button
                      onClick={() => setShowSizeGuide(true)}
                      className="text-xs font-medium uppercase underline"
                    >
                      Hướng dẫn lựa size
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    {productDetail.sizes?.map((size) => {
                      const isOutOfStock = outStockSizeList.includes(size);
                      return (
                        <label
                          key={uuidv4()}
                          className={`${isOutOfStock ? 'cursor-not-allowed bg-[#FAFAFA] text-[#C3D2EA]' : 'cursor-pointer text-[#333333]'} ${checkedSize === size ? 'border-[#DB4444]' : 'border-gray'} flex items-center justify-center rounded border-2 border-solid px-4 py-2 text-sm transition-all`}
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
                    className={`${!quantityProduct > 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-opacity-80'} flex min-w-64 items-center justify-center gap-2 rounded border border-solid border-[#DB4444] bg-[#FFEEE8] px-5 py-2 text-[#DB4444]`}
                  >
                    <FaCartPlus />
                    Thêm giỏ hàng
                  </button>
                  <button
                    onClick={handleToggleFavoriteProduct}
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
          <section>
            <FeedbackList feedbacksList={feedbacksList} />
          </section>
          <section>
            <RelatedProducts products={relatedProducts} />
          </section>
        </div>
      </main>
    </Fragment>
  );
}

export default ProductDetail;
