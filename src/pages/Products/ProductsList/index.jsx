import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FiltersAside from './components/AsideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import FilterViewer from './components/Viewer';
import ProductItem from '~/components/ProductItem';
import ProductImage from '~/assets/images/product01.png';
import Pagination from './components/Pagination';
import productApi from '~/apis/productApi';

ProductsList.propTypes = {};

function ProductsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 16,
      _sort: params._sort || 'ASC',
      isPromotion: params.isPromotion === 'true',
      isReleased: params.isReleased === 'true',
    };
  }, [location.search]);

  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 16,
    total: 10,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data } = await productApi.getAll(queryParams);
  //       setProductsList(data);

  //       window.scrollTo(0, 0);
  //     } catch (error) {
  //       console.log('Error: ', error);
  //     }
  //   })();
  // }, [queryParams]);

  const handlePageChange = (page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`/products/${type}?${queryString.stringify(filters)}`);
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    window.scrollTo(0, 0);

    navigate(`/products/${type}?${queryString.stringify(filters)}`);
  };

  return (
    <main className="bg-[#F5F5F5] pb-20 pt-5">
      <div className="max-w-ful mx-auto grid grid-cols-12 gap-10 px-5 xl:max-w-[1400px] xl:px-0">
        <aside className="col-span-3 h-fit rounded bg-white">
          <FiltersAside onFilter={handleFiltersChange} />
        </aside>
        <div className="col-span-9">
          <div className="mb-5">
            <FilterViewer
              _filters={queryParams}
              onChange={handleFiltersChange}
            />
          </div>
          <section className="grid grid-cols-12 gap-4">
            {[...Array(16)].map((product, index) => {
              return (
                <div className="col-span-3 rounded bg-white p-2" key={index}>
                  <ProductItem
                    productId={index}
                    productImage={ProductImage}
                    productSalePercent={40}
                    productName="HAVIT HV-G92 GamepadHAVIT HV-G92 Gamepad"
                    productSalePrice={120}
                    productPrice={160}
                    productReviewRate={4.5}
                    productReviewNumber={88}
                    isNewProduct={true}
                  />
                </div>
              );
            })}
          </section>
          <div className="m-10 flex justify-center">
            <Pagination
              currentPage={pagination.page}
              totalPage={10}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductsList;
