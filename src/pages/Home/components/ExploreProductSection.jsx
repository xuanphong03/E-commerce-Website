import ProductItem from '~/components/ProductItem';
import SectionTag from '~/components/SectionTag';
import { useEffect, useState } from 'react';
import { fakeProductsList } from '~/data/dataProduct';

ExploreProductSection.propTypes = {};

function ExploreProductSection() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    (async () => {
      setProductsList(fakeProductsList);
    })();
  }, []);

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
          {productsList.slice(0, 8).map((product, index) => {
            return (
              <div className="col-span-3" key={index}>
                <ProductItem product={product} />
              </div>
            );
          })}
        </div>
      </div>
      <button className="mx-auto flex items-center justify-center rounded border-2 border-solid border-[#DB4444] bg-[#DB4444] px-10 py-2 font-medium text-[#FAFAFA] transition-colors hover:bg-[#FAFAFA] hover:text-[#DB4444]">
        Xem tất cả sản phẩm
      </button>
    </section>
  );
}

export default ExploreProductSection;
