import { ApolloProvider } from "@apollo/client";
import { render, screen } from "@testing-library/react";
import { client } from "../../services/api";
import RepositoryList from "./RepositoryList";

describe("test RepositoryList", () => {
  it("should render RepositoryList component", () => {
    render(
      <ApolloProvider client={client}>
        <RepositoryList></RepositoryList>
      </ApolloProvider>
    );
    const repositoryList = screen.getByTestId("repositoryList");
    expect(repositoryList).toBeTruthy();
  });
});
