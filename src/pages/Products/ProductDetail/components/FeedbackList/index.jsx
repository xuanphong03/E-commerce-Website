import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { MdOutlineFeedback } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import SectionTag from '~/components/SectionTag';

import moment from 'moment';
import 'moment/locale/vi';

FeedbackList.propTypes = {
  feedbacksList: PropTypes.array,
};

function FeedbackList({ feedbacksList = [] }) {
  const getFirstCharacterOfName = (fullName) => {
    const words = fullName.trim().split(' ');
    return words[words.length - 1][0];
  };
  return (
    <>
      <div className="mb-10">
        <SectionTag content="Feedback của khách hàng" />
      </div>
      <ul className="customizedScrollbar flex h-56 gap-10 overflow-x-auto scroll-smooth rounded-lg bg-[#f5f5f5] px-4 py-5">
        {feedbacksList.length > 0 ? (
          feedbacksList.map(
            ({ identification_user, content, rating, createDate }) => {
              const firstCharacter =
                getFirstCharacterOfName(identification_user);
              const uniqueKey = uuidv4();
              return (
                <li key={uniqueKey}>
                  <article className="">
                    <div className="flex gap-4">
                      <div className="flex size-14 items-center justify-center rounded-full bg-red-500 text-3xl font-semibold uppercase text-white">
                        {firstCharacter}
                      </div>
                      <div>
                        <h3 className="mb-2">{identification_user}</h3>
                        <div className="flex items-center gap-1 text-sm">
                          <Rating
                            size="small"
                            name="read-only"
                            value={rating}
                            precision={0.5}
                            readOnly
                          />
                          ({rating} sao)
                        </div>
                        <p></p>
                      </div>
                    </div>
                    <p className="mt-5 line-clamp-[5] w-[300px] overflow-hidden bg-white px-2 py-1 text-[#2c2c2c]">
                      {content}
                    </p>
                    <span className="mt-2 flex justify-end text-sm">
                      Đăng ngày: {moment(createDate).format('DD/MM/YYYY')}
                    </span>
                  </article>
                </li>
              );
            },
          )
        ) : (
          <div className="flex w-full items-center justify-center gap-2 text-xl text-[#2c2c2c]">
            <MdOutlineFeedback />
            <p className="text-">Chưa có Feedback !!!</p>
          </div>
        )}
      </ul>
    </>
  );
}

export default FeedbackList;
