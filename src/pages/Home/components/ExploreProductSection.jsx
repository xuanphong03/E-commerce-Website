import Aos from 'aos';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import productApi from '~/apis/productApi';
import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';
import Skeleton from '~/components/Skeleton/Skeleton';
import { v4 as uuidv4 } from 'uuid';

ExploreProductSection.propTypes = {};

function ExploreProductSection({ userId }) {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Aos.init();
    (async () => {
      try {
        setIsLoading(true);
        const params = { _limit: 8, _page: 1 };
        if (userId) {
          params._userId = userId;
        }
        const { data } = await productApi.getAll(params);
        setProductsList(data);
        setIsLoading(false);
      } catch (error) {
        throw new Error('Error in Explore Product');
      }
    })();
  }, [userId]);

  return (
    <section>
      <div className="mb-6">
        <SectionTag content={'Khám phá'} />
      </div>
      <h2 className="text-4xl font-semibold tracking-[1.44px]">
        Sản phẩm của chúng tôi
      </h2>
      <div className="my-[60px]">
        <div className="grid grid-cols-12 gap-16">
          {isLoading &&
            [...Array(8)].map(() => {
              return (
                <div className="col-span-3" key={uuidv4()}>
                  <Skeleton />
                </div>
              );
            })}
          {!isLoading &&
            productsList.map((product, index) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay={`${100 * (index % 4)}`}
                  className="col-span-3"
                  key={uuidv4()}
                >
                  <ProductItem product={product} />
                </div>
              );
            })}
        </div>
      </div>
      <button className="mx-auto flex w-fit justify-center">
        <Link
          to="/products/all_products"
          className="mx-auto rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-10 py-2 font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]"
        >
          Xem tất cả sản phẩm
        </Link>
      </button>
    </section>
  );
}

export default ExploreProductSection;
