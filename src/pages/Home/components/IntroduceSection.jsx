import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Banner01 from '~/assets/images/banner01.jpg';
import Banner02 from '~/assets/images/banner02.jpg';
import Banner03 from '~/assets/images/banner03.jpg';
import Banner04 from '~/assets/images/banner04.jpg';
import Banner05 from '~/assets/images/banner05.jpg';
const MENU = [
  {
    id: 1,
    path: 'phones',
    name: 'Điện thoại',
  },
  {
    id: 2,
    path: 'computers',
    name: 'Máy tính',
  },
  {
    id: 3,
    path: 'smartwatch',
    name: 'Đồng hồ thông minh',
  },
  {
    id: 4,
    path: 'camera',
    name: 'Máy ảnh',
  },
  {
    id: 5,
    path: 'headphones',
    name: 'Tai nghe',
  },
  {
    id: 6,
    path: 'gaming',
    name: 'Máy điện tử',
  },
];

export default function IntroduceSection() {
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
          {MENU.map((menuItem) => (
            <li
              key={menuItem.id}
              className="mb-4 font-poppins hover:text-[#DB4444]"
            >
              <Link to={`/products?category=${menuItem.path}`}>
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
