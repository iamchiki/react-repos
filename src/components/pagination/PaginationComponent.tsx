import { TablePagination } from "@mui/material";

import React from "react";
import { PaginationOptionType } from "../../utils/types";
import TablePaginationActions from "./TablePaginationActions";

// different values to show no. of rows in table
const ROWS_PER_PAGE_ARR = [5, 10, 25, { label: "All", value: -1 }];
const SELECT_PROPS = {
  inputProps: {
    "aria-label": "rows per page",
  },
  native: true,
};

export const PaginationComponent: React.FC<PaginationOptionType> = (props) => {
  const { count, rowsPerPage, page, onPageChange, onRowsPerPageChange } = props;
  return (
    <TablePagination
      rowsPerPageOptions={ROWS_PER_PAGE_ARR}
      colSpan={3}
      // count={count}
      count={226213}
      rowsPerPage={rowsPerPage}
      page={page}
      SelectProps={SELECT_PROPS}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      ActionsComponent={TablePaginationActions}
      data-testid="paginationComponent"
    />
  );
};
