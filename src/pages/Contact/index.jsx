import ContactForm from './components/ContactForm/';
import ContactByPhone from './components/ContactInfo/ContactByPhone';
import ContactByEmail from './components/ContactInfo/ContactByEmail';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation('contact');
  const BREAD_CRUMBS = [
    {
      to: '/',
      name: `${t('Breadcrumbs Home')}`,
    },
    {
      to: '/about',
      name: `${t('Breadcrumbs Contact')}`,
    },
  ];

  const handleSubmitContactForm = (data) => {
    // handle submit form data to backend
  };
  return (
    <main className="mx-auto max-w-[1300px]">
      <div className="mt-10">
        <Breadcrumbs pathList={BREAD_CRUMBS} />
      </div>
      <section className="grid grid-cols-12 gap-10 pb-32 pt-10">
        <div className="col-span-4 px-9 py-10 shadow-form">
          <ContactByPhone />
          <hr className="my-8 bg-black"></hr>
          <ContactByEmail />
        </div>
        <div className="col-span-8 px-8 py-10 shadow-form">
          <ContactForm onSubmit={handleSubmitContactForm} />
        </div>
      </section>
    </main>
  );
}
