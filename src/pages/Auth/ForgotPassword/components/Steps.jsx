import React from 'react';
import PropTypes from 'prop-types';

Steps.propTypes = {};

function Steps({ steps, currentStep }) {
  console.log(currentStep);

  return (
    <div className="flex items-center">
      {steps.map(({ id, name }, index) => {
        return (
          <div key={id} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={`flex size-6 items-center justify-center rounded-full text-sm ${currentStep > index ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </span>
              {name}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-[2px] w-10 ${currentStep > index + 1 ? 'bg-blue-500' : 'bg-gray-300'}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
