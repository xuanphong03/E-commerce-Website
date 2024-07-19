import { FiPhone } from 'react-icons/fi';
import { FiMail } from 'react-icons/fi';
import ContactForm from './ContactForm';

export default function ContactPage() {
  const handleSubmitContactForm = (data) => {
    // handle submit form data to backend
  };
  return (
    <main className="mx-auto max-w-[1300px]">
      <section className="grid grid-cols-12 gap-10 pb-32 pt-20">
        <div className="shadow-form col-span-4 px-9 py-10">
          <article>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
                <FiPhone />
              </span>
              <h2 className="text-lg font-medium capitalize text-black">
                Gọi cho chúng tôi
              </h2>
            </div>
            <div className="mt-6 flex flex-col gap-4 text-base text-black">
              <p>
                Chúng tôi luôn sẵn sàng 24/7, <br></br>7 ngày một tuần.
              </p>
              <p>Số điện thoại: +84 0865783359</p>
            </div>
          </article>
          <hr className="my-8 bg-black"></hr>
          <article>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DB4444] text-2xl text-white">
                <FiMail />
              </span>
              <h2 className="text-lg font-medium capitalize text-black">
                Viết thư cho chúng tôi
              </h2>
            </div>
            <div className="mt-6 flex flex-col gap-4 text-base text-black">
              <p>
                Điền vào biểu mẫu của chúng tôi và chúng tôi sẽ liên hệ với bạn
                trong vòng 24 giờ.
              </p>
              <p>Emails: xphong.fullstack03@gmail.com</p>
              <p>Emails: dan@gmail.com</p>
            </div>
          </article>
        </div>
        <div className="shadow-form col-span-8 px-8 py-10">
          <ContactForm onSubmit={handleSubmitContactForm} />
        </div>
      </section>
    </main>
  );
}
