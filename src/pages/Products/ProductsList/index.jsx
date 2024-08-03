import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import FiltersAside from './components/AsideBar';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';
import FilterViewer from './components/Viewer';
import ProductItem from '~/components/ProductItem';
import ProductImage from '~/assets/images/product01.png';
import productApi from '~/apis/productApi';
import { Pagination } from '@mui/material';
import { formatPrice } from '~/utils/formatPrice';
import { fakeProductsList } from '~/data/dataProduct';

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
  const [loading, setLoading] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 16,
    total: 10,
  });

  useEffect(() => {
    setLoading(true);
    (async () => {
      // const { products } = await productApi.getAll();
      // setProductsList(products);
      setProductsList(fakeProductsList);
      console.log(fakeProductsList);

      setPagination((prev) => ({ ...prev, total: fakeProductsList.length }));
    })();
    setLoading(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // const { data } = await productApi.getAll(queryParams);
        // setProductsList(data);
        // window.scrollTo(0, 0);
        // const response = await productApi.getAll(queryParams);
        // console.log(response);
        //  setProductsList(productsList)
        // console.log(fakeProductsList);
      } catch (error) {
        console.log('Error: ', error);
      }
    })();
  }, [queryParams]);

  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`/products/${type}?${queryString.stringify(filters)}`);
    window.scrollTo(0, 0);
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
      <div className="max-w-ful mx-auto grid grid-cols-10 gap-10 px-5 xl:max-w-[1400px] xl:px-0">
        <aside className="col-span-2 h-fit rounded bg-white">
          <FiltersAside onFilter={handleFiltersChange} />
        </aside>
        <div className="col-span-8">
          <div className="mb-4">
            <FilterViewer
              _filters={queryParams}
              onChange={handleFiltersChange}
            />
          </div>
          <section className="grid grid-cols-12 gap-4">
            {productsList
              .slice(
                pagination.limit * (pagination.page - 1),
                pagination.limit * pagination.page,
              )
              .map((product, index) => {
                return (
                  <div
                    className="col-span-3 rounded bg-white p-2"
                    key={product.id}
                  >
                    <ProductItem product={product} />
                  </div>
                );
              })}
          </section>
          <div className="m-10 flex justify-center">
            <Pagination
              count={Math.ceil(pagination.total / pagination.limit)}
              page={pagination.page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductsList;
