import ContactForm from './components/ContactForm/';
import ContactByPhone from './components/ContactInfo/ContactByPhone';
import ContactByEmail from './components/ContactInfo/ContactByEmail';
import Breadcrumbs from '~/components/Breadcrumbs/Breadcrumbs';
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
export default function ContactPage() {
  const handleSubmitContactForm = (data) => {
    // handle submit form data to backend
  };
  return (
    <main className="mx-auto max-w-[1300px]">
      <div className="mt-10">
        <Breadcrumbs pathList={BREAD_CRUMBS} />
      </div>
      <section className="grid grid-cols-12 gap-10 pb-32 pt-10">
        <div className="shadow-form col-span-4 px-9 py-10">
          <ContactByPhone />
          <hr className="my-8 bg-black"></hr>
          <ContactByEmail />
        </div>
        <div className="shadow-form col-span-8 px-8 py-10">
          <ContactForm onSubmit={handleSubmitContactForm} />
        </div>
      </section>
    </main>
  );
}
