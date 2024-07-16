import PropTypes from 'prop-types';

HeaderTable.propTypes = {
  thead: PropTypes.array.isRequired,
};

function HeaderTable({ thead }) {
  return (
    <div className="shadow-table flex justify-between px-10 py-6 font-poppins text-black">
      {thead.map((th, index) => (
        <h3
          key={index}
          className={`max-w-[25%] basis-1/4 ${index !== 0 ? 'text-center' : 'text-start'}`}
        >
          {th}
        </h3>
      ))}
    </div>
  );
}

export default HeaderTable;
