import { useTranslation } from 'react-i18next';
import { FiPhone } from 'react-icons/fi';

function ContactByPhone() {
  const { t } = useTranslation('contact');
  return (
    <article className="">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
          <FiPhone />
        </span>
        <h2 className="text-lg font-medium capitalize text-black">
          {t('Heading Call To Us')}
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-base text-black">
        <p>{t('Description Call To Us')}</p>
        <p>{t('Phone Number Call To Us')}</p>
      </div>
    </article>
  );
}

export default ContactByPhone;
