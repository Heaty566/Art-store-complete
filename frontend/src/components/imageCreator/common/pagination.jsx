import React from "react";
import _ from "lodash";

const Pagination = ({ length, currentPage, pageSize, onClick }) => {
  const pages = Math.ceil(length / pageSize);

  let range;
  if (pages < 5) {
    range = _.range(0, pages);
  } else {
    if (currentPage < 3) {
      range = _.range(0, 5);
    } else if (currentPage >= pages - 2) {
      range = _.range(pages - 5, pages);
    } else {
      range = _.range(currentPage - 2, currentPage + 3);
    }
  }

  if (pages < 2) return null;
  return (
    <div className="pagination__container">
      <span
        key="first"
        onClick={() => onClick(0)}
        className="pagination__arrow"
      >
        1
      </span>
      {range.map((item, index) => (
        <span
          key={item}
          onClick={() => onClick(item)}
          className={currentPage === item ? "page-active" : null}
        >
          {item + 1}
        </span>
      ))}

      <span
        key="last"
        onClick={() => onClick(pages - 1)}
        className="pagination__arrow"
      >
        {pages}
      </span>
    </div>
  );
};

export default Pagination;
