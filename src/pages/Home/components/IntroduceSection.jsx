// import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import Banner01 from '~/assets/images/banner01.jpg';
// import Banner02 from '~/assets/images/banner02.jpg';
// import Banner03 from '~/assets/images/banner03.jpg';
// import Banner04 from '~/assets/images/banner04.jpg';
// import Banner05 from '~/assets/images/banner05.jpg';
import Banner01 from '~/assets/banners/banner01.jpg';
import Banner02 from '~/assets/banners/banner02.jpg';
import Banner03 from '~/assets/banners/banner03.jpg';
import Banner04 from '~/assets/banners/banner04.webp';
import Banner05 from '~/assets/banners/banner05.webp';
// import { useTranslation } from 'react-i18next';
// import { useEffect, useMemo, useState } from 'react';
// import queryString from 'query-string';

export default function IntroduceSection() {
  // const { t } = useTranslation('home');
  // const location = useLocation();
  // const queryParams = useMemo(() => {
  //   const params = queryString.parse(location.search);
  //   return {
  //     ...params,
  //     _page: Number.parseInt(params._page) || 1,
  //     _limit: Number.parseInt(params._limit) || 16,
  //     _sort: params._sort || 'ASC',
  //     isPromotion: params.isPromotion === 'true',
  //     isReleased: params.isReleased === 'true',
  //   };
  // }, [location.search]);
  // const [categoriesList, setCategoriesList] = useState([]);
  // useEffect(() => {
  //   try {
  //     // const response =
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }, []);
  // const MENU = [
  //   {
  //     path: 'phones',
  //     name: `${t('Aside Category Phones')}`,
  //   },
  //   {
  //     path: 'computers',
  //     name: `${t('Aside Category Computers')}`,
  //   },
  //   {
  //     path: 'smartwatch',
  //     name: `${t('Aside Category Smart Watch')}`,
  //   },
  //   {
  //     path: 'camera',
  //     name: `${t('Aside Category Camera')}`,
  //   },
  //   {
  //     path: 'headphones',
  //     name: `${t('Aside Category Headphones')}`,
  //   },
  //   {
  //     path: 'gaming',
  //     name: `${t('Aside Category Electronic Machine')}`,
  //   },
  //   {
  //     path: 'men-fashion',
  //     name: `${t("Aside Category Men's Fashion")}`,
  //   },
  //   {
  //     path: 'women-fashion',
  //     name: `${t("Aside Category Women's Fashion")}`,
  //   },
  //   {
  //     path: 'perfume',
  //     name: `${t('Aside Category Perfume')}`,
  //   },
  //   {
  //     path: 'footwear',
  //     name: `${t('Aside Category Footwear')}`,
  //   },
  // ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };

  return (
    <section className="w-full overflow-x-hidden">
      <div className="slider-container ml-auto">
        <Slider {...settings}>
          <img alt="banner" src={Banner01} className="h-[600px] w-full" />
          <img alt="banner" src={Banner02} className="h-[600px] w-full" />
          <img alt="banner" src={Banner03} className="h-[600px] w-full" />
          <img alt="banner" src={Banner04} className="h-[600px] w-full" />
          <img alt="banner" src={Banner05} className="h-[600px] w-full" />
        </Slider>
      </div>
    </section>
  );
}
