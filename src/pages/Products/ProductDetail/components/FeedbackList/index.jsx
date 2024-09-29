import { Rating } from '@mui/material';
import moment from 'moment';
import 'moment/locale/vi';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SectionTag from '~/components/SectionTag';

FeedbackList.propTypes = {
  feedbacksList: PropTypes.array,
};

function FeedbackList({ feedbacksList = [] }) {
  return (
    <Fragment>
      <div>
        <SectionTag content={`Khách hàng đánh giá (${feedbacksList.length})`} />
      </div>
      <hr className="my-5"></hr>
      {!feedbacksList.length ? (
        <p className="text-center text-sm">Sản phẩm chưa có đánh giá</p>
      ) : (
        <ul>
          {feedbacksList.map(
            ({
              identification_user,
              content,
              rating,
              createDate,
              size,
              color,
            }) => {
              return (
                <li
                  key={uuidv4()}
                  className="flex gap-2 border-b border-solid border-gray-200 py-5"
                >
                  <div className="w-60">
                    <h4 className="font-bold uppercase">
                      {identification_user}
                    </h4>
                    <div className="mt-1">
                      <h5 className="text-sm text-gray-500">
                        {moment(createDate).format('DD-MM-YYYY HH:mm:ss')}
                      </h5>
                      <p className="text-sm text-gray-500">
                        {color} / {size}
                      </p>
                    </div>
                  </div>
                  <div className="w-60">
                    <div>
                      <Rating
                        size="small"
                        name="read-only"
                        value={rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>
                    <p className="text-sm">
                      <b>Đánh giá: </b> {content}
                    </p>
                  </div>
                </li>
              );
            },
          )}
        </ul>
      )}
    </Fragment>
  );
}

export default FeedbackList;
