import { useTranslation } from 'react-i18next';
import AboutBackground from '~/assets/images/about-bg.png';

function Introduce() {
  const { t } = useTranslation('about');

  return (
    <section className="flex items-center">
      <article className="max-w-[50%] basis-1/2">
        <h2 className="mb-10 text-justify font-inter text-[54px] font-semibold leading-[64px] tracking-[3.24px]">
          {t('Heading')}
        </h2>
        <div className="flex max-w-[80%] flex-col gap-6">
          <p className="leading-[162.5%]">{t('Story Part 1')}</p>
          <p className="leading-[162.5%]">{t('Story Part 2')}</p>
        </div>
      </article>
      <div className="max-w-[50%] basis-1/2">
        <img alt="about background" src={AboutBackground} className="w-full" />
      </div>
    </section>
  );
}

export default Introduce;
