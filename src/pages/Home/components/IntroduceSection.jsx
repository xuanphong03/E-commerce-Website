// import { Link, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner01 from '~/assets/banners/banner01.webp';
import Banner02 from '~/assets/banners/banner02.webp';
import Banner03 from '~/assets/banners/banner03.webp';
import Banner04 from '~/assets/banners/banner04.webp';
import Banner05 from '~/assets/banners/banner05.webp';
import Banner06 from '~/assets/banners/banner06.webp';
import Banner07 from '~/assets/banners/banner07.webp';
import Banner08 from '~/assets/banners/banner08.webp';

export default function IntroduceSection() {
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
          <img alt="banner" src={Banner06} className="h-[600px] w-full" />
          <img alt="banner" src={Banner07} className="h-[600px] w-full" />
          <img alt="banner" src={Banner08} className="h-[600px] w-full" />
        </Slider>
      </div>
    </section>
  );
}
