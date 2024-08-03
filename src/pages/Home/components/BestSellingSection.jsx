import { useEffect, useRef, useState } from 'react';
import BackgroundBanner from '~/assets/images/jbl_boombox.png';
import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';

import ProductImage from '~/assets/images/product01.png';

BestSellingSection.propTypes = {};

function BestSellingSection() {
  const [timer, setTimer] = useState(() => {
    const countdownDate = new Date('August 30, 2024 00:00:00').getTime();
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

  const interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('August 30, 2024 00:00:00').getTime();

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

  return (
    <section className="py-16">
      <div className="mb-6">
        <SectionTag content={'Best selling'} />
      </div>
      <div className="mb-[60px] flex justify-between">
        <h2 className="text-4xl font-semibold tracking-[1.44px]">
          {/* {t('Title Best Selling Products')} */}
        </h2>
        <button className="flex items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-10 py-2 font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]">
          Xem tât cả
        </button>
      </div>
      <div className="mb-[140px] grid grid-cols-12 gap-16">
        {[...Array(4)].map((_, index) => {
          return (
            <div className="col-span-3" key={index}>
              {/* <ProductItem /> */}
            </div>
          );
        })}
      </div>
      <div className="flex h-[500px] w-full items-center bg-black px-16">
        <div className="mr-[80px]">
          <h2 className="mb-8 font-semibold leading-tight text-[#00FF66]">
            {/* {t('Heading Best Seller Categories')} */}
          </h2>
          <h3 className="mb-8 text-5xl font-semibold leading-tight tracking-[1.92px] text-[#FAFAFA]">
            {/* {t('Description Best Seller Categories')} */}
          </h3>
          <div className="mb-10 flex items-center gap-6">
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white">
              <p className="font-semibold leading-tight text-black">
                {timer.days < 10 ? '0' + timer.days : timer.days}
              </p>
              <p className="text-xs font-normal">Ngày</p>
            </div>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white">
              <p className="font-semibold leading-tight text-black">
                {timer.hours < 10 ? '0' + timer.hours : timer.hours}
              </p>
              <p className="text-xs font-normal">Giờ</p>
            </div>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white">
              <p className="font-semibold leading-tight text-black">
                {timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}
              </p>
              <p className="text-xs font-normal">Phút</p>
            </div>
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white">
              <p className="font-semibold leading-tight text-black">
                {timer.seconds < 10 ? '0' + timer.seconds : timer.seconds}
              </p>
              <p className="text-xs font-normal">Giây</p>
            </div>
          </div>
          <button className="flex h-14 items-center justify-center gap-[10px] rounded border-2 border-solid border-[#00FF66] bg-[#00FF66] px-12 py-4 font-medium capitalize text-[#FAFAFA] hover:bg-white hover:text-[#00FF66]">
            Mua ngay
          </button>
        </div>
        <div className="relative flex items-center">
          <div className="h-[400px] w-[600px] rounded-full bg-gray-500 blur-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img className="w-full" alt="background" src={BackgroundBanner} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestSellingSection;
