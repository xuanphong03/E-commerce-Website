import SectionTag from '~/components/SectionTag';
import { PiHeadphonesLight } from 'react-icons/pi';
import {
  IoPhonePortraitOutline,
  IoWatchOutline,
  IoCameraOutline,
} from 'react-icons/io5';
import { RiComputerLine } from 'react-icons/ri';
import { LuGamepad2 } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CATEGORIES = [
  {
    id: 1,
    name: 'Phones',
    icon: <IoPhonePortraitOutline />,
  },
  {
    id: 2,
    name: 'Computer',
    icon: <RiComputerLine />,
  },
  {
    id: 3,
    name: 'SmartWatch',
    icon: <IoWatchOutline />,
  },
  {
    id: 4,
    name: 'Camera',
    icon: <IoCameraOutline />,
  },
  {
    id: 5,
    name: 'HeadPhones',
    icon: <PiHeadphonesLight />,
  },
  {
    id: 6,
    name: 'Gaming',
    icon: <LuGamepad2 />,
  },
];

export default function BrowseByCategorySection() {
  const { t } = useTranslation('home');

  return (
    <section className="border-b border-solid border-[#b2b2b2] pb-[70px] pt-[80px]">
      <div className="mb-6">
        <SectionTag content={t('Subtitle Browse By Category')} />
      </div>
      <div className="mb-10 flex items-end gap-20">
        <h2 className="font-inter text-4xl font-semibold tracking-[1.44px]">
          {t('Title Browse By Category')}
        </h2>
      </div>
      <ul className="grid grid-cols-12 gap-[30px]">
        {CATEGORIES.map((category) => {
          return (
            <li
              className="border-[rgba(0, 0, 0, 0.30)] col-span-2 cursor-pointer rounded border border-solid px-9 py-6 transition-colors hover:bg-[#DB4444] hover:text-[#FAFAFA]"
              key={category.id}
            >
              <Link
                className="flex flex-col items-center gap-4"
                to={`/products/${category.name.toLocaleLowerCase()}`}
              >
                <span className="text-5xl">{category.icon}</span>
                <p>{category.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
