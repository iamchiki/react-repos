import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";

import { PaginationComponent } from "../pagination/PaginationComponent";
import {
  tableRowStyle,
  TABLE_CELL_STYLE,
  TABLE_CONTAINER_STYLE,
  TABLE_FOOTER_STYLE,
  TABLE_STYLE,
} from "./styles";
import { RepoTyp } from "../../utils/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// table headings
const HEADING_ARR = [{ title: "Name" }, { title: "Forks" }, { title: "Stars" }];

const TableComponent: React.FC<{
  repos: {
    repo: RepoTyp;
  }[];
  onPageChange: (pageDirection: string) => void;
  onChangeLimit: (pageLimit: number) => void;
  repositoryCount: number;
}> = (props) => {
  const { repos, onPageChange, onChangeLimit, repositoryCount } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const repoArr = repos;

  const emptyRows: number =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - repos.length) : 0;

  // handler funtion when page is changed
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    if (newPage > page) {
      onPageChange("next");
    } else if (newPage < page) {
      onPageChange("prev");
    }
  };

  // handler function when no. of rows per page is changed
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    onChangeLimit(parseInt(event.target.value, 10));
  };

  return (
    <TableContainer
      sx={TABLE_CONTAINER_STYLE}
      component={Paper}
      data-testid="tableComponent">
      <Table stickyHeader sx={TABLE_STYLE} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {HEADING_ARR.map((header) => {
              return (
                <StyledTableCell key={header.title}>
                  {header.title}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {repoArr.map(({ repo }) => {
            const cellArr = [
              { title: repo.name, url: repo.url },
              { title: repo.forkCount },
              { title: repo.stargazerCount },
            ];
            return (
              <TableRow key={repo.name}>
                {cellArr.map((cellItem, index) => {
                  return index === 0 ? (
                    <TableCell
                      component="th"
                      scope="row"
                      style={TABLE_CELL_STYLE}
                      key={cellItem.title}>
                      <Link href={cellItem.url}>{cellItem.title}</Link>
                    </TableCell>
                  ) : (
                    <TableCell style={TABLE_CELL_STYLE} key={cellItem.title}>
                      {cellItem.title}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow style={tableRowStyle(emptyRows)}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter sx={TABLE_FOOTER_STYLE}>
          <TableRow>
            <PaginationComponent
              count={repositoryCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
