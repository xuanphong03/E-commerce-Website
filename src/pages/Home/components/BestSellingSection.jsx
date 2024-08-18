import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '~/apis/productApi';
import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';

BestSellingSection.propTypes = {};

function BestSellingSection() {
  const queryParams = {
    _page: 1,
    _limit: 20,
    _sort: 'ASC',
    isBestSelling: true,
  };
  const [bestSellingProductsList, setBestSellingProductsList] = useState([]);
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

  useEffect(() => {
    (async () => {
      try {
        const params = {
          _limit: 4,
          _page: 1,
          _isBestSelling: true,
        };
        const { data } = await productApi.getAll(params);
        setBestSellingProductsList(data);
      } catch (error) {
        throw new Error('Error in Get All Best Selling Product');
      }
    })();
  }, []);

  return (
    <section className="py-16">
      <div className="mb-6">
        <SectionTag content={'Trong tháng này'} />
      </div>
      <div className="mb-[60px] flex justify-between">
        <h2 className="text-4xl font-semibold tracking-[1.44px]">
          Best Selling
        </h2>
        <button className="rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]">
          <Link
            to={`products/all_products?${queryString.stringify(queryParams)}`}
            className="flex items-center justify-center px-10 py-2"
          >
            Xem tât cả sản phẩm
          </Link>
        </button>
      </div>
      <div className="grid grid-cols-12 gap-16 pb-[100px]">
        {bestSellingProductsList.slice(0, 4).map((product, index) => {
          return (
            <div className="col-span-3" key={index}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
      <div className="relative flex h-[500px] w-full items-center overflow-hidden px-16">
        <div
          style={{
            backgroundImage: `url('https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fwp-content%2Fblogs.dir%2F6%2Ffiles%2F2018%2F09%2Fparis-fashion-week-best-runway-collections-spring-summer-2019-1.jpg?w=1080&cbr=1&q=90&fit=max')`,
          }}
          className={`absolute inset-0 flex items-center justify-center bg-cover`}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative">
          <h2 className="mb-8 font-semibold leading-tight text-[#00FF66]">
            Loại sản phẩm
          </h2>
          <h3 className="mb-8 max-w-[60%] text-4xl font-semibold uppercase leading-tight tracking-[1.92px] text-[#FAFAFA]">
            Khám Phá Ngay Những Sản Phẩm Được Yêu Thích Và Bán Chạy Nhất Tại Cửa
            Hàng Chúng Tôi
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
      </div>
    </section>
  );
}

export default BestSellingSection;
