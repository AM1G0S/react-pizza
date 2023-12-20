import React from "react";
import ReactPaginate from "react-paginate";
import {useSelector} from "react-redux";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({onChangePage}) => {
// @ts-ignore
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
