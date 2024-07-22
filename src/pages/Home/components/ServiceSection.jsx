import { useTranslation } from 'react-i18next';
import { FaArrowUp } from 'react-icons/fa';

import ServiceIcon01 from '~/assets/images/service01.png';
import ServiceIcon02 from '~/assets/images/service02.png';
import ServiceIcon03 from '~/assets/images/service03.png';

ServiceSection.propTypes = {};

function ServiceSection() {
  const { t } = useTranslation();

  const handleScrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <section className="relative mx-auto flex w-full items-start justify-center pb-[140px]">
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon01} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            {t('Heading FREE AND FAST DELIVERY Service')}
          </h2>
          <p className="text-center font-poppins text-sm">
            {t('Description FREE AND FAST DELIVERY Service')}
          </p>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon02} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            {t('Heading 24/7 CUSTOMER SERVICE Service')}
          </h2>
          <p className="text-center font-poppins text-sm">
            {t('Description 24/7 CUSTOMER SERVICE Service')}
          </p>
        </div>
      </div>
      <div className="flex basis-1/3 flex-col items-center justify-center gap-6">
        <div className="h-20 w-20">
          <img className="max-w-full" alt="service image" src={ServiceIcon03} />
        </div>
        <div>
          <h2 className="mb-2 text-center font-poppins text-xl font-semibold uppercase text-black">
            {t('Heading MONEY BACK GUARANTEE Service')}
          </h2>
          <p className="text-center font-poppins text-sm">
            {t('Description MONEY BACK GUARANTEE Service')}
          </p>
        </div>
      </div>
      <button
        onClick={handleScrollTop}
        className="absolute bottom-10 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] transition-colors hover:bg-[#ccc]"
      >
        <FaArrowUp />
      </button>
    </section>
  );
}

export default ServiceSection;
