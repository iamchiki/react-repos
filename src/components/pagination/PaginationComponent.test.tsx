import { render, screen } from "@testing-library/react";
import { PaginationComponent } from "./PaginationComponent";
import TablePaginationActions from "./TablePaginationActions";

describe("test Pagination Component", () => {
  it("should render Pagination Component", () => {
    render(
      <PaginationComponent
        count={50}
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}></PaginationComponent>
    );
    const paginationComponent = screen.getByTestId("paginationComponent");
    expect(paginationComponent).toBeTruthy();
  });

  it("should render TablePaginationActions", () => {
    render(
      <TablePaginationActions
        count={50}
        rowsPerPage={5}
        page={0}
        onPageChange={() => {}}></TablePaginationActions>
    );
    const tablePaginationActions = screen.getByTestId("tablePaginationActions");
    expect(tablePaginationActions).toBeTruthy();
  });
});
