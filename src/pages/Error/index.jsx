import { Link } from 'react-router-dom';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';

export default function ErrorPage() {
  const paths = [
    {
      id: 1,
      to: '/',
      name: 'Home',
    },
    {
      id: 2,
      to: '/error',
      name: '404 Error',
    },
  ];

  return (
    <main className="bg-white pb-40 pt-10">
      <div className="mx-auto max-w-[1300px]">
        <div className="mb-[140px]">
          <Breadcrumbs pathList={paths} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mb-10 font-inter text-[110px] font-medium leading-[115px] tracking-[3.3px]">
            404 Not Found
          </h1>
          <p className="mb-20 font-poppins">
            Không tìm thấy trang bạn đã truy cập. Bạn có thể vào trang chủ
          </p>
          <Link to="/">
            <button className="flex items-center justify-center rounded bg-[#DB4444] px-12 py-4 text-[#FAFAFA]">
              Quay về trang chủ
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
