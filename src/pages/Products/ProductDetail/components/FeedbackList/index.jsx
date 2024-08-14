import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SectionTag from '~/components/SectionTag';
import { MdOutlineFeedback } from 'react-icons/md';
import { Rating } from '@mui/material';

FeedbackList.propTypes = {};

function FeedbackList(props) {
  const [feedbacksList, setFeedbacksList] = useState([]);

  return (
    <>
      <div className="mb-10">
        <SectionTag content="Feedback của khách hàng" />
      </div>
      <ul className="customizedScrollbar flex h-56 gap-10 overflow-x-auto scroll-smooth rounded-lg bg-[#f5f5f5] px-4 py-5">
        {feedbacksList.length > 0 ? (
          feedbacksList.map((_, index) => (
            <li key={index}>
              <article className="">
                <div className="flex gap-4">
                  <div className="size-14 overflow-hidden rounded-full">
                    <img
                      className="max-h-full max-w-full object-cover"
                      alt="avatar"
                      src="https://i.pinimg.com/736x/f2/a8/be/f2a8bef42b2608a394cb86c2637d78fc.jpg"
                    />
                  </div>
                  <div>
                    <h3 className="mb-2">Nguyễn Xuân Phong</h3>
                    <div className="text-sm">
                      <Rating
                        name="read-only"
                        value={0}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <p className="mt-5 line-clamp-[5] w-[300px] overflow-hidden rounded-md bg-[#2c2c2c] px-2 py-1 text-xs text-[#fafafa]">
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before the final copy
                  is available. document or a typeface without relying on
                </p>
              </article>
            </li>
          ))
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
