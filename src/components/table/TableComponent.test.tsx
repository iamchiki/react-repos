import { render, screen } from "@testing-library/react";
import TableComponent from "./TableComponent";

const repos = [
  {
    repo: {
      name: "freeCodeCamp",
      forkCount: 29208,
      stargazerCount: 351321,
      url: "https://github.com/freeCodeCamp/freeCodeCamp",
    },
  },
  {
    repo: {
      name: "react",
      forkCount: 39901,
      stargazerCount: 193159,
      url: "https://github.com/facebook/react",
    },
  },
];

describe("test TableComponent", () => {
  it("should render TableComponent", () => {
    render(
      <TableComponent
        repos={repos}
        onPageChange={() => {}}
        onChangeLimit={() => {}}
        repositoryCount={100}></TableComponent>
    );
    const tableComponent = screen.getByTestId("tableComponent");
    expect(tableComponent).toBeTruthy();
  });
});
