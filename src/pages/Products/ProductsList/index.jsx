import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { FiFilter } from 'react-icons/fi';
import queryString from 'query-string';
import productApi from '~/apis/productApi';
import ProductItem from '~/components/ProductItem';
import FilterByPrice from './components/FilterByPrice';
import FilterByColor from './components/FilterByColor';
import FilterBySize from './components/FilterBySize';
import FilterBySort from './components/FilterBySort';
import ProductSkeletonItem from '~/components/ProductSkeletonItem';

ProductsList.propTypes = {};

function ProductsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category } = useParams();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 20,
      _sort: params._sort || 'ASC',
      isPromotion: params.isPromotion === 'true',
      isReleased: params.isReleased === 'true',
    };
  }, [location.search]);

  const [productsList, setProductsList] = useState([]);
  const [loading, setLoading] = useState(null);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 10,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
    setLoading(true);
    (async () => {
      const { data } = await productApi.getAll(queryParams);
      setProductsList(data);
      setPagination((prev) => ({ ...prev, total: data.length }));
    })();
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // const { data } = await productApi.getAll(queryParams);
        // setProductsList(data);
        // const response = await productApi.getAll(queryParams);
        // console.log(response);
        //  setProductsList(productsList)
        // console.log(fakeProductsList);
      } catch (error) {
        // console.log('Error: ', error);
      }
    })();
  }, [queryParams]);

  const handlePageChange = (event, page) => {
    const filters = {
      ...queryParams,
      _page: page,
    };
    setPagination((prev) => ({ ...prev, page }));
    navigate(`/products/${category}?${queryString.stringify(filters)}`);
    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = {
      ...queryParams,
      ...newFilters,
    };
    navigate(`/products/${category}?${queryString.stringify(filters)}`);
  };

  return (
    <main className="pb-20 pt-5">
      <div className="mx-auto max-w-[1300px] gap-10">
        <div className="flex items-center gap-8 pb-5">
          <h3 className="flex items-center gap-2 font-medium uppercase">
            <span>
              <FiFilter />
            </span>
            Bộ lọc
          </h3>
          <FilterBySort onChange={handleFiltersChange} />
          <FilterByPrice onChange={handleFiltersChange} />
          <FilterByColor onChange={handleFiltersChange} />
          <FilterBySize onChange={handleFiltersChange} />
        </div>

        <div className="mt-5">
          <section className="grid grid-cols-10 gap-10">
            {loading &&
              [...Array(20)].map((_, index) => {
                return (
                  <div className="col-span-2 rounded bg-white" key={index}>
                    <ProductSkeletonItem />
                  </div>
                );
              })}
            {!loading &&
              productsList
                .slice(
                  pagination.limit * (pagination.page - 1),
                  pagination.limit * pagination.page,
                )
                .map((product) => {
                  return (
                    <div
                      className="col-span-2 rounded bg-white"
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
