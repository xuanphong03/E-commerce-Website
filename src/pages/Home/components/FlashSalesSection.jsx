import { useEffect, useRef, useState } from 'react';
import SectionTag from '~/components/SectionTag';
import ProductImage from '~/assets/images/product01.png';
import ProductItem from '~/components/ProductItem';
import Skeleton from '~/components/Skeleton/Skeleton';
import productApi from '~/apis/productApi';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

export default function FlashSalesSection() {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const [timer, setTimer] = useState(() => {
    const countdownDate = new Date('July 30, 2024 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  });
  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(null);

  // useEffect(() => {
  //   setLoading(true);
  //   (async () => {
  //     const { products } = await productApi.getAll();
  //     setProductsList(products);
  //   })();
  //   setLoading(false);
  // }, []);

  const interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('July 30, 2024 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setTimer({
          days,
          hours,
          minutes,
          seconds,
        });
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  const handleViewAllProducts = () => {
    const filters = {
      _page: 1,
      _limit: 16,
      _sort: 'ASC',
      isPromotion: 'true',
    };
    navigate(`/products/promotion?${queryString.stringify(filters)}`);
  };

  return (
    <section className="border-b border-solid border-[#b2b2b2]">
      <div className="mb-6">
        <SectionTag content={t('Subtitle Flash Sales')} />
      </div>
      <div className="mb-10 flex items-end gap-20">
        <h2 className="font-inter text-4xl font-semibold tracking-[1.44px]">
          {t('Title Flash Sales')}
        </h2>
        <div className="flex items-center gap-5">
          <div>
            <h4 className="text-center font-poppins text-xs font-medium">
              {t('Days Timer')}
            </h4>
            <p className="font-inter text-[32px] font-bold leading-[32px] tracking-[1.28px]">
              {timer.days < 10 ? '0' + timer.days : timer.days}
            </p>
          </div>
          <div className="text-2xl font-bold text-[#E07575]">:</div>
          <div>
            <h4 className="text-center font-poppins text-xs font-medium">
              {t('Hours Timer')}
            </h4>
            <p className="font-inter text-[32px] font-bold leading-[32px] tracking-[1.28px]">
              {timer.hours < 10 ? '0' + timer.hours : timer.hours}
            </p>
          </div>
          <div className="text-2xl font-bold text-[#E07575]">:</div>
          <div>
            <h4 className="text-center font-poppins text-xs font-medium">
              {t('Minutes Timer')}
            </h4>
            <p className="font-inter text-[32px] font-bold leading-[32px] tracking-[1.28px]">
              {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}
            </p>
          </div>
          <div className="text-2xl font-bold text-[#E07575]">:</div>
          <div>
            <h4 className="text-center font-poppins text-xs font-medium">
              {t('Seconds Timer')}
            </h4>
            <p className="font-inter text-[32px] font-bold leading-[32px] tracking-[1.28px]">
              {timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-16">
        {/* {!loading &&
          productsList.slice(0, 4).map((product) => (
            <div className="col-span-3" key={product.id}>
              <ProductItem
                productId={product.id}
                productImage={product.image}
                productSalePercent={40}
                productName={product.name}
                productSalePrice={product.salePrice}
                productPrice={product.price}
                productReviewRate={product.rating}
                productReviewNumber={product.nRating}
              />
            </div>
          ))}
        {loading &&
          [...Array(4)].map((_, index) => {
            return (
              <div className="col-span-3" key={index}>
                <Skeleton />
              </div>
            );
          })} */}

        {[...Array(4)].map((_, index) => {
          return (
            <div className="col-span-3" key={index}>
              <ProductItem
                productImage={ProductImage}
                productSalePercent={40}
                productName="HAVIT HV-G92 GamepadHAVIT HV-G92 Gamepad"
                productSalePrice={120}
                productPrice={160}
                productReviewRate={4.5}
                productReviewNumber={88}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={handleViewAllProducts}
        className="mx-auto my-[60px] flex items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-10 py-2 font-poppins font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]"
      >
        {t('View All Products Button')}
      </button>
    </section>
  );
}
