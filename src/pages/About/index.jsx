import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import Introduce from './components/Introduce';
import Service from './components/Service';
const BREAD_CRUMBS = [
  {
    id: 1,
    to: '/',
    name: 'Trang chủ',
  },
  {
    id: 2,
    to: '/about',
    name: 'Giới thiệu',
  },
];
export default function AboutPage() {
  return (
    <main className="pb-[140px] pt-20">
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
