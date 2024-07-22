import { useTranslation } from 'react-i18next';
import { FiMail } from 'react-icons/fi';

function ContactByEmail() {
  const { t } = useTranslation('contact');
  return (
    <article className="font-poppins">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
          <FiMail />
        </span>
        <h2 className="text-lg font-medium capitalize text-black">
          {t('Heading Write To US')}
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-4 text-base text-black">
        <p>{t('Description Write To US')}</p>
        <p>Emails: xphong.fullstack03@gmail.com</p>
        <p>Emails: dan@gmail.com</p>
      </div>
    </article>
  );
}

export default ContactByEmail;
