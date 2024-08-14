import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import ContactInput from '../input-controls/ContactInput';
import ContactMessage from '../input-controls/ContactMessage';
import { useEffect } from 'react';
import { regex } from '~/constants/regex';

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ContactForm({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Vui lòng nhập họ và tên')
      .test(
        'Họ và tên phải có ít nhất 2 từ',
        'Họ và tên phải chứa ít nhất 2 từ.',
        (value) => {
          return value.trim().split(' ').length >= 1;
        },
      ),
    email: yup
      .string()
      .required('Vui lòng nhập email.')
      .email('Vui lòng nhập email hợp lệ.'),
    phone: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(regex.phoneNumber, 'Số điện thoại không hợp lệ'),
    question: yup.string().required('Vui lòng nhập tin nhắn'),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const formSubmit = async (data) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="mb-8 flex justify-between">
        <div className="max-w-[32%] basis-[32%]">
          <ContactInput
            id="fullName-contact"
            label={'Họ và tên'}
            register={{ ...register('name') }}
            errorMessage={errors.name?.message}
            isRequired
          />
        </div>
        <div className="max-w-[32%] basis-[32%]">
          <ContactInput
            id="email-contact"
            label={'Email'}
            register={{ ...register('email') }}
            errorMessage={errors.email?.message}
            isRequired
          />
        </div>
        <div className="max-w-[32%] basis-[32%]">
          <ContactInput
            id="phoneNumber-contact"
            label={'Số điện thoại'}
            register={{ ...register('phone') }}
            errorMessage={errors.phone?.message}
            isRequired
          />
        </div>
      </div>
      <div className="mb-8 max-w-full basis-full">
        <ContactMessage
          id="message-contact"
          label={'Tin nhắn'}
          register={{ ...register('question') }}
          errorMessage={errors.question?.message}
        />
      </div>
      <div className="flex justify-end">
        <button
          className={`${isSubmitting ? 'cursor-not-allowed bg-[#db444499]' : 'cursor-pointer bg-[#DB4444]'} rounded px-8 py-3 font-medium text-[#FAFAFA] hover:bg-[#db444499]`}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <FaSpinner className="animate-spin" />
              Loading...
            </span>
          ) : (
            'Gửi tin nhắn'
          )}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
