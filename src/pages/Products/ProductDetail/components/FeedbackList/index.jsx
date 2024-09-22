import { Rating } from '@mui/material';
import PropTypes from 'prop-types';
import { MdOutlineFeedback } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';
import SectionTag from '~/components/SectionTag';

FeedbackList.propTypes = {
  feedbacksList: PropTypes.array,
};

function FeedbackList({ feedbacksList = [] }) {
  return (
    <>
      <div className="mb-10">
        <SectionTag content="Feedback của khách hàng" />
      </div>
      <ul className="customizedScrollbar flex h-56 gap-10 overflow-x-auto scroll-smooth rounded-lg bg-[#f5f5f5] px-4 py-5">
        {feedbacksList.length > 0 ? (
          feedbacksList.map(
            ({ imageUser, identification_user, content, rating }) => {
              const uniqueKey = uuidv4();
              return (
                <li key={uniqueKey}>
                  <article className="">
                    <div className="flex gap-4">
                      <div className="flex size-14 items-center justify-center rounded-full border-2 border-solid border-black text-3xl font-semibold">
                        {/* {imageUser} */}
                        <img
                          src={imageUser}
                          alt="Selected Image"
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="mb-2">{identification_user}</h3>
                        <div className="text-sm">
                          <Rating
                            size="small"
                            name="read-only"
                            value={rating}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                    <p className="mt-5 line-clamp-[5] w-[300px] overflow-hidden rounded-md bg-[#2c2c2c] px-2 py-1 text-xs text-[#fafafa]">
                      {content}
                    </p>
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
