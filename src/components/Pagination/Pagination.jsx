import React from "react";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";

import styles from "./Pagination.module.scss";

export const Pagination = ({onChangePage}) => {
const {currentPage} = useSelector((state) => state.filter);

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={3}
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
};
