import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner01 from '~/assets/images/banner01.jpg';
import Banner02 from '~/assets/images/banner02.jpg';
import Banner03 from '~/assets/images/banner03.jpg';
import Banner04 from '~/assets/images/banner04.jpg';
import Banner05 from '~/assets/images/banner05.jpg';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import queryString from 'query-string';

export default function IntroduceSection() {
  const { t } = useTranslation('home');
  const location = useLocation();
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

  const MENU = [
    {
      path: 'phones',
      name: `${t('Aside Category Phones')}`,
    },
    {
      path: 'computers',
      name: `${t('Aside Category Computers')}`,
    },
    {
      path: 'smartwatch',
      name: `${t('Aside Category Smart Watch')}`,
    },
    {
      path: 'camera',
      name: `${t('Aside Category Camera')}`,
    },
    {
      path: 'headphones',
      name: `${t('Aside Category Headphones')}`,
    },
    {
      path: 'gaming',
      name: `${t('Aside Category Electronic Machine')}`,
    },
    {
      path: 'men-fashion',
      name: `${t("Aside Category Men's Fashion")}`,
    },
    {
      path: 'women-fashion',
      name: `${t("Aside Category Women's Fashion")}`,
    },
    {
      path: 'perfume',
      name: `${t('Aside Category Perfume')}`,
    },
    {
      path: 'footwear',
      name: `${t('Aside Category Footwear')}`,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };

  return (
    <section className="grid grid-cols-12 pb-[140px]">
      <aside className="col-span-2 border-r border-solid border-[#D9D9D9] pr-4 pt-10">
        <ul>
          {MENU.map((menuItem, index) => (
            <li key={index} className="mb-4 font-poppins hover:text-[#DB4444]">
              <Link
                to={`/products/${menuItem.path}?${queryString.stringify(queryParams)}`}
              >
                {menuItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="col-span-10">
        <div className="slider-container ml-auto mt-10 w-[95%]">
          <Slider {...settings}>
            <img alt="banner" src={Banner01} className="h-[400px] w-full" />
            <img alt="banner" src={Banner02} className="h-[400px] w-full" />
            <img alt="banner" src={Banner03} className="h-[400px] w-full" />
            <img alt="banner" src={Banner04} className="h-[400px] w-full" />
            <img alt="banner" src={Banner05} className="h-[400px] w-full" />
          </Slider>
        </div>
      </div>
    </section>
  );
}
