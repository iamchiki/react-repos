import { render, screen } from "@testing-library/react";
import RepositoryList from "./RepositoryList";

describe("test RepositoryList", () => {
  it("should render RepositoryList component", () => {
    render(<RepositoryList></RepositoryList>);
    const repositoryList = screen.getByTestId("repositoryList");
    expect(repositoryList).toBeTruthy();
  });
});
