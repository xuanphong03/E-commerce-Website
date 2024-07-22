import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import Introduce from './components/Introduce';
import Service from './components/Service';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation('about');
  const BREAD_CRUMBS = [
    {
      to: '/',
      name: `${t('Breadcrumbs Home')}`,
    },
    {
      to: '/about',
      name: `${t('Breadcrumbs About')}`,
    },
  ];
  return (
    <main className="pb-[140px] pt-10">
      <div className="mx-auto max-w-[1300px]">
        <Breadcrumbs pathList={BREAD_CRUMBS} />
      </div>
      <div className="mt-10 2xl:ml-[calc((100%-1300px)/2)]">
        <Introduce />
      </div>
      <div className="mx-auto mt-20 max-w-[1300px]">
        <Service />
      </div>
    </main>
  );
}
