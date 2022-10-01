import React, { Component } from "react";
import propTypes from "prop-types";
import _ from "lodash";
class Page extends React.Component {
  render() {
    const { moviesCount, pageSize, currentPage, onPageClick } = this.props;
    const pageNumber = Math.ceil(moviesCount / pageSize); // smallest integer greater or equal to
    const pages = _.range(1, pageNumber + 1);
    return (
      <div>
        <nav aria-label="...">
          <ul className="pagination">
            {pages.map((page) => {
              return (
                <li
                  key={page}
                  className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                >
                  <a
                    onClick={() => onPageClick(page)}
                    className="page-link"
                    href="#"
                  >
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

Page.propTypes = {
  moviesCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageClick: propTypes.func.isRequired,
};

export default Page;
