import ContactForm from './components/ContactForm/';
import ContactByPhone from './components/ContactInfo/ContactByPhone';
import ContactByEmail from './components/ContactInfo/ContactByEmail';
import questionGuest from '~/apis/questionGuest';
import { toast } from 'react-toastify';
export default function ContactPage() {
  // const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmitContactForm = async (data) => {
    try {
      await questionGuest.postQuestionGuest(data);
      toast.success(
        'Gửi yêu cầu thành công. Chúng tôi sẽ phản hồi lại trong vòng 24h',
      );

      // const res = await questionGuest.postQuestionGuest(data);
      // console.log(data);
      // console.log(res);
      // if (res.data.status === 200) {
      //   setFeedbackMessage(t('submissionSuccess'));
      // } else {
      //   setFeedbackMessage(t('submissionFail') + ': ' + res.data.message);
      // }
    } catch (error) {
      // setFeedbackMessage(t('submissionError'));
      toast.error('Gửi yêu cầu thất bại');
    }
  };
  return (
    <main className="mx-auto max-w-[1300px]">
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
