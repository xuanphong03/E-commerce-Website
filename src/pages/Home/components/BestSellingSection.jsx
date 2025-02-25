import Aos from 'aos';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import productApi from '~/apis/productApi';
import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';
import Skeleton from '~/components/Skeleton/Skeleton';

function BestSellingSection() {
  const queryParams = {
    _page: 1,
    _limit: 20,
    _sort: 'ASC',
    isBestSelling: true,
  };
  const [bestSellingProductsList, setBestSellingProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Aos.init();
    (async () => {
      try {
        setIsLoading(true);
        const params = {
          _limit: 4,
          _page: 1,
          _isBestSelling: true,
        };
        const { data } = await productApi.getAll(params);
        setIsLoading(false);
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
          Sản phẩm bán chạy nhất
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
        {isLoading &&
          [...Array(4)].map((_, index) => {
            return (
              <div className="col-span-3" key={index}>
                <Skeleton />
              </div>
            );
          })}
        {!isLoading &&
          bestSellingProductsList.map((product, index) => {
            return (
              <div
                data-aos="fade-up"
                data-aos-delay={`${100 * index}`}
                className="col-span-3"
                key={uuidv4()}
              >
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

          <button className="flex h-14 items-center justify-center gap-[10px] rounded border-2 border-solid border-[#00FF66] bg-[#00FF66] px-12 py-4 font-medium capitalize text-[#FAFAFA] hover:bg-white hover:text-[#00FF66]">
            Mua ngay
          </button>
        </div>
      </div>
    </section>
  );
}

export default BestSellingSection;
