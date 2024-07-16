import SectionTag from '~/components/SectionTag';

import { Link } from 'react-router-dom';
import Perfume from '~/assets/images/perfume.png';
import PlayStation from '~/assets/images/playStation.png';
import Speakers from '~/assets/images/speaker.png';
import WomenCollection from '~/assets/images/women.png';

FeaturedSection.propTypes = {};

function FeaturedSection() {
  return (
    <section className="my-[140px]">
      <div className="mb-6">
        <SectionTag content="Đặc sắc  " />
      </div>
      <h2 className="font-inter text-4xl font-semibold tracking-[1.44px]">
        Hàng mới về
      </h2>
      <div className="mt-[60px] flex h-[600px] w-full gap-8">
        <div className="relative basis-1/2 bg-black">
          <img
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            alt="background"
            src={PlayStation}
          />
          <div className="absolute bottom-8 left-8 text-[#FAFAFA]">
            <h3 className="font-inter text-2xl font-semibold leading-none tracking-[0.72px]">
              PlayStation 5
            </h3>
            <p className="my-4 font-poppins text-sm font-normal">
              Phiên bản đen trắng của PS5 <br></br> sắp được bán.
            </p>
            <Link
              to="/"
              className="font-poppins text-base font-medium capitalize text-[#FFFFFF] underline"
            >
              Shop now
            </Link>
          </div>
        </div>
        <div className="flex basis-1/2 flex-col gap-8">
          <div className="relative h-1/2 bg-black">
            <img
              className="absolute right-0"
              alt="background"
              src={WomenCollection}
            />
            <div className="absolute bottom-6 left-6 text-[#FAFAFA]">
              <h3 className="font-inter text-2xl font-semibold leading-none tracking-[0.72px]">
                Women’s Collections
              </h3>
              <p className="my-4 font-poppins text-sm font-normal">
                Các bộ sưu tập dành cho phụ nữ nổi bật <br></br> mang đến cho
                bạn cảm giác khác.
              </p>
              <Link
                to="/"
                className="font-poppins text-base font-medium capitalize text-[#FFFFFF] underline"
              >
                Shop now
              </Link>
            </div>
          </div>
          <div className="flex h-1/2 gap-8">
            <div className="relative basis-1/2 bg-black">
              <img
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                alt="background"
                src={Speakers}
              />
              <div className="absolute bottom-6 left-6 text-[#FAFAFA]">
                <h3 className="font-inter text-2xl font-semibold leading-none tracking-[0.72px]">
                  Loa
                </h3>
                <p className="my-2 font-poppins text-sm font-normal">
                  Loa không dây Amazon
                </p>
                <Link
                  to="/"
                  className="font-poppins text-base font-medium capitalize text-[#FFFFFF] underline"
                >
                  Shop now
                </Link>
              </div>
            </div>
            <div className="relative basis-1/2 bg-black">
              <img
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                alt="background"
                src={Perfume}
              />
              <div className="absolute bottom-6 left-6 text-[#FAFAFA]">
                <h3 className="font-inter text-2xl font-semibold leading-none tracking-[0.72px]">
                  Nước hoa
                </h3>
                <p className="my-2 font-poppins text-sm font-normal">
                  GUCCI INTENSE OUD EDP
                </p>
                <Link
                  to="/"
                  className="font-poppins text-base font-medium capitalize text-[#FFFFFF] underline"
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;
